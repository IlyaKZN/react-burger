import styles from './order-info-page.module.css';
import { OrderInfo } from "../../components/order-Info/order-info";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { ORDERS_CONNECTION_START, ORDERS_CONNECTION_CLOSED, FEED_CONNECTION_START, FEED_CONNECTION_CLOSED } from "../../services/action-types/wsActionTypes";
import { useParams } from 'react-router';
import { Preloader } from '../../components/preloader/preloader';
import { useLocation } from 'react-router';
import { getCookie } from '../../utils/cookie-utils';

export const OrderInfoPage: FC = () => {

  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  const startWs = () => {
    if (location.pathname === `/feed/${params.number}`) {
      return { type: FEED_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all' }
    } else if (location.pathname === `/profile/orders/${params.number}`) {
      return { type: ORDERS_CONNECTION_START, payload: `wss://norma.nomoreparties.space/orders?token=${accessToken}` }
    }
  }

  useEffect(() => {
    dispatch(startWs())

    return () => {
      dispatch({ type: ORDERS_CONNECTION_CLOSED });
      dispatch({ type: FEED_CONNECTION_CLOSED })
    }
    
  }, [dispatch])

  const params: {number: string} = useParams();
  const location = useLocation();
  const ordersData = {
    feedOrdersData: useSelector(state => state.feedOrdersReducer.feedOrdersData),
    userOrdersData: useSelector(state => state.userOrdersReducer.userOrdersData)
  }

  if (!ordersData.feedOrdersData && !ordersData.userOrdersData) {
    return (
      <Preloader />
    )
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.orderInfoWrapper}>
        <p className={`${styles.orderNumber} text text_type_digits-default`}>#{params.number}</p>
        <OrderInfo />
      </div>
    </div>
  )
}