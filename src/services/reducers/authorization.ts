import { TUserActions } from "../actions/authorization";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REQUEST_PASSWORD_CHANGE_ACTIVE,
  REQUEST_PASSWORD_CHANGE_FAILED,
  REQUEST_PASSWORD_CHANGE_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  CHANGE_USER_DATA_FAILED,
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  AUTHORIZATION_CHECKED_COMPLETED,
  AUTHORIZATION_CHECKED_STARTED,
  LOGOUT_USER
} from "../actions/authorization";

type TInitialState = {

  isAuthChecked: boolean;

  data: {
    success: boolean;
    user: {
      email: string;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
  } | null;

  registerUserError: string | null;
  registerUserRequest: boolean;

  loginUserError: string | null;
  loginUserRequest: boolean;

  requestChangePasswordActive: boolean;
  requestChangePasswordSuccess: boolean;

  resetPasswordRequest: boolean;
  resetPasswordError: boolean;
  resetPasswordSuccess: boolean;

  changeUserDataRequest: boolean;
  changeUserDataSuccess: boolean;
  changeUserDataError: boolean;

  getUserRequest: boolean;
  getUserSuccess: boolean;
  getUserError: boolean;
};

const initialState: TInitialState = {

  isAuthChecked: false,

  data: null,

  registerUserError: null,
  registerUserRequest: false,

  loginUserError: null,
  loginUserRequest: false,

  requestChangePasswordActive: false,
  requestChangePasswordSuccess: false,

  resetPasswordRequest: false,
  resetPasswordError: false,
  resetPasswordSuccess: false,

  changeUserDataRequest: false,
  changeUserDataSuccess: false,
  changeUserDataError: false,

  getUserRequest: false,
  getUserSuccess: false,
  getUserError: false
};

export const userReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      console.log("Запрос на регистрацию отправлен");
      return {
        ...state,
        registerUserRequest: true,
      };
    }
    case REGISTER_SUCCESS: {
      console.log("Регистрация прошла успешно");
      return {
        ...state,
        registerUserRequest: false,
        data: action.payload,
      };
    }
    case REGISTER_FAILED: {
      alert("В процессе регистрации произошла ошибка");
      return {
        ...state,
        registerUserRequest: false,
        registerUserError: action.payload,
      };
    }
    case LOGIN_REQUEST: {
      console.log("Запрос на авторизацию отправлен");
      return {
        ...state,
        loginUserRequest: true,
      };
    }
    case LOGIN_SUCCESS: {
      console.log("Авторизация прошла успешно");
      return {
        ...state,
        loginUserRequest: false,
        data: action.payload,
      };
    }
    case LOGIN_FAILED: {
      alert("В процессе авторизации произошла ошибка");
      return {
        ...state,
        loginUserRequest: false,
        loginUserError: action.payload,
      };
    }
    case REQUEST_PASSWORD_CHANGE_ACTIVE: {
      return {
        ...state,
        requestChangePasswordActive: true
      }
    }
    case REQUEST_PASSWORD_CHANGE_SUCCESS: {
      return {
        ...state,
        requestChangePasswordActive: false,
        requestChangePasswordSuccess: true
      }
    }
    case REQUEST_PASSWORD_CHANGE_FAILED: {
      return {
        ...state,
        requestChangePasswordActive: false,
        // requestFailed: true
      }
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: true
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: true
      }
    }
    case CHANGE_USER_DATA_REQUEST: {
      return {
        ...state,
        changeUserDataRequest: true
      }
    }
    case CHANGE_USER_DATA_SUCCESS: {
      return {
        ...state,
        changeUserDataRequest: false,
        changeUserDataSuccess: true,
        data: action.payload
      }
    }
    case CHANGE_USER_DATA_FAILED: {
      return {
        ...state,
        changeUserDataRequest: false,
        changeUserDataError: true
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserSuccess: true,
        data: action.payload
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserError: true
      }
    }
    case AUTHORIZATION_CHECKED_COMPLETED: {
      return {
        ...state,
        isAuthChecked: true
      }
    }
    case AUTHORIZATION_CHECKED_STARTED: {
      return {
        ...state,
        isAuthChecked: false
      }
    }
    case LOGOUT_USER: {
      document.cookie = "accessToken=''; max-age=-1";
      document.cookie = "refreshToken=''; max-age=-1";
      return {
        ...state,
        data: null,
      }
    }
    default: {
      return state
    }
  }
};