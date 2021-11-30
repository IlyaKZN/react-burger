import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import Tabs from "../tab/tab";
import IngredientsList from "../ingredients-list/ingredients-list";
import PropTypes from 'prop-types';

class BurgerIngredients extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      buns: [],
      sauces: [],
      mains: []
    }
    this.data = props.data
  }

  componentDidMount() {
    this.props.data.forEach((el) => {
      if(el.type === "bun") {
        this.setState(previousState => ({
          buns: [...previousState.buns, el]
      }));
      } 
      else
      if(el.type === "sauce") {
        this.setState(previousState => ({
          sauces: [...previousState.sauces, el]
      }));
      } else 
      if(el.type === "main") {
        this.setState(previousState => ({
          mains: [...previousState.mains, el]
      }));
      }
    })
  }

  render() {
    return(
      <section className={ingredientsStyles.burgerIngredients}>
        <Tabs />
        <div className={ingredientsStyles.container}>
          <IngredientsList ingredientsData={this.state.buns} type={"Булки"} className="mt-5"/>
          <IngredientsList ingredientsData={this.state.sauces} type={"Соусы"}/>
          <IngredientsList ingredientsData={this.state.mains} type={"Основные ингредиенты"}/>
        </div>
      </section>
    )
  }
}

BurgerIngredients.propTypes = {
  data: PropTypes.array
};

export default BurgerIngredients;