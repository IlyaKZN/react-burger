export const dateReformating = (date: string) => {

  let reformattedDate;
  const nowDate = new Date();
  const orderDate = new Date(date);
  const diff = nowDate.getTime() - orderDate.getTime();
  let millDay = (nowDate.getTime() % 86400000) + 10800000;
  if (millDay > 86400000) {
    millDay = millDay - 86400000
  }

  if (diff < millDay) {
    reformattedDate = `Сегодня, `;
  } else if (diff < millDay + 86400000) {
    reformattedDate = "Вчера";
  } else if (diff < millDay + 86400000 * 4) {
    reformattedDate = `${Math.trunc(diff / 86400000)} дня назад`;
  } else {
    reformattedDate = `${Math.trunc(diff / 86400000)} дней назад`;
  }

  return (
    `${reformattedDate} ${orderDate.getHours()}:${orderDate.getMinutes()} 
              i-GMT+${orderDate.getTimezoneOffset() / -60}`
  )
}