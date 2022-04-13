import { useParams } from "react-router";
import { useSelector } from "../../services/types/hooks";
import styles from './order-info.module.css';
import { TIngredientData, TOrderData } from "../../services/types";
import { FC, useState } from "react";
import { useEffect } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { dateReformating } from "../../utils/date-reformating";
import { Preloader } from "../preloader/preloader";

interface TOrderInfoState {
  order: TOrderData | undefined;
}

export const OrderInfo: FC = () => {

  const [state, setState] = useState<TOrderInfoState>({ order: undefined })
  const params: {number: string} = useParams();
  const { ingredients } = useSelector(state => state.ingredientsReducer);
  const ordersData = {
    feedOrdersData: useSelector(state => state.feedOrdersReducer.feedOrdersData),
    userOrdersData: useSelector(state => state.userOrdersReducer.userOrdersData)
  }
  const orders = ordersData?.feedOrdersData?.orders ? ordersData?.feedOrdersData.orders : ordersData!.userOrdersData!.orders;
  const fullIngredientsData: { data: TIngredientData | undefined, quantity: number }[] = []

  useEffect(() => {
    //Узнаём номер и данные заказа
    const order = orders?.find((el) => {
      return el.number.toString() === params.number
    })
    setState({ ...state, order: order })

  },[orders])

  let price = 0;

  if(!state.order) {
    return <><Preloader /></>
  }

  //Создаём массив с полными данными ингредиентов заказа и их колличеством, а также считаем сумму заказа
  state.order.ingredients.forEach((orderIngredient) => {
    const ingredientData = ingredients.find((ingredient) => (
      ingredient._id === orderIngredient
    ))
    const fullIngredientData = {
      data: fullIngredientsData.find((el) => (el.data?._id === orderIngredient)),
      index : fullIngredientsData.findIndex((el) => (el.data?._id === orderIngredient))
    }
    
    if(!fullIngredientData.data) {
      fullIngredientsData.push({ data: ingredientData, quantity: ingredientData?.type === 'bun' ? 2 : 1 });
      price = ingredientData?.type === 'bun' ? price + ingredientData.price * 2 : price + ingredientData!.price;
    } else {
      if (ingredientData?.type === 'bun') {
        return
      }
      fullIngredientsData[fullIngredientData.index] = { data: ingredientData, 
        quantity: fullIngredientsData[fullIngredientData.index].quantity + 1 };
      price = price + ingredientData!.price;
    }
  })

  if (price === 0) {
    return(
      <>
      <Preloader />
      </>
      
    )
  }

  return (
    <div className={styles.orderWrapper}>
      <p className="text text_type_main-medium mt-10 mb-3">{state.order?.name}</p>
      {state.order?.status === 'done' ? 
        <p className={`text text_type_main-default mb-15 ${styles.doneStatus}`}>Выполнен</p> :
        <p className="text text_type_main-default mb-15">Готовится</p>
      }
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={`${styles.ingredientsList} mb-10 pr-6`}>
      {fullIngredientsData.map((el) => (
        <li key={el!.data!._id} className={styles.ingredientData}>
          <img className={`${styles.ingredientImg} mr-4`} src={el.data?.image} />
          <p className="text text_type_main-default">{el.data?.name}</p>
          <div className={styles.priceContainer}>
            <p className="text text_type_digits-default mr-2">{`${el.quantity} x ${el!.data!.price}`}</p>
            <CurrencyIcon type="primary" />
          </div>
        </li>
      ))}
      </ul>
      <div className={styles.ingredientFooter}>
        <p className="text text_type_main-default text_color_inactive">{dateReformating(state.order.createdAt)}</p>
        <div className={styles.priceContainer}>
          <p className="text text_type_digits-default mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      
    </div>
  )
}