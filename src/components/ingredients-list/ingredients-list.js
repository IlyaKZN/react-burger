import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./ingredients-list.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

class IngredientsList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <>
        <h3 className="text text_type_main-medium">{this.props.type}</h3>
        <ul className={`${ingredientsStyles.list} mt-5 ml-4 mb-10 mr-2`}>
          {this.props.ingredientsData.map((el, index) => (
            <li key={index} className={ingredientsStyles.card}>
              <Counter count={1} size="default" />
              <div className={`pl-4 pr-4`}>
                <img src={el.image} className={`${ingredientsStyles.image}`}/>
                <div className={`${ingredientsStyles.priceContainer} mt-1 mb-1`}>
                  <p className="text text_type_digits-default">{el.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
              <h4 className={`${ingredientsStyles.name} text text_type_main-small`}>{el.name}</h4>
            </li>
          ))}
        </ul>
      </>
    )
  }
}

export default IngredientsList;