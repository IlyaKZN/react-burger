import { combineReducers } from 'redux';
import { ingredientsReducer, viewedIngredientReducer, orderReducer, dndReducer } from './index';
import { userReducer } from './authorization';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
  viewedIngredientReducer,
  ingredientsReducer,
  orderReducer,
  dndReducer,
  userReducer,
  wsReducer
});