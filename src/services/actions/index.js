import { getIngredientsData } from '../../utils/burger-api.js';
import { getOrderNumber } from '../../utils/burger-api.js';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const ADD_VIEWED_INGREDIENT = 'ADD_VIEWED_INGREDIENT';
export const DELETE_VIEWED_INGREDIENT = 'DELETE_VIEWED_INGREDIENT';

export const DELETE_ORDER_DATA = 'DELETE_ORDER_DATA';

export const ADD_SELECTED_ITEM = 'ADD_SELECTED_ITEM';
export const DELETE_SELECTED_ITEM = 'DELETE_SELECTED_ITEM';
export const DELETE_OLD_BUN = 'DELETE_OLD_BUN';

export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsData()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          res
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      })
  }
}

export function getOrder(idList) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderNumber(idList)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          res
        })
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED
        })
      })
  }
}