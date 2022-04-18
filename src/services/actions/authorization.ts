import {
  registerApi,
  loginApi,
  resetPasswordApi,
  requestPasswordChangeApi,
  changeUserDataApi,
  getUserApi,
  logoutUserApi,
  updateTokenApi
} from "../../utils/account-api";
import { AppDispatch, AppThunk } from "../types";
import { useHistory } from "react-router";
import { getCookie } from "../../utils/cookie-utils";
import { useDispatch } from "../types/hooks";

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_FAILED: "REGISTER_FAILED" = "REGISTER_FAILED";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

export const REQUEST_PASSWORD_CHANGE_ACTIVE: "REQUEST_PASSWORD_CHANGE_ACTIVE" =
  "REQUEST_PASSWORD_CHANGE_ACTIVE";
export const REQUEST_PASSWORD_CHANGE_SUCCESS: "REQUEST_PASSWORD_CHANGE_SUCCESS" =
  "REQUEST_PASSWORD_CHANGE_SUCCESS";
export const REQUEST_PASSWORD_CHANGE_FAILED: "REQUEST_PASSWORD_CHANGE_FAILED" =
  "REQUEST_PASSWORD_CHANGE_FAILED";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" =
  "RESET_PASSWORD_FAILED";

export const CHANGE_USER_DATA_REQUEST: "CHANGE_USER_DATA_REQUEST" =
  "CHANGE_USER_DATA_REQUEST";
export const CHANGE_USER_DATA_SUCCESS: "CHANGE_USER_DATA_SUCCESS" =
  "CHANGE_USER_DATA_SUCCESS";
export const CHANGE_USER_DATA_FAILED: "CHANGE_USER_DATA_FAILED" =
  "CHANGE_USER_DATA_FAILED";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";

export const AUTHORIZATION_CHECKED_COMPLETED: "AUTHORIZATION_CHECKED_COMPLETED" =
  "AUTHORIZATION_CHECKED_COMPLETED";

export const AUTHORIZATION_CHECKED_STARTED: "AUTHORIZATION_CHECKED_STARTED" =
  "AUTHORIZATION_CHECKED_STARTED";

export const LOGOUT_USER: "LOGOUT_USER" = "LOGOUT_USER";

//Register
export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: {
    success: boolean;
    user: {
      email: string;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
  readonly payload: string;
}

//Login
export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: {
    success: boolean;
    user: {
      email: string;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
  readonly payload: string;
}

//Request change password
export interface IRequestPasswordChangeActiveAction {
  readonly type: typeof REQUEST_PASSWORD_CHANGE_ACTIVE;
}

export interface IRequestPasswordChangeSuccessAction {
  readonly type: typeof REQUEST_PASSWORD_CHANGE_SUCCESS;
}

export interface IRequestPasswordChangeFailedAction {
  readonly type: typeof REQUEST_PASSWORD_CHANGE_FAILED;
}

//Reset password
export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

//Change userData
export interface IChangeUserDataRequestAction {
  readonly type: typeof CHANGE_USER_DATA_REQUEST;
}

export interface IChangeUserDataSuccessAction {
  readonly type: typeof CHANGE_USER_DATA_SUCCESS;
  readonly payload: {
    success: boolean;
    user: {
      email: string;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface IChangeUserDataFailedAction {
  readonly type: typeof CHANGE_USER_DATA_FAILED;
}

//get user
export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: {
    success: boolean;
    user: {
      email: string;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IAuthorizationCheckedCompletedAction {
  readonly type: typeof AUTHORIZATION_CHECKED_COMPLETED;
}

export interface IAuthorizationCheckedStartedAction {
  readonly type: typeof AUTHORIZATION_CHECKED_STARTED;
}

export interface ILogoutUserAction {
  readonly type: typeof LOGOUT_USER;
}

export type TUserActions =
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | IRequestPasswordChangeActiveAction
  | IRequestPasswordChangeFailedAction
  | IRequestPasswordChangeSuccessAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IChangeUserDataRequestAction
  | IChangeUserDataSuccessAction
  | IChangeUserDataFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IAuthorizationCheckedCompletedAction
  | ILogoutUserAction
  | IAuthorizationCheckedStartedAction;

export const register = (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    registerApi(userData)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        console.log(err);
        alert(
          "При регистрации произошла ошибка, попробуйте ещё раз или обратитесь в поддержку"
        );
        dispatch({
          type: REGISTER_FAILED,
          payload: err,
        });
      });
  };
};

export const login = (userData: { email: string; password: string }) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    loginApi(userData)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        console.log(err);
        alert(
          "При регистрации произошла ошибка, попробуйте ещё раз или обратитесь в поддержку"
        );
        dispatch({
          type: LOGIN_FAILED,
          payload: err,
        });
      });
  };
};

export const requestPasswordChange = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REQUEST_PASSWORD_CHANGE_ACTIVE,
    });
    requestPasswordChangeApi(email)
      .then((res) => {
        dispatch({
          type: REQUEST_PASSWORD_CHANGE_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: REQUEST_PASSWORD_CHANGE_FAILED,
        });
        console.log(err);
        alert(
          "Произошла ошибка"
        );
      });
  };
};

export const resetPassword = (password: string, code: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPasswordApi(password, code)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
        console.log(err);
        alert(
          "Произошла ошибка"
        );
      });
  };
};

export const changeUserData = (
  name: string,
  email: string,
  password: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: CHANGE_USER_DATA_REQUEST,
    });
    changeUserDataApi(name, email, password)
      .then((res) => {
        dispatch({
          type: CHANGE_USER_DATA_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: CHANGE_USER_DATA_FAILED,
        });
        console.log(err);
      });
  };
};

export const getUser = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserApi()
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_USER_FAILED,
        });
      })
      .finally(() => {
        dispatch({ type: AUTHORIZATION_CHECKED_COMPLETED });
      });
  };
};

export const checkUserAuthorization = () => (dispatch: any) => {
  if (getCookie("accessToken")) {
    dispatch(getUser());
  } else if (getCookie("refreshToken")) {
    dispatch({ type: AUTHORIZATION_CHECKED_STARTED })
    updateTokenApi()
      .catch((err) => {
        console.log(err);
        alert(
          "Произошла ошибка при обновлении токена"
        );
      })
      .finally(() => {
        dispatch(getUser());
      })
  }
  else {
    dispatch({ type: AUTHORIZATION_CHECKED_COMPLETED });
  }
};

export const logoutUser = () => {
  return function (dispatch: AppDispatch) {
    logoutUserApi()
      .then((res) => {
        dispatch({
          type: LOGOUT_USER,
        });
        
      })
      .catch((err) => {
        console.log(err);
        alert('Попытка выхода из аккаунта не удалась')
      });
  };
};