import React from "react";
import orderDetailsStyles from "./order-details.module.css";
import doneImg from "../../images/doneImg.svg";
import PropTypes from 'prop-types';

function OrderDetails(props) {
  return (
    <>
      <p className={`mb-8 text text_type_digits-large ${orderDetailsStyles.orderNumber}`}>{props.orderNumber? props.orderNumber : "..."}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={doneImg} className="mb-15"></img>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.oneOfType([
    PropTypes.number
  ]),
};

export default OrderDetails