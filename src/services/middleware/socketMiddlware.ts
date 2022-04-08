import { TWSActions } from "../action-types/wsActionTypes";

type TwsActions  = {
  wsInit: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string,
  wsSendMessage: string
}

export const socketMiddleware = (wsActions: TwsActions) => {
  return (store: any) => {
    let socket: any = null;

    return (next: any) => (action: any) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = (event: any) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: any) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: any) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = (event: any) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = {...payload, token: ``}
          
          socket.send(JSON.stringify(message))
        }
      }

      next(action);
    };
  };
};