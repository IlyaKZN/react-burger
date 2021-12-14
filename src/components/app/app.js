import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppStyles from "./app.module.css";
import data from "../../utils/data";

class App extends React.Component {


  render() {
    return (
      <>
        <AppHeader />
        <div className={AppStyles.content}>
          <h2 className={`${AppStyles.title} mt-10 mb-5`}>Соберите бургер</h2>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </div>
      </>
    )
  }
}

export default App;