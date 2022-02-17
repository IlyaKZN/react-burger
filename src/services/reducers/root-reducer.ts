import { combineReducers } from 'redux';
import { ingredientsReducer, viewedIngredientReducer, orderReducer, dndReducer } from './index';

export const rootReducer = combineReducers({
  viewedIngredientReducer,
  ingredientsReducer,
  orderReducer,
  dndReducer
});