export const BASE_URL = 'https://norma.nomoreparties.space/api';


export const checkResponse = (res: Response) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  } else {
    return res.json();
  }
}