import { checkResponse } from "./api-utils";
import { BASE_URL } from "./api-utils";
import { getCookie } from "./cookie-utils";

export const getIngredientsData = () => {
  return fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
}

export const getOrderNumber = (idList: string[]) => {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify({
      ingredients: idList,
    })
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
      alert(
        "При создании заказа произошла ошибка, попробуйте ещё раз или обратитесь в поддержку"
      );
    });
}
