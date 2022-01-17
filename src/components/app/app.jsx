import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppStyles from "./app.module.css";
import { IngredientsContext } from "../../services/ingredients-context";
import { BASE_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";

function App() {

  const [state, setState] = React.useState({ data: [], isLoading: true, isError: false });

  React.useEffect(() => {

    const getIngredientsData = () => {
      setState({...state, isLoading: true})
      fetch(`${BASE_URL}/ingredients`)
        .then(checkResponse)
        .then((res) => {
          setState({
            ...state,
            data: res.data,
            isLoading: false,
            isError: false
          })
        })
        .catch((err) => {
          console.log(err)
          setState({
            ...state,
            isError: true,
            isLoading: false
          })
        })
    }

    getIngredientsData();
  }, [])


  return (
    <>
      <AppHeader />
      <div className={AppStyles.content}>
        <h2 className={`${AppStyles.title} mt-10 mb-5`}>Соберите бургер</h2>
        {state.isLoading ? 'Загрузка...' : null}
        {state.isError ? 'Произошла ошибка' : null}
        {!state.isLoading ? 
          <>
            <IngredientsContext.Provider value={state.data}>
              <BurgerIngredients />
              <BurgerConstructor />
            </IngredientsContext.Provider>
          </> : null }
      </div>
    </>
  )
}

export default App;