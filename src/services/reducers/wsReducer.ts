import {
  ORDERS_CONNECTION_START,
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_GET_MESSAGE,
  ORDERS_SEND_MESSAGE,
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_START,
  FEED_CONNECTION_SUCCESS,
  FEED_GET_MESSAGE,
  FEED_SEND_MESSAGE
} from "../action-types/wsActionTypes";
import { TOrdersActions, TFeedSActions } from "../action-types/wsActionTypes";
import { TOrdersData } from "../types";

type TOrdersInitialState = {
  wsConnected: boolean;
  userOrdersData: TOrdersData | null
}

const ordersInitialState: TOrdersInitialState = {
  wsConnected: false,
  userOrdersData: null
};

type TFeedInitialState = {
  wsConnected: boolean;
  feedOrdersData: TOrdersData | null
}

const feedInitialState: TFeedInitialState = {
  wsConnected: false,
  feedOrdersData: null
};

export type TWsStates = 
  | TOrdersInitialState
  | TFeedInitialState

export const userOrdersReducer = (state = ordersInitialState, action: TOrdersActions): TOrdersInitialState => {
  switch (action.type) {
    case ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        userOrdersData: null
      };

    case ORDERS_GET_MESSAGE:
      return {
        ...state,
        userOrdersData: action.payload
      };
    

    default:
      return state;
  }
};

export const feedOrdersReducer = (state = feedInitialState, action: TFeedSActions): TFeedInitialState => {
  switch (action.type) {
    case FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        feedOrdersData: null
      };

    case FEED_GET_MESSAGE:
      return {
        ...state,
        feedOrdersData: action.payload
      };
    

    default:
      return state;
  }
};






