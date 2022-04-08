import {
  WS_SEND_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../action-types/wsActionTypes";
import { TWSActions } from "../action-types/wsActionTypes";
import { TOrdersData } from "../types";

type TInitialState = {
  wsConnected: boolean;
  allOrders: TOrdersData | null;
  userOrders: TOrdersData | [];
}

const initialState: TInitialState = {
  wsConnected: false,
  allOrders: null,
  userOrders: []
};

export const wsReducer = (state = initialState, action: TWSActions): TInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        allOrders: action.payload
      };

    default:
      return state;
  }
};