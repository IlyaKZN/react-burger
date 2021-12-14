import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppStyles from "./app.module.css";

function App() {

  const url = 'https://norma.nomoreparties.space/api'

  const [state, setState] = React.useState({ data: [], isLoading: false, isError: false })

  React.useEffect(() => {
    getIngredientsData();
  }, [])

  const getIngredientsData = () => {
    setState({...state, isLoading: true})
    fetch(`${url}/ingredients`)
      .then(checkResponse)
      .then((res) => {setState({
        ...state,
        data: res.data,
        isLoading: false,
        isError: false
      })})
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
            <BurgerIngredients data={state.data} />
            <BurgerConstructor data={state.data} />
          </> : null }
      </div>
    </>
  )
}

export default App;