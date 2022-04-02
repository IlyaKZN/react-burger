import React, { FC } from "react";
import ingredienStyles from "./ingredient-details.module.css";
import { useSelector } from "../../services/types/hooks";
import { useParams } from "react-router";

const IngredientDetails: FC = () => {

  let { viewedIngredient } = useSelector(state => state.viewedIngredientReducer);
  const { ingredients } = useSelector(state => state.ingredientsReducer)

  const params: {id: string} = useParams();

  if (!viewedIngredient) {
    ingredients.forEach((ingredient) => {
      if(ingredient._id === params.id) {
        viewedIngredient = ingredient;
      }
    })
  }

  return (
    <> 
      {viewedIngredient ? 
        <>
          <img src={viewedIngredient!.image} className={`${ingredienStyles.image} mb-4`}/>
          <p className="text text_type_main-medium mb-8">{viewedIngredient!.name}</p>
          <ul className={ingredienStyles.grid}>
            <li className={ingredienStyles.element}>
              <p className={`${ingredienStyles.text} text text_type_main-small mb-2`}>Калории,ккал</p>
              <p className={`${ingredienStyles.text} text text_type_main-medium `}>{viewedIngredient!.calories}</p>
            </li>
            <li className={ingredienStyles.element}>
              <p className={`${ingredienStyles.text} text text_type_main-small mb-2`}>Белки, г</p>
              <p className={`${ingredienStyles.text} text text_type_main-medium`}>{viewedIngredient!.proteins}</p>
            </li>
            <li className={ingredienStyles.element}>
              <p className={`${ingredienStyles.text} text text_type_main-small mb-2`}>Жиры, г</p>
              <p className={`${ingredienStyles.text} text text_type_main-medium`}>{viewedIngredient!.fat}</p>
            </li>
            <li className={ingredienStyles.element}>
              <p className={`${ingredienStyles.text} text text_type_main-small mb-2`}>Углеводы, г</p>
              <p className={`${ingredienStyles.text} text text_type_main-medium`}>{viewedIngredient!.carbohydrates}</p>
            </li>
          </ul>
        </>
        : null
      }
    </>
  )
}

export default IngredientDetails;