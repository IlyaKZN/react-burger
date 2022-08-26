import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import './fonts/fonts.css';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers/root-reducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socketMiddlware';
import {
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_CONNECTION_START,
  ORDERS_GET_MESSAGE,
  ORDERS_SEND_MESSAGE,
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_START,
  FEED_CONNECTION_SUCCESS,
  FEED_GET_MESSAGE,
  FEED_SEND_MESSAGE
} from './services/action-types/wsActionTypes';


export type TwsActions = {
  wsInit: typeof ORDERS_CONNECTION_START | typeof FEED_CONNECTION_START,
  onOpen: typeof ORDERS_CONNECTION_SUCCESS | typeof FEED_CONNECTION_SUCCESS,
  onClose: typeof ORDERS_CONNECTION_CLOSED | typeof FEED_CONNECTION_CLOSED,
  onError: typeof ORDERS_CONNECTION_ERROR | typeof FEED_CONNECTION_ERROR,
  onMessage: typeof ORDERS_GET_MESSAGE | typeof FEED_GET_MESSAGE,
  wsSendMessage: typeof ORDERS_SEND_MESSAGE | typeof FEED_SEND_MESSAGE
}

const ordersActions: TwsActions = {
  wsInit: ORDERS_CONNECTION_START,
  wsSendMessage:ORDERS_SEND_MESSAGE,
  onOpen: ORDERS_CONNECTION_SUCCESS,
  onClose: ORDERS_CONNECTION_CLOSED,
  onError: ORDERS_CONNECTION_ERROR,
  onMessage: ORDERS_GET_MESSAGE
};

const feedActions: TwsActions = {
  wsInit: FEED_CONNECTION_START,
  wsSendMessage: FEED_SEND_MESSAGE,
  onOpen: FEED_CONNECTION_SUCCESS,
  onClose: FEED_CONNECTION_CLOSED,
  onError: FEED_CONNECTION_ERROR,
  onMessage: FEED_GET_MESSAGE
};

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(ordersActions), socketMiddleware(feedActions)));

export const state = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={state}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
