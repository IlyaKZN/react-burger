import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ADD_VIEWED_INGREDIENT,
  DELETE_VIEWED_INGREDIENT,
  DELETE_ORDER_DATA,
  ADD_SELECTED_ITEM,
  DELETE_SELECTED_ITEM,
  DELETE_OLD_BUN,
  REORDER_INGREDIENTS,
} from "../actions/index";

import type {
  TDndActions,
  TIngredientsActions,
  TOrderActions,
  TViewedIngredientActions,
} from "../actions/index";

import { TIngredientData } from "../types/index";

type TInitialState = {
  ingredients: ReadonlyArray<TIngredientData>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};

const initialState: TInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

type TInitialStateOrder = {
  orderNumber: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialStateOrder: TInitialStateOrder = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
};

type TInitialStateDnd = {
  selectedIngredients: { data: TIngredientData; id: string }[];
};

const initialStateDnd: TInitialStateDnd = {
  selectedIngredients: [],
};

type TInitialStateViewedIngredient = {
  viewedIngredient: TIngredientData | null;
};

const initialStateViewedIngredient: TInitialStateViewedIngredient = {
  viewedIngredient: null,
};

type TInitialStateRequestChangePassword = {
  requestActive: boolean;
  requestSucces: boolean;
  requestFailed: boolean;
};

const initialStateRequestChangePassword: TInitialStateRequestChangePassword = {
  requestActive: false,
  requestSucces: false,
  requestFailed: false,
};

export const dndReducer = (
  state = initialStateDnd,
  action: TDndActions
): TInitialStateDnd => {
  switch (action.type) {
    case ADD_SELECTED_ITEM: {
      return {
        ...state,
        selectedIngredients: [
          ...state.selectedIngredients,
          {
            data: action.payload.ingredient.el,
            id: action.payload.ingredient.id,
          },
        ],
      };
    }
    case DELETE_OLD_BUN: {
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(
          (el) => el.data.type !== "bun"
        ),
      };
    }
    case DELETE_SELECTED_ITEM: {
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(
          (element) => element.id !== action.item.id
        ),
      };
    }
    case REORDER_INGREDIENTS: {
      return {
        selectedIngredients: action.newCards,
      };
    }
    default: {
      return state;
    }
  }
};

export const orderReducer = (
  state = initialStateOrder,
  action: TOrderActions
): TInitialStateOrder => {
  switch (action.type) {
    case DELETE_ORDER_DATA: {
      return {
        ...state,
        orderNumber: null,
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderNumber: action.res.order.number,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

export const viewedIngredientReducer = (
  state = initialStateViewedIngredient,
  action: TViewedIngredientActions
): TInitialStateViewedIngredient => {
  switch (action.type) {
    case ADD_VIEWED_INGREDIENT: {
      return {
        ...state,
        viewedIngredient: action.el,
      };
    }
    case DELETE_VIEWED_INGREDIENT: {
      return {
        ...state,
        viewedIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.res.data,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};


