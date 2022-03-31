import React, { FC } from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import Tabs from "../tab/tab";
import IngredientsList from "../ingredients-list/ingredients-list";
import { useRef } from "react";
import { useSelector } from "../../services/types/hooks";
import { TIngredientData } from "../../services/types";
import { useLocation } from "react-router";

interface IBurgerIngredients {
  buns: TIngredientData[],
  sauces: TIngredientData[],
  mains: TIngredientData[],
  currentSection: string,
  elementCountersData: {
    [item: string]: number
  }
}

const BurgerIngredients: FC = () => {
  const [state, setState] = React.useState<IBurgerIngredients>({
    buns: [],
    sauces: [],
    mains: [],
    currentSection: 'one',
    elementCountersData: {}
  });

  const { ingredients } = useSelector(state => state.ingredientsReducer);
  const { selectedIngredients } = useSelector((state) => state.dndReducer);

  const ingredientsSection1 = useRef<HTMLInputElement>(null);
  const ingredientsSection2 = useRef<HTMLInputElement>(null);
  const ingredientsSection3 = useRef<HTMLInputElement>(null);

  const location = useLocation();

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

    let elementCountersDataLocal:{[item: string]: number} = {};

    selectedIngredients.forEach((el,index) => {
      if(Object.keys(elementCountersDataLocal).length !== 0 && 
        Object.keys(elementCountersDataLocal).find(element => element === el.data._id)) {
        elementCountersDataLocal = {...elementCountersDataLocal, [el.data._id] : elementCountersDataLocal[el.data._id]+1}
      } else {
        elementCountersDataLocal = {...elementCountersDataLocal, [el.data._id] : 1 }
      }
    })

    setState((previousState) => ({
      ...previousState,
      elementCountersData: elementCountersDataLocal
    }));

  }, [selectedIngredients])

  const onTabClick = (value: string, element: { current: HTMLElement }) => {
    setCurrentSection(value);
    element.current.scrollIntoView({ behavior: "smooth" });
  };

  const setCurrentSection = (value: string) => {
    setState({ ...state, currentSection: value });
  };

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
            const container = evt.target as HTMLElement;
            const scrollPosition = container.scrollTop;
            const positionOfSection2 = ingredientsSection2.current === null ? 0 : ingredientsSection2.current.offsetTop;
            const positionOfSection3 = ingredientsSection3.current === null ? 0 : ingredientsSection3.current.offsetTop;
            if (scrollPosition + 350 <= positionOfSection2) {
              setCurrentSection('one');
            } else if (scrollPosition + 350 <= positionOfSection3) {
              setCurrentSection('two');
            } else {
              setCurrentSection('three');
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
    </>
  );
}

export default BurgerIngredients;
