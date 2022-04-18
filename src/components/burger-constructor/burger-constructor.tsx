import React, { FC } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useSelector } from "../../services/types/hooks";
import { useDispatch } from "react-redux";
import EmptyBurgerConstructor from "../empty-burger-constructor/empty-burger-constructor";
import { useDrop } from "react-dnd";
import {
  ADD_SELECTED_ITEM,
  DELETE_OLD_BUN,
  DELETE_SELECTED_ITEM,
  REORDER_INGREDIENTS,
  DELETE_ORDER_DATA
} from "../../services/actions";
import { useMemo } from "react";
import { getOrder } from "../../services/actions";
import { TUniqueIngredientData, TIngredientData } from "../../services/types";
import { useHistory, useRouteMatch } from "react-router";
import SelectedIngredientCard from "../selected-ingredient-card/selected-ingredient-card";
import emptyBunImg from '../../images/empty-bun.svg';
import emptyFillingImg from '../../images/empty-filling.svg';
import { stat } from "fs";

interface IBurgerConstructor {
  selectedItems: {
    data: TIngredientData;
    id: string;
  }[];
  bun?: {
    data: TIngredientData;
    id: string;
  };
  totalPrice: number;
  orderNumber: number | null;
}

const BurgerConstructor: FC = () => {
  const [state, setState] = React.useState<IBurgerConstructor>({
    selectedItems: [],
    totalPrice: 0,
    orderNumber: null,
  });

  const { orderNumber } = useSelector((state) => state.orderReducer);
  const { selectedIngredients } = useSelector((state) => state.dndReducer);
  const { data: userData } = useSelector((state) => state.userReducer)

  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();

  useMemo(() => {
    let bun: {
      data: TIngredientData;
      id: string;
    };
    const selectedItems: {
      data: TIngredientData;
      id: string;
    }[] = [];
    let totalPrice: number = 0;

    selectedIngredients.forEach((el) => {
      if (el.data.type === "bun") {
        bun = el;
        totalPrice += el.data.price * 2;
      } else {
        selectedItems.push(el);
        totalPrice += el.data.price;
      }
    });

    setState((previousState) => ({
      ...previousState,
      totalPrice: totalPrice,
      bun: bun,
      selectedItems: selectedItems,
    }));
  }, [selectedIngredients]);

  const [, dropTarget] = useDrop({
    accept: "ingredientCard",
    drop(ingredient: { el: TIngredientData; id: string }) {
      checkIngredientState(ingredient);
    },
  });

  const checkIngredientState = (ingredient: { el: TIngredientData; id: string; }) => {
    if (
      selectedIngredients.find((el) => el.id === ingredient.id) &&
      ingredient.el.type === "bun"
    ) {
      return;
    } else if (state.bun && ingredient.el.type === "bun") {
      dispatch({
        type: DELETE_OLD_BUN,
      });
      dispatch({
        type: ADD_SELECTED_ITEM,
        payload: { ingredient },
      });
    } else {
      dispatch({
        type: ADD_SELECTED_ITEM,
        payload: { ingredient },
      });
    }
  };

  const deleteIngredient = (item: TUniqueIngredientData) => {
    dispatch({
      type: DELETE_SELECTED_ITEM,
      item,
    });
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const newCards = [...state.selectedItems];
    newCards.splice(hoverIndex, 0, newCards.splice(dragIndex, 1)[0]);
    if (state.bun) {
      newCards.splice(0, 0, state.bun);
    }
    dispatch({
      type: REORDER_INGREDIENTS,
      newCards,
    });
  };

  const createOrder = () => {

    if (!userData) {
      history.replace('/login', { from: url })
      return
    }

    const idList = [];
    if (state.bun) {
      idList.push(state.bun.data._id);
    }
    state.selectedItems.forEach((el) => {
      idList.push(el.data._id);
    });

    dispatch(getOrder(idList));
  };

  const closeModal = () => {
    setState({ ...state, selectedItems: [], bun: undefined })
    dispatch({
      type: DELETE_ORDER_DATA,
    });
  }

  const modal = (
    <>
      <Modal closeModal={closeModal} headerType='text' header="">
        <OrderDetails />
      </Modal>
    </>
  );
  
  const emptyFillingContainerClassname = state.selectedItems.length ? styles.fullContainer : styles.emptyContainer

  return (
    <>
      <div
        className={`${styles.burgerConstructor}`}
        ref={dropTarget}
      >
        <ul className={`${styles.elementsList}`}>
          { state.bun ? 
            <li className={`${styles.element} mr-4`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${state.bun.data.name} (верх)`}
                price={state.bun.data.price}
                thumbnail={state.bun.data.image}
              />
            </li> :
            <div className={styles.emptyBun} style={{ backgroundImage: `url(${emptyBunImg})` }}>
              <p className="text text_type_main-large mt-4">Добавьте булку</p>
            </div>
          }
          <div className={`${styles.elementsList} ${styles.container} ${emptyFillingContainerClassname}`} >
            { state.selectedItems.length ? state.selectedItems.map((el, index) => (
              <SelectedIngredientCard
                el={el}
                deleteIngredient={deleteIngredient}
                key={el.id}
                id={el.id}
                index={index}
                moveCard={moveCard}
              />)) :
              <div className={styles.emptyFilling} style={{ backgroundImage: `url(${emptyFillingImg})` }}>
              <p className={`text text_type_main-large`}>Добавьте начинку</p>
            </div>
            }
          </div>
          { state.bun ? 
            <li className={`${styles.element} mr-4 mb-10`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${state.bun.data.name} (низ)`}
              price={state.bun.data.price}
              thumbnail={state.bun.data.image}
            />
            </li> :
            <div className={styles.emptyBun} style={{ backgroundImage: `url(${emptyBunImg})` }}>
              <p className={`text text_type_main-large mt-4 ${styles.emptyBunTextBottom}`}>Добавьте булку</p>
            </div>
          }
          
        </ul>
        <div className={`${styles.confirmContainer} mr-4`}>
          <div
            className={`${styles.priceContainer} mr-10`}
          >
            <p className="text text_type_digits-medium">
              {state.totalPrice}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={createOrder} type="primary" disabled={state.selectedItems.length && state.bun ? false : true} size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
      {orderNumber && modal}
    </>
  );
};

export default BurgerConstructor;
