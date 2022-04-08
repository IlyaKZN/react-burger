import { FC } from "react";
import { TOrdersData } from "../../services/types";
import { TOrderData } from "../../services/types";
import styles from './orders-data.module.css';

interface TOrderDataProps {
  ordersData: TOrdersData;
}

export const OrdersData: FC<TOrderDataProps> = ({ ordersData }) => {

  const doneOrders: TOrderData[] = [];
  const pengingOrders: TOrderData[] = [];

  ordersData.orders.forEach((el) => {
    if(el.status === "done") {
      doneOrders.push(el)
    } else if (el.status === "pending") {
      pengingOrders.push(el)
    }
  })

  const renderOrders = (array: TOrderData[]) => {

    let result = [];

    for (let i = 0; i < array.length; i++) {
      if (i < 20) {
        result.push(<p className={`text text_type_digits-default`} key={array[i].number}>{array[i].number}</p>)
      }
    }

    return result
  }
  
  return (
    <div className={styles.ordersData}>
      <div className={styles.ordersGrid}>
        <div className={`mr-9 ${styles.ordersColumn}`}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={`${styles.orderNumbers} ${styles.doneOrdersContainer}`}>
            {renderOrders(doneOrders)}
          </div>
        </div>
        <div className={styles.ordersColumn}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={styles.orderNumbers}>
            {renderOrders(pengingOrders)}
          </div>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`${styles.digits} text text_type_digits-large`}>{ordersData.total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`${styles.digits} text text_type_digits-large`}>{ordersData.totalToday}</p>
      </div>
    </div>
  )
}