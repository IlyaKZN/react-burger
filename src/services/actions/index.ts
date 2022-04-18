import { getIngredientsData, getOrderNumber } from "../../utils/burger-api";
import { requestPasswordChangeApi } from "../../utils/account-api";
import { AppThunk, AppDispatch } from "../types/index.js";
import { TIngredientData } from "../types/index.js";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

export const ADD_VIEWED_INGREDIENT: "ADD_VIEWED_INGREDIENT" = "ADD_VIEWED_INGREDIENT";
export const DELETE_VIEWED_INGREDIENT: "DELETE_VIEWED_INGREDIENT" = "DELETE_VIEWED_INGREDIENT";
export const DELETE_ALL_VIEWED_INGREDIENTS: " DELETE_ALL_VIEWED_INGREDIENTS" = " DELETE_ALL_VIEWED_INGREDIENTS";

export const DELETE_ORDER_DATA: "DELETE_ORDER_DATA" = "DELETE_ORDER_DATA";

export const ADD_SELECTED_ITEM: "ADD_SELECTED_ITEM" = "ADD_SELECTED_ITEM";
export const DELETE_SELECTED_ITEM: "DELETE_SELECTED_ITEM" = "DELETE_SELECTED_ITEM";
export const DELETE_OLD_BUN: "DELETE_OLD_BUN" = "DELETE_OLD_BUN";

export const REORDER_INGREDIENTS: "REORDER_INGREDIENTS" = "REORDER_INGREDIENTS";




//ingredients
export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly res: { data: [] };
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

//order
export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly res: { name: string; order: { number: number } };
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

//viewedIngredient
export interface IAddViewedIngredientAction {
  readonly type: typeof ADD_VIEWED_INGREDIENT;
  readonly el: TIngredientData;
}

export interface IDeleteViewedIngredientAction {
  readonly type: typeof DELETE_VIEWED_INGREDIENT;
}

export interface IDeleteOrderDataAction {
  readonly type: typeof DELETE_ORDER_DATA;
}

export interface IDeleteAllViewedIngredients {
  readonly type: typeof DELETE_ALL_VIEWED_INGREDIENTS
}

//Dnd
export interface IAddSelectedItemAction {
  readonly type: typeof ADD_SELECTED_ITEM;
  readonly payload: { ingredient: {
    el: TIngredientData;
    id: string;
} };
}

export interface IDeleteSelectedItemAction {
  readonly type: typeof DELETE_SELECTED_ITEM;
  readonly item: { el: TIngredientData; id: string };
}

export interface IDeleteOldBunAction {
  readonly type: typeof DELETE_OLD_BUN;
}

export interface IReorderIngredientsAction {
  readonly type: typeof REORDER_INGREDIENTS;
  readonly newCards: { data: TIngredientData; id: string }[];
}




export type TDndActions =
  | IAddSelectedItemAction
  | IDeleteOldBunAction
  | IDeleteSelectedItemAction
  | IReorderIngredientsAction
  | IDeleteAllViewedIngredients

export type TOrderActions =
  | IDeleteOrderDataAction
  | IGetOrderRequestAction
  | IGetOrderFailedAction
  | IGetOrderSuccessAction;

export type TViewedIngredientActions =
  | IAddViewedIngredientAction
  | IDeleteViewedIngredientAction;

export type TIngredientsActions =
  | IGetIngredientsSuccessAction
  | IGetIngredientsRequestAction
  | IGetIngredientsFailedAction;



export type TAppActions = 
  | TDndActions
  | TOrderActions
  | TViewedIngredientActions
  | TIngredientsActions;



export const getIngredients = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredientsData()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          res,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}

export const getOrder = (idList: string[]) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderNumber(idList)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          res,
        });
        dispatch({
          type: DELETE_ALL_VIEWED_INGREDIENTS
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
        console.log(err);
        alert(
          "При создании заказа произошла ошибка, попробуйте ещё раз или обратитесь в поддержку"
        );
      });
  };
}

