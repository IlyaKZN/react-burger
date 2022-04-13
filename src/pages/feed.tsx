import styles from './feed.module.css';
import { OrderFeed } from '../components/order-feed/order-feed';
import { useSelector, useDispatch } from '../services/types/hooks';
import { FC, useEffect } from 'react';
import { FEED_CONNECTION_START, FEED_CONNECTION_CLOSED } from '../services/action-types/wsActionTypes';
import { OrdersData } from '../components/orders-data/orders-data';
import { Preloader } from '../components/preloader/preloader';


export const Feed: FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FEED_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all' })

    return () => {
      dispatch({ type: FEED_CONNECTION_CLOSED })
    }
    
  }, [])

  const { feedOrdersData } = useSelector(state => state.feedOrdersReducer)

  return (
    <>
    { feedOrdersData ?
        <section className={styles.page}>
          <h1 className="text text_type_main-large">Лента заказов</h1>
          <div className={styles.orderFeed}>
            <OrderFeed ordersData={feedOrdersData} type='feed'/>
          </div>
          <OrdersData ordersData={feedOrdersData}/>
        </section>
      : <Preloader />
    }
    </>
  )
}