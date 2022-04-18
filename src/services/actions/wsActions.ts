import {
  ORDERS_CONNECTION_START,
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_GET_MESSAGE,
  ORDERS_SEND_MESSAGE,
} from '../action-types/wsActionTypes';

export const ordersConnectionSuccess = () => {
  return {
    type: ORDERS_CONNECTION_SUCCESS
  };
};

export const ordersConnectionError = () => {
  return {
    type: ORDERS_CONNECTION_ERROR
  };
};

export const ordersConnectionClosed = () => {
  return {
    type: ORDERS_CONNECTION_CLOSED
  };
};

export const ordersGetMessage = (message: any) => {
  return {
    type: ORDERS_GET_MESSAGE,
    payload: message
  };
};

export const ordersSendMessage = (message: any) => {
  return {
    type: ORDERS_SEND_MESSAGE,
    payload: message
  };
};