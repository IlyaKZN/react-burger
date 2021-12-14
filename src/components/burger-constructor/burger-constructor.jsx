import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor(props) {

  const [state, setState] = React.useState({ selectedItems: [], bun: {}, modalVisible: false })

  React.useEffect(() => {
    for(let i = 1; i < 12; i++) {
      setState(previousState => ({
        selectedItems: [...previousState.selectedItems, props.data[i]],
        ...state.bun
    }));
    }
    setState(previousState => ({ ...previousState, bun: props.data[0] }));
  }, [])

  const handleOpenModal = () => {
    setState({ ...state, modalVisible: true });
  }

  const handleCloseModal = () => {
    setState({ ...state, modalVisible: false });
  }

  const modal = (
    <>
      <Modal onClose={handleCloseModal}>
        <OrderDetails />
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
            <p className="text text_type_digits-medium">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={handleOpenModal} type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
      {state.modalVisible && modal}
    </>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
};

export default BurgerConstructor;