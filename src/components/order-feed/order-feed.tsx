import styles from "./order-feed.module.css";
import { Link } from "react-router-dom";
import { OrderImage } from "../orderImage/order-image";
import { useSelector } from "../../services/types/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState } from "react";
import { TOrdersData, TOrderData } from "../../services/types";
import { dateReformating } from "../../utils/date-reformating";
import { useLocation } from "react-router";

interface TOrderFeedProps {
  ordersData: TOrdersData;
  type: 'orders' | 'feed';
}

export const OrderFeed: FC<TOrderFeedProps> = ({ ordersData, type }) => {

  const { ingredients } = useSelector((state) => state.ingredientsReducer);
  const location = useLocation();

  const createOrderCard = (el: TOrderData) => {

    //Проверяем есть ли повторяющиеся элементы и сортируем их
    let sortedOrderIngredients: {[el: string]: number} = {};
    el.ingredients.forEach(el => {
      if(el in sortedOrderIngredients) {
        const counter: number = sortedOrderIngredients[el]
        sortedOrderIngredients[el] = counter + 1
      } else {
        sortedOrderIngredients[el] = 1
      }
    })

    //Высчитываем стоимость заказа
    let price: number = 0;
    el.ingredients.map((elId) => {
      const fullIngredientData = ingredients.find((el) => el._id === elId);
      if (fullIngredientData?.type === "bun") {
        price = price + fullIngredientData.price * 2;
      } else {
        price = price + (fullIngredientData?.price || 0);
      }
    });

    return (
      <li className={styles.order} key={el.number}>
        <Link to={{
          pathname: type === 'feed' ? `/feed/${el.number}` : `/profile/orders/${el.number}`,
          state: { background: location },
        }} 
          className={styles.link}>
          <div className={`${styles.header} mb-6`}>
            <p className="text text_type_digits-default">{`#${el.number}`}</p>
            <p className="text text_type_main-default text_color_inactive">{dateReformating(el.createdAt)}</p>
          </div>
          <p className="text text_type_main-medium">{el.name}</p>
          {type === 'orders' && el.status === 'done'? 
            <p className="text text_type_main-default mt-2" style={{'color': '#00CCCC'}}>Выполнен</p> :
            null
          }
          {type === 'orders' && el.status === 'pending'? 
            <p className="text text_type_main-default mt-2">Готовится</p> :
            null
          }
          <div className={`${styles.container} mt-6`}>
            <div className={`${styles.imagesContainer} mr-6`}>
            {Object.keys(sortedOrderIngredients).map((item, index) => (
              <OrderImage
                key={index}
                elId={item}
                index={index}
                amountThisIngredient={sortedOrderIngredients[item]}
                amountIngredients={el.ingredients.length}
              />
            ))}
            </div>
            <div className={styles.price}>
              <p className="text text_type_digits-default mr-2">{price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </Link>
      </li>
    );
  };

  const reversedArray = ordersData.orders.slice(0);
  reversedArray.reverse();

  return (
    <>
      {type === 'orders' ? 
        <ul className={styles.orderList}>
          {reversedArray.map((el, index) => createOrderCard(el))}
        </ul> : 
        <ul className={styles.orderList}>
          {ordersData.orders.map((el, index) => createOrderCard(el))}
        </ul>
      }
    </>
    
  );
};
