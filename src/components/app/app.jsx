import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppStyles from "./app.module.css";
import { IngredientsContext } from "../../services/ingredients-context";

function App() {

  const url = 'https://norma.nomoreparties.space/api'

  const [state, setState] = React.useState({ data: [], isLoading: true, isError: false });

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getIngredientsData();
  }, [])

  const getIngredientsData = () => {
    setState({...state, isLoading: true})
    fetch(`${url}/ingredients`)
      .then(checkResponse)
      .then((res) => {
        setData(res.data)
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

  const checkResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  }

  

  return (
    <>
      <AppHeader />
      <div className={AppStyles.content}>
        <h2 className={`${AppStyles.title} mt-10 mb-5`}>Соберите бургер</h2>
        {state.isLoading ? 'Загрузка...' : null}
        {state.isError ? 'Произошла ошибка' : null}
        {!state.isLoading ? 
          <>
            <IngredientsContext.Provider value={data}>
              <BurgerIngredients />
              <BurgerConstructor />
            </IngredientsContext.Provider>
          </> : null }
      </div>
    </>
  )
}

export default App;