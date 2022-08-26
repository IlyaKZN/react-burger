import styles from './orders.module.css';
import { ProfileMenu } from "../../components/profile-menu/profile-menu";
import { OrderFeed } from '../../components/order-feed/order-feed';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { FC, useEffect } from 'react';
import { ORDERS_CONNECTION_START, ORDERS_CONNECTION_CLOSED } from '../../services/action-types/wsActionTypes';
import { Preloader } from '../../components/preloader/preloader';
import { getCookie } from '../../utils/cookie-utils';

export const OrdersPage: FC = () => {

  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    dispatch({ type: ORDERS_CONNECTION_START, payload: `wss://norma.nomoreparties.space/orders?token=${accessToken}` })

    return () => {
      dispatch({ type: ORDERS_CONNECTION_CLOSED })
    }
    
  }, [dispatch])

  const { userOrdersData } = useSelector(state => state.userOrdersReducer)

  return (
    <>
      {userOrdersData ? 
        <div className={styles.page}>
          <ProfileMenu />
          <OrderFeed ordersData={userOrdersData} type='orders' />
        </div> 
      : <Preloader />}
    </>
  )
}