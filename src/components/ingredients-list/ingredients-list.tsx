import React from "react";
import ingredientsStyles from "./ingredients-list.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import { TIngredientData } from "../../services/types";

interface IIngredientsListProps {
  type: string;
  ingredientsData: TIngredientData[];
  elementCountersData: {
    [item: string]: number;
  };
}

const IngredientsList = React.forwardRef<HTMLDivElement, IIngredientsListProps>(
  ({ type, ingredientsData, elementCountersData }, ref) => {
    return (
      <>
        <h3 className="text text_type_main-medium" ref={ref}>
          {type}
        </h3>
        <ul className={`${ingredientsStyles.list} mt-5 ml-4 mb-10 mr-2`}>
          {ingredientsData.map((el, index) => (
            <IngredientCard
              el={el}
              key={el._id}
              elementCountersData={elementCountersData}
            />
          ))}
        </ul>
      </>
    );
  }
);

export default IngredientsList;
