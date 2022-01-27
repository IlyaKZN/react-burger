import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppStyles from "./app.module.css";
import { IngredientsContext } from "../../services/ingredients-context";
import { getIngredientsData } from "../../utils/burger-api.js";
import { useDispatch } from 'react-redux';
import { getIngredients } from "../../services/actions";
import { useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  const dispatch = useDispatch();

  const { ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredientsReducer)

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [])


  return (
    <>
      <AppHeader />
      <div className={AppStyles.content}>
        <h2 className={`${AppStyles.title} mt-10 mb-5`}>Соберите бургер</h2>
        {ingredientsRequest ? 'Загрузка...' : null}
        {ingredientsFailed ? 'Произошла ошибка' : null}
        {!ingredientsRequest ? 
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </> : null }
      </div>
    </>
  )
}

export default App;