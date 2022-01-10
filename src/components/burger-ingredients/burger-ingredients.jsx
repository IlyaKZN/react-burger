import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import Tabs from "../tab/tab";
import IngredientsList from "../ingredients-list/ingredients-list";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../Ingredient-details/Ingredient-details";
import { useRef } from "react";
import { IngredientsContext } from "../../services/ingredients-context";

function BurgerIngredients() {
  const [state, setState] = React.useState({
    buns: [],
    sauces: [],
    mains: [],
    modalData: {},
    modalVisible: false,
    currentSection: 1,
  });

  const data = React.useContext(IngredientsContext);

  const ingredientsSection1 = useRef(null);
  const ingredientsSection2 = useRef(null);
  const ingredientsSection3 = useRef(null);

  React.useEffect(() => {
    data.forEach((el) => {
      if (el.type === "bun") {
        setState((previousState) => ({
          ...previousState,
          buns: [...previousState.buns, el],
        }));
      } else if (el.type === "sauce") {
        setState((previousState) => ({
          ...previousState,
          sauces: [...previousState.sauces, el],
        }));
      } else if (el.type === "main") {
        setState((previousState) => ({
          ...previousState,
          mains: [...previousState.mains, el],
        }));
      }
    });
  }, []);

  const handleOpenModal = (el) => {
    setState({ ...state, modalVisible: true, modalData: el });
  };

  const handleCloseModal = () => {
    setState({ ...state, modalVisible: false });
  };

  const onTabClick = (value, element) => {
    setCurrentSection(value);
    element.current.scrollIntoView({ behavior: "smooth" });
  };

  const setCurrentSection = (value) => {
    setState({ ...state, currentSection: value });
  };

  const modal = (
    <Modal header="Детали ингредиента" onClose={handleCloseModal}>
      <IngredientDetails data={state.modalData} />
    </Modal>
  );

  return (
    <>
      <section className={ingredientsStyles.burgerIngredients}>
        <Tabs
          onTabClick={onTabClick}
          current={state.currentSection}
          sections={[
            ingredientsSection1,
            ingredientsSection2,
            ingredientsSection3,
          ]}
        />
        <div
          className={ingredientsStyles.container}
          onScroll={(evt) => {
            const container = evt.target;
            const scrollPosition = container.scrollTop;
            const positionOfSection2 = ingredientsSection2.current.offsetTop;
            const positionOfSection3 = ingredientsSection3.current.offsetTop;
            if (scrollPosition + 350 <= positionOfSection2) {
              setCurrentSection(1);
            } else if (scrollPosition + 350 <= positionOfSection3) {
              setCurrentSection(2);
            } else {
              setCurrentSection(3);
            }
          }}
        >
          <IngredientsList
            ref={ingredientsSection1}
            handleOpenModal={handleOpenModal}
            ingredientsData={state.buns}
            type={"Булки"}
          />
          <IngredientsList
            ref={ingredientsSection2}
            handleOpenModal={handleOpenModal}
            ingredientsData={state.sauces}
            type={"Соусы"}
          />
          <IngredientsList
            ref={ingredientsSection3}
            handleOpenModal={handleOpenModal}
            ingredientsData={state.mains}
            type={"Основные ингредиенты"}
          />
        </div>
      </section>
      {state.modalVisible && modal}
    </>
  );
}

export default BurgerIngredients;
