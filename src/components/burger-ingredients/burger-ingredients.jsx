import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import Tabs from "../tab/tab";
import IngredientsList from "../ingredients-list/ingredients-list";
import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import IngredientDetails from "../Ingredient-details/Ingredient-details";

function BurgerIngredients(props) {

  const [state, setState] = React.useState({ buns: [], sauces: [], mains: [], modalData: {}, modalVisible: false })

  React.useEffect(() => {
    props.data.forEach((el) => {
      if(el.type === "bun") {
        setState(previousState => ({
          ...previousState,
          buns: [...previousState.buns, el]
      }));
      } 
      else
      if(el.type === "sauce") {
        setState(previousState => ({
          ...previousState,
          sauces: [...previousState.sauces, el]
      }));
      } else 
      if(el.type === "main") {
        setState(previousState => ({
          ...previousState,
          mains: [...previousState.mains, el]
      }));
      }
    })
  }, [])

  const handleOpenModal = (el) => {
    setState({ ...state, modalVisible: true, modalData: el  });
    
  }

  const handleCloseModal = () => {
    setState({ ...state, modalVisible: false });
    
  }

  const modal = (
    <>
      <Modal header="Детали ингредиента" onClose={handleCloseModal} >
        <IngredientDetails data={state.modalData} />
      </Modal>
    </>
  )

  return(
    <>
      <section className={ingredientsStyles.burgerIngredients}>
        <Tabs />
        <div className={ingredientsStyles.container}>
          <IngredientsList handleOpenModal={handleOpenModal} ingredientsData={state.buns} type={"Булки"}/>
          <IngredientsList handleOpenModal={handleOpenModal} ingredientsData={state.sauces} type={"Соусы"}/>
          <IngredientsList handleOpenModal={handleOpenModal} ingredientsData={state.mains} type={"Основные ингредиенты"}/>
        </div>
      </section>
      {state.modalVisible && modal}
    </>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired
};

export default BurgerIngredients;