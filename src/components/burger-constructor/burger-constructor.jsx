import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrderNumber } from "../../utils/burger-api.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ADD_ORDER_DATA } from "../../services/actions";
import EmptyBurgerConstructor from "../empty-burger-constructor/empty-burger-constructor";
import { useDrop } from "react-dnd";
import { ADD_SELECTED_ITEM, DELETE_OLD_BUN, DELETE_SELECTED_ITEM, REORDER_INGREDIENTS} from "../../services/actions";
import { useMemo } from "react";

import SelectedIngredientCard from "../selected-ingredient-card/selected-ingredient-card";

function BurgerConstructor() {
  const [state, setState] = React.useState({
    selectedItems: [],
    bun: {},
    modalVisible: false,
    totalPrice: 0,
    orderNumber: null,
  });


  const { orderNumber } = useSelector((state) => state.orderReducer);
  const { selectedIngredients } = useSelector((state) => state.dndReducer);

  const dispatch = useDispatch();

  useMemo(() => {
    let bun;
    const selectedItems = [];
    let totalPrice = 0;

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
    drop(item) {
      checkIngredientState(item);
    },
  });

  const checkIngredientState = (item) => {
    if (
      selectedIngredients.find((el) => el.id === item.el.id) &&
      item.el.type === "bun"
    ) {
      return;
    } else if (item.el.type === "bun" && state.bun) {
      dispatch({
        type: DELETE_OLD_BUN
      });
      dispatch({
        type: ADD_SELECTED_ITEM,
        payload: { item }
      });
    } else {
      dispatch({
        type: ADD_SELECTED_ITEM,
        payload: { item }
      });
    }
  };

  const deleteIngredient = (item) => {
    console.log('test')
    dispatch({
      type: DELETE_SELECTED_ITEM,
      item,
    });
  }

  const moveCard = (dragIndex, hoverIndex) => {
    const newCards = [...state.selectedItems];
    newCards.splice(hoverIndex, 0, newCards.splice(dragIndex, 1)[0]);
    newCards.splice(0, 0, state.bun)
    dispatch({
      type: REORDER_INGREDIENTS,
      newCards
    });
  }

  const createOrder = () => {
    const idList = [];

    idList.push(state.bun._id);
    state.selectedItems.forEach((el) => {
      idList.push(el._id);
    });

    getOrderNumber(idList)
      .then((res) => {
        dispatch({
          type: ADD_ORDER_DATA,
          res,
        });
      })
      .catch((err) => {
        console.log(err);
        alert(
          "При создании заказа произошла ошибка, попробуйте ещё раз или обратитесь в поддержку"
        );
      });
  };

  const handleCloseModal = () => {
    setState({ ...state, modalVisible: false });
  };

  const modal = (
    <>
      <Modal onClose={handleCloseModal} typeModal="orderNumber">
        <OrderDetails />
      </Modal>
    </>
  );

  return (
    <>
      {state.bun && state.selectedItems.length ? (
        <>
          <div
            className={`${burgerConstructorStyles.burgerConstructor}`}
            ref={dropTarget}
          >
            <ul className={`${burgerConstructorStyles.elementsList}`}>
              <li className={`${burgerConstructorStyles.element} mr-4`}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${state.bun.data.name} (верх)`}
                  price={state.bun.data.price}
                  thumbnail={state.bun.data.image}
                />
              </li>
              <div
                className={`${burgerConstructorStyles.elementsList} ${burgerConstructorStyles.container}`}
              >
                {state.selectedItems.map((el, index) => (
                  <SelectedIngredientCard el={el} deleteIngredient={deleteIngredient} key={el.id} id={el.id} index={index} moveCard={moveCard}/>
                ))}
              </div>
              <li className={`${burgerConstructorStyles.element} mr-4 mb-10`}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${state.bun.data.name} (низ)`}
                  price={state.bun.data.price}
                  thumbnail={state.bun.data.image}
                />
              </li>
            </ul>
            <div className={`${burgerConstructorStyles.confirmContainer} mr-4`}>
              <div
                className={`${burgerConstructorStyles.priceContainer} mr-10`}
              >
                <p className="text text_type_digits-medium">
                  {state.totalPrice}
                </p>
                <CurrencyIcon type="primary" />
              </div>
              <Button onClick={createOrder} type="primary" size="large">
                Оформить заказ
              </Button>
            </div>
          </div>
          {orderNumber && modal}
        </>
      ) : (
        <EmptyBurgerConstructor propRef={dropTarget} state={state}/>
      )}
    </>
  );
}

export default BurgerConstructor;
