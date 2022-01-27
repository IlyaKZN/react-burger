import React from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import Tabs from "../tab/tab";
import IngredientsList from "../ingredients-list/ingredients-list";
import Modal from "../modal/modal";
import IngredientDetails from "../Ingredient-details/Ingredient-details";
import { useRef } from "react";
import { useSelector } from 'react-redux';

function BurgerIngredients() {
  const [state, setState] = React.useState({
    buns: [],
    sauces: [],
    mains: [],
    modalData: {},
    modalVisible: false,
    currentSection: 1,
    elementCountersData: {}
  });

  const { ingredients } = useSelector(state => state.ingredientsReducer);
  const { viewedIngredient } = useSelector(state => state.viewedIngredientReducer);
  const { selectedIngredients } = useSelector((state) => state.dndReducer);

  const ingredientsSection1 = useRef(null);
  const ingredientsSection2 = useRef(null);
  const ingredientsSection3 = useRef(null);


  React.useEffect(() => {
    ingredients.forEach((el) => {
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
  }, [ingredients]);

  React.useMemo(() => {

    let elementCountersData = {};

    selectedIngredients.forEach((el,index) => {
      if(Object.keys(elementCountersData).length !== 0 && 
        Object.keys(elementCountersData).find(element => element === el.data._id)) {
        elementCountersData = {...elementCountersData, [el.data._id] : elementCountersData[el.data._id]+1}
      } else {
        elementCountersData = {...elementCountersData, [el.data._id] : 1 }
      }
    })

    setState((previousState) => ({
      ...previousState,
      elementCountersData: elementCountersData
    }));

  }, [selectedIngredients])

  const onTabClick = (value, element) => {
    setCurrentSection(value);
    element.current.scrollIntoView({ behavior: "smooth" });
  };

  const setCurrentSection = (value) => {
    setState({ ...state, currentSection: value });
  };

  const modal = (
    <Modal header="Детали ингредиента" typeModal='ingredientDetails'>
      <IngredientDetails />
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
            ingredientsData={state.buns}
            type={"Булки"}
            elementCountersData={state.elementCountersData}
          />
          <IngredientsList
            ref={ingredientsSection2}
            ingredientsData={state.sauces}
            type={"Соусы"}
            elementCountersData={state.elementCountersData}
          />
          <IngredientsList
            ref={ingredientsSection3}
            ingredientsData={state.mains}
            type={"Основные ингредиенты"}
            elementCountersData={state.elementCountersData}
          />
        </div>
      </section>
      {viewedIngredient && modal}
    </>
  );
}

export default BurgerIngredients;
