import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient-card.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/types/hooks";
import { ADD_VIEWED_INGREDIENT } from "../../services/actions";
import { useDrag } from "react-dnd";
import { useState, useMemo, FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { TIngredientData } from "../../services/types";

interface IIngredientCardProps {
  el: TIngredientData;
  elementCountersData: {
    [item: string]: number;
  };
}

const IngredientCard: FC<IIngredientCardProps> = ({ el, elementCountersData }) => {
  const [state, setState] = useState({
    countIngredient: 0,
  });

  useMemo(() => {
    setState({ countIngredient: elementCountersData[el._id] });
  }, [elementCountersData]);

  const dispatch = useDispatch();

  const addViewedIngredient = (el: TIngredientData) => {
    dispatch({
      type: ADD_VIEWED_INGREDIENT,
      el,
    });
  };

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredientCard",
    item: { el, id: uuidv4() },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <li
      className={ingredientStyles.card}
      onClick={() => addViewedIngredient(el)}
      style={{ opacity }}
      ref={dragRef}
    >
      <Counter count={state.countIngredient} size="default" />
      <div className={`pl-4 pr-4`}>
        <img
          src={el.image}
          className={`${ingredientStyles.image}`}
          alt={`Изображение ингридиента ${el.name}`}
        />
        <div className={`${ingredientStyles.priceContainer} mt-1 mb-1`}>
          <p className="text text_type_digits-default">{el.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <h4 className={`${ingredientStyles.name} text text_type_main-small`}>
        {el.name}
      </h4>
    </li>
  );
};

export default IngredientCard;