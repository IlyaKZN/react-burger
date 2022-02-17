import React, { FC } from "react";
import orderDetailsStyles from "./order-details.module.css";
import doneImg from "../../images/doneImg.svg";
import { useSelector } from "../../services/types/hooks";

const OrderDetails: FC = () => {

  const { orderNumber } = useSelector(state => state.orderReducer);

  return (
    <>
      <p className={`mb-8 text text_type_digits-large ${orderDetailsStyles.orderNumber}`}>{orderNumber? orderNumber : "..."}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={doneImg} className="mb-15"></img>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails