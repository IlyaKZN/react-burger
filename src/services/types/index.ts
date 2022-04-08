import { state } from "../..";
import { TAppActions } from "../actions";
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

export type RootState = ReturnType<typeof state.getState>;

export type TIngredientData = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
};

export type TOrderData = {
  "ingredients": string[],
  "_id": string,
  "status": string,
  "number": number,
  "name": string,
  "createdAt": string,
  "updatedAt": string
}

export type TOrdersData = {
"success": boolean,
"orders": TOrderData[],
"total": number,
"totalToday": number
}

export type TUniqueIngredientData = {
  item: { el: TIngredientData; id: string };
};

type TApplicationActions = TAppActions; 

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = typeof state.dispatch; 