import styles from './feed.module.css';
import { OrderFeed } from '../components/order-feed/order-feed';
import { useSelector,useDispatch } from '../services/types/hooks';
import { useEffect } from 'react';
import { WS_CONNECTION_START } from '../services/action-types/wsActionTypes';
import { OrdersData } from '../components/orders-data/orders-data';
import { Preloader } from '../components/preloader/preloader';

export const Feed = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all' })
  },[])

  const { allOrders } = useSelector(state => state.wsReducer)

  return (
    <>
    { allOrders ?
        <section className={styles.page}>
          <h1 className="text text_type_main-large">Лента заказов</h1>
          <div className={styles.orderFeed}>
            <OrderFeed ordersData={allOrders}/>
          </div>
          <OrdersData ordersData={allOrders}/>
        </section>
      : <Preloader />
    }
    </>
  )
}