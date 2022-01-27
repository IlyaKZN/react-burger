import React from "react";
import ingredientsStyles from "./ingredients-list.module.css";
import PropTypes from "prop-types";
import IngredientCard from "../ingredient-card/ingredient-card";

const IngredientsList = React.forwardRef((props, ref) => {

  const { type, ingredientsData, elementCountersData } = props

  return (
    <>
      <h3 className="text text_type_main-medium" ref={ref}>
        {type}
      </h3>
      <ul className={`${ingredientsStyles.list} mt-5 ml-4 mb-10 mr-2`}>
        {ingredientsData.map((el, index) => (
          <IngredientCard el={el} key={el._id} elementCountersData={elementCountersData} />
        ))}
      </ul>
    </>
  );
});

IngredientsList.propTypes = {
  ingredientsData: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  elementCountersData: PropTypes.object.isRequired
};

export default IngredientsList;
