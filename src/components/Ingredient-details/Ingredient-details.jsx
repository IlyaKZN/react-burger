import React from "react";
import ingredienStyles from "./ingredient-details.module.css";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

function IngredientDetails() {

  const { viewedIngredient } = useSelector(state => state.viewedIngredientReducer);

  return (
    <> 
      <img src={viewedIngredient.image} className={`${ingredienStyles.image} mb-4`}/>
      <p className="text text_type_main-medium mb-8">{viewedIngredient.name}</p>
      <ul className={ingredienStyles.grid}>
        <li className={ingredienStyles.element}>
          <p className={`${ingredienStyles.text} text text_type_main-small mb-2`}>Калории,ккал</p>
          <p className={`${ingredienStyles.text} text text_type_main-medium `}>{viewedIngredient.calories}</p>
        </li>
        <li className={ingredienStyles.element}>
          <p className={`${ingredienStyles.text} text text_type_main-small mb-2`}>Белки, г</p>
          <p className={`${ingredienStyles.text} text text_type_main-medium`}>{viewedIngredient.proteins}</p>
        </li>
        <li className={ingredienStyles.element}>
          <p className={`${ingredienStyles.text} text text_type_main-small mb-2`}>Жиры, г</p>
          <p className={`${ingredienStyles.text} text text_type_main-medium`}>{viewedIngredient.fat}</p>
        </li>
        <li className={ingredienStyles.element}>
          <p className={`${ingredienStyles.text} text text_type_main-small mb-2`}>Углеводы, г</p>
          <p className={`${ingredienStyles.text} text text_type_main-medium`}>{viewedIngredient.carbohydrates}</p>
        </li>
      </ul>
    </>
  )
}

export default IngredientDetails;