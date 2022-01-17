import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { IngredientsContext } from "../../services/ingredients-context";
import { BASE_URL } from "../../utils/constants";
import { checkResponse } from "../../utils/utils";

function BurgerConstructor() {

  const [state, setState] = React.useState({ selectedItems: [], bun: {}, modalVisible: false, totalPrice: 0, orderNumber: null })
  const data = React.useContext(IngredientsContext);

  React.useEffect(() => {

    let bun;
    const selectedItems = [];
    let totalPrice = 0;

    data.forEach((el) => {
      if(el.type === 'bun' && !bun) {
        bun = el;
        totalPrice += el.price * 2;
      } else {
        if(el.type !== 'bun') {
          selectedItems.push(el);
          totalPrice += el.price;
        }
      }
    })

    setState(previousState => ({ ...previousState, totalPrice: totalPrice, bun: bun, selectedItems: selectedItems }))

  }, [data])

  const getOrderNumber = () => {
    const idList = [];
    
    idList.push(state.bun._id)
    state.selectedItems.forEach(el => {
      idList.push(el._id);
    })

    fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "ingredients": idList
      })
    })
      .then(checkResponse)
      .then((res) => {
        setState(previousState => ({ ...previousState, orderNumber: res.order.number, modalVisible: true }))
      })
      .catch((err) => {
        console.log(err);
        alert('При создании заказа произошла ошибка, попробуйте ещё раз или обратитесь в поддержку');
      })
  }

  const handleCloseModal = () => {
    setState({ ...state, modalVisible: false });
  }

  const modal = (
    <>
      <Modal onClose={handleCloseModal}>
        <OrderDetails orderNumber={state.orderNumber} />
      </Modal>
    </>
  )

  return(
    <>
      <div className={`${burgerConstructorStyles.burgerConstructor}`}>
        <ul className={`${burgerConstructorStyles.elementsList}`}>
          <li className={`${burgerConstructorStyles.element} mr-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${state.bun.name} (верх)`}
              price={state.bun.price}
              thumbnail={state.bun.image}
            />
          </li>
          <div className={`${burgerConstructorStyles.elementsList} ${burgerConstructorStyles.container}`}>
            {state.selectedItems.map((el, index) => (
              <li key={el._id} className={`${burgerConstructorStyles.element} pr-2`}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                />
              </li>
            ))}
          </div>
          <li className={`${burgerConstructorStyles.element} mr-4 mb-10`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${state.bun.name} (низ)`}
              price={state.bun.price}
              thumbnail={state.bun.image}
            />
          </li>
        </ul>
        <div className={`${burgerConstructorStyles.confirmContainer} mr-4`}>
          <div className={`${burgerConstructorStyles.priceContainer} mr-10`}>
            <p className="text text_type_digits-medium">{state.totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={getOrderNumber} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
      {state.modalVisible && modal}
    </>
  )
}

export default BurgerConstructor;