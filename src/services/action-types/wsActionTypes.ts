import { TOrdersData } from "../types";
export const ORDERS_CONNECTION_START = 'ORDERS_CONNECTION_START';
export const ORDERS_CONNECTION_SUCCESS = 'ORDERS_CONNECTION_SUCCESS';
export const ORDERS_CONNECTION_ERROR = 'ORDERS_CONNECTION_ERROR';
export const ORDERS_CONNECTION_CLOSED = 'ORDERS_CONNECTION_CLOSED';
export const ORDERS_GET_MESSAGE = 'ORDERS_GET_MESSAGE';
export const ORDERS_SEND_MESSAGE = 'ORDERS_SEND_MESSAGE';

export interface IOrdersConnectionStartAction {
  readonly type: typeof ORDERS_CONNECTION_START;
}

export interface IOrdersConnectionSuccessAction {
  readonly type: typeof ORDERS_CONNECTION_SUCCESS;
}

export interface IOrdersConnectionErrorAction {
  readonly type: typeof ORDERS_CONNECTION_ERROR;
}

export interface IOrdersConnectionClosedAction {
  readonly type: typeof ORDERS_CONNECTION_CLOSED;
}

export interface IOrdersGetMessageAction {
  readonly type: typeof ORDERS_GET_MESSAGE;
  readonly payload: TOrdersData;
}

export interface IOrdersSendMessageAction {
  readonly type: typeof ORDERS_SEND_MESSAGE;
}

export type TOrdersActions =
  | IOrdersConnectionClosedAction
  | IOrdersConnectionErrorAction
  | IOrdersConnectionStartAction
  | IOrdersConnectionSuccessAction
  | IOrdersGetMessageAction
  | IOrdersSendMessageAction

export const FEED_CONNECTION_START = 'FEED_CONNECTION_START';
export const FEED_CONNECTION_SUCCESS = 'FEED_CONNECTION_SUCCESS';
export const FEED_CONNECTION_ERROR = 'FEED_CONNECTION_ERROR';
export const FEED_CONNECTION_CLOSED = 'FEED_CONNECTION_CLOSED';
export const FEED_GET_MESSAGE = 'FEED_GET_MESSAGE';
export const FEED_SEND_MESSAGE = 'FEED_SEND_MESSAGE';

export interface IFeedConnectionStartAction {
  readonly type: typeof FEED_CONNECTION_START;
}

export interface IFeedConnectionSuccessAction {
  readonly type: typeof FEED_CONNECTION_SUCCESS;
}

export interface IFeedConnectionErrorAction {
  readonly type: typeof FEED_CONNECTION_ERROR;
}

export interface IFeedConnectionClosedAction {
  readonly type: typeof FEED_CONNECTION_CLOSED;
}

export interface IFeedGetMessageAction {
  readonly type: typeof FEED_GET_MESSAGE;
  readonly payload: TOrdersData;
}

export interface IFeedSendMessageAction {
  readonly type: typeof ORDERS_SEND_MESSAGE;
}

export type TFeedSActions =
  | IFeedConnectionClosedAction
  | IFeedConnectionErrorAction
  | IFeedConnectionStartAction
  | IFeedConnectionSuccessAction
  | IFeedGetMessageAction
  | IFeedSendMessageAction
  