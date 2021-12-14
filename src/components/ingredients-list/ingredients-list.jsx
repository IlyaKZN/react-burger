import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./ingredients-list.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

function IngredientsList(props) {

  return(
    <>
      <h3 className="text text_type_main-medium">{props.type}</h3>
      <ul className={`${ingredientsStyles.list} mt-5 ml-4 mb-10 mr-2`}>
        {props.ingredientsData.map((el, index) => (
          <li key={el._id} className={ingredientsStyles.card} onClick={() => props.handleOpenModal(el,'ingredient-details')}>
            <Counter count={1} size="default" />
            <div className={`pl-4 pr-4`}>
              <img src={el.image} className={`${ingredientsStyles.image}`} alt={`Изображение ингридиента ${el.name}`}/>
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

IngredientsList.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
  ingredientsData: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

export default IngredientsList;