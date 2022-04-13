import { TWsStates } from "../reducers/wsReducer";
import { AnyAction, MiddlewareAPI } from "redux";
import { AppDispatch } from "../types";
import { RootState } from "../types";
import { Dispatch, FC } from "react";
import { TWSActions } from "../action-types/wsActionTypes";
import { Middleware } from "redux";


type TwsActions = {
  wsInit: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string,
  wsSendMessage: string
}

export const socketMiddleware = (wsActions: TwsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = {...payload, token: ``}
          
          socket.send(JSON.stringify(message))
        }

        if (type === onClose) {
          socket.close();
        }
      }

      next(action);
    };
  };
};