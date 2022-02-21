export const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res: Response) => {
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

export const getOrderNumber = (idList: string[]) => {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
      ingredients: idList,
    }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
      alert(
        "При создании заказа произошла ошибка, попробуйте ещё раз или обратитесь в поддержку"
      );
    });
}
