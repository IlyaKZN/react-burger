import React from "react";
import ingredienStyles from "./ingredient-details.module.css";
import PropTypes from 'prop-types';

function IngredientDetails(props) {

  const data = props.data

  return (
    <> 
      <img src={data.image} className={`${ingredienStyles.image} mb-4`}/>
      <p className="text text_type_main-medium mb-8">{data.name}</p>
      <ul className={ingredienStyles.grid}>
        <li className={ingredienStyles.element}>
          <p className={`${ingredienStyles.text} text text_type_main-small mb-2`}>Калории,ккал</p>
          <p className={`${ingredienStyles.text} text text_type_main-medium `}>{data.calories}</p>
        </li>
        <li className={ingredienStyles.element}>
          <p className={`${ingredienStyles.text} text text_type_main-small mb-2`}>Белки, г</p>
          <p className={`${ingredienStyles.text} text text_type_main-medium`}>{data.proteins}</p>
        </li>
        <li className={ingredienStyles.element}>
          <p className={`${ingredienStyles.text} text text_type_main-small mb-2`}>Жиры, г</p>
          <p className={`${ingredienStyles.text} text text_type_main-medium`}>{data.fat}</p>
        </li>
        <li className={ingredienStyles.element}>
          <p className={`${ingredienStyles.text} text text_type_main-small mb-2`}>Углеводы, г</p>
          <p className={`${ingredienStyles.text} text text_type_main-medium`}>{data.carbohydrates}</p>
        </li>
      </ul>
    </>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.object.isRequired
};

export default IngredientDetails;