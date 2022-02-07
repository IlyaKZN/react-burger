import selectedIngredientStyles from './selected-ingredient-card.module.css';
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import PropTypes from "prop-types";

function SelectedIngredientCard(props) {

  const { el, id, deleteIngredient, moveCard, index } = props;

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
    drop(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      console.log(dragIndex, hoverIndex);
      if(dragIndex === hoverIndex) {
        return
      }
      moveCard(dragIndex, hoverIndex);
   }
  });

  dragRef(localDropTarget(ref));

  return (
    <li key={el.id} className={`${selectedIngredientStyles.element} pr-2`} ref={ref} >
      <DragIcon type="primary" />
      <ConstructorElement
        text={el.data.name}
        price={el.data.price}
        thumbnail={el.data.image}
        handleClose={() => deleteIngredient(el)}
      />
    </li>
  );
}

SelectedIngredientCard.propTypes = {
  el: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default SelectedIngredientCard;
