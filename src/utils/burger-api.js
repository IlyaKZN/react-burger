export const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  } else {
    return res.json();
  }
}

export const getIngredientsData = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
}

export const getOrderNumber = (idList) => {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
      ingredients: ["60d3b41abdacab0026a733c6","60d3b41abdacab0026a733c9"],
    }),
  })
    .then(checkResponse)
}
