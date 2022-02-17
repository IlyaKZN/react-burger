import selectedIngredientStyles from "./selected-ingredient-card.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { FC, useRef } from "react";
import { TIngredientData } from "../../services/types";

interface ISelectedIngredientCardProps {
  el: {
    data: TIngredientData;
    id: string;
  };
  id: string;
  deleteIngredient: Function;
  moveCard: Function;
  index: number;
}

const SelectedIngredientCard: FC<ISelectedIngredientCardProps> = ({ el, id, deleteIngredient, moveCard, index }) => {
  
  const ref = useRef(null);

  const [{ opacity }, dragRef] = useDrag({
    type: "selectedIngredientCard",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, localDropTarget] = useDrop({
    accept: "selectedIngredientCard",
    drop(item: { id: string; index: number }, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      console.log(dragIndex, hoverIndex);
      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
    },
  });

  dragRef(localDropTarget(ref));

  return (
    <li
      key={el.id}
      className={`${selectedIngredientStyles.element} pr-2`}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={el.data.name}
        price={el.data.price}
        thumbnail={el.data.image}
        handleClose={() => deleteIngredient(el)}
      />
    </li>
  );
};

export default SelectedIngredientCard;
