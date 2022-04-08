import styles from "./order-feed.module.css";
import { Link } from "react-router-dom";
import { OrderImage } from "../orderImage/order-image";
import { useSelector } from "../../services/types/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { TOrdersData, TOrderData } from "../../services/types";
import { dateReformating } from "../../utils/date-reformating";

interface TOrderFeedProps {
  ordersData: TOrdersData;
}

export const OrderFeed: FC<TOrderFeedProps> = ({ ordersData }) => {
  
  const { ingredients } = useSelector((state) => state.ingredientsReducer);

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
        <Link to="/feed" className={styles.link}>
          <div className={`${styles.header} mb-6`}>
            <p className="text text_type_digits-default">{`#${el.number}`}</p>
            <p className="text text_type_main-default text_color_inactive">{dateReformating(el.createdAt)}</p>
          </div>
          <p className="text text_type_main-medium mb-6">{el.name}</p>
          <div className={styles.container}>
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

  return (
    <ul className={styles.orderList}>
      {ordersData.orders.map((el, index) => createOrderCard(el))}
    </ul>
  );
};
