import React, { FC } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppStyles from "./app.module.css";
import { getIngredients } from "../../services/actions";
import { useSelector, useDispatch } from "../../services/types/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page";
import { ProfilePage } from "../../pages/profile";
import { ProtectedRoute } from "../protected-route/protected-route";
import { checkUserAuthorization } from "../../services/actions/authorization";
import { IngredientPage } from "../../pages/ingredient-page";
import { OrdersPage } from "../../pages/orders";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import { NotFound404 } from "../../pages/not-found404";
import Modal from "../modal/modal";
import IngredientDetails from "../Ingredient-details/Ingredient-details";
import { Preloader } from "../preloader/preloader";
import { Feed } from "../../pages/feed";
import { OrderInfo } from "../order-Info/order-info";
import { OrderInfoPage } from "../../pages/order-info-page";

interface ILocationState {
  from: string,
  background?: {
    pathname: string;
    search: string;
    state: {};
    hash: string;
    key?: string | undefined;
  }
}

const App: FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<ILocationState>();

  const { ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredientsReducer);
  const { data: userData } = useSelector(state => state.userReducer);
  const { orderRequest } = useSelector(state => state.orderReducer)
  
  React.useEffect(() => {
    dispatch(checkUserAuthorization());
    dispatch(getIngredients());
  }, [dispatch])

  const background = history.action === 'PUSH' && location.state && location.state.background;

  const closeModal: (() => void) = () => {
    history.goBack();
  }

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedRoute path="/login" redirectPath="/qwe" userData={userData} needUserAuth={false}>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute path="/register" redirectPath="/" userData={userData} needUserAuth={false}>
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute path="/forgot-password" redirectPath="/" userData={userData} needUserAuth={false}>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/reset-password" redirectPath="/" userData={userData} needUserAuth={false}>
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:number" redirectPath="/" userData={userData} needUserAuth={true}>
          <OrderInfoPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" redirectPath="/login" userData={userData} needUserAuth={true}>
          <OrdersPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" redirectPath="/login" userData={userData} needUserAuth={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientPage />
        </Route>
        <Route path="/feed/:number" exact>
          <OrderInfoPage />
        </Route>
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/" exact={true}>
        <div className={AppStyles.content}>
          <h2 className={`${AppStyles.title} mt-10 mb-5`}>Соберите бургер</h2>
          {ingredientsRequest ? 'Загрузка...' : null}
          {ingredientsFailed ? 'Произошла ошибка' : null}
          {!ingredientsRequest ? 
            <>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                { orderRequest ? <Preloader /> : <BurgerConstructor />}
              </DndProvider>
            </> : null }
        </div>
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background &&
        <>
        <Route path="/ingredients/:id" exact>
          <Modal header="Детали ингредиента" closeModal={closeModal} headerType='text'>
            <IngredientDetails />
          </Modal>
        </Route>
        <Route path="/feed/:number" exact>
          <Modal closeModal={closeModal} headerType='digits'>
            <OrderInfo />
          </Modal>
        </Route>
        <ProtectedRoute path="/profile/orders/:number" redirectPath="/login" userData={userData} needUserAuth={true}>
          <Modal closeModal={closeModal} headerType='digits'>
            <OrderInfo />
          </Modal>
        </ProtectedRoute>
        </>}
    </>
  )
}

export default App;