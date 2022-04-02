import { checkResponse } from "./api-utils";
import { BASE_URL } from "./api-utils";
import { setCookie, getCookie } from "./cookie-utils";

export const registerApi = (userData: { email: string, password: string, name: string }) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
      email: userData.email, 
      password: userData.password, 
      name: userData.name 
    }),
  })
    .then(checkResponse)
    .then((res) => {
      setCookie('accessToken', res.accessToken.split('Bearer ')[1], { expires: 1200 });
      setCookie('refreshToken', res.refreshToken);
      return res
    })
}

export const loginApi = (userData: { email: string, password: string }) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
      email: userData.email, 
      password: userData.password, 
    }),
  })
    .then(checkResponse)
    .then((res) => {
      setCookie('accessToken', res.accessToken.split('Bearer ')[1], { expires: 1200 });
      setCookie('refreshToken', res.refreshToken);
      return res
    })
}

export const requestPasswordChangeApi = (email: string) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
      email: email,
    })
  })
    .then(checkResponse)
}

export const resetPasswordApi = (password: string, code: string) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
      password: password,
      token: code
    })
  })
    .then(checkResponse)
}

export const changeUserDataApi = (name: string, email: string, password: string) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  })
    .then(checkResponse)
    .catch((err) => {
      updateTokenApi()
        .then(res => {
          fetch(`${BASE_URL}/auth/user`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password
            })
          })
        });
      return Promise.reject(`Ошибка: `);
    });
}

export const getUserApi = () => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
    .then(checkResponse)
    .catch((err) => {
      updateTokenApi();
    });
}

export const logoutUserApi = () => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getCookie('refreshToken')
    })
  })
    .then(checkResponse)
}

export const updateTokenApi = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "token": `${getCookie('refreshToken')}`
    })
  })
    .then(checkResponse)
    .then(res => {
      setCookie('accessToken', res.accessToken.split('Bearer ')[1], { expires: 1200 });
      setCookie('refreshToken', res.refreshToken);
    })
}