import styles from './order-image.module.css';
import { FC } from "react";
import { useSelector } from "../../services/types/hooks";
import { relative } from 'path';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrderImageProps {
  elId: string;
  index: number;
  amountThisIngredient: number;
  amountIngredients: number;
}

export const OrderImage: FC<IOrderImageProps> = ({ elId, index, amountIngredients, amountThisIngredient }) => {

  const { ingredients } = useSelector(state => state.ingredientsReducer)
  const fullIngredientData = ingredients.find(el => el._id === elId)

  if (index > 5) {
    return null
  }

  if (index === 5) {
    return (
      <div 
        className={styles.sixthImgWrapper}
        style={{
          zIndex: amountIngredients - index,
          left: index * -16,
        }}>
        <img src={fullIngredientData?.image} 
          className={`${styles.imageEl} ${styles.sixthImg}`}
          alt='Изображение ингредиента бургера' />
        <div className={styles.cover}>
          <p className="text text_type_main-medium">{`+${amountIngredients - index}`}</p>
        </div>
        {amountThisIngredient > 1 ? <Counter count={amountThisIngredient} size="default" /> : null}
      </div>
      
    )
  }

  return (
    <div className={styles.wrapper} style={{
      zIndex: amountIngredients - index,
      left: index * -16
    }}>
      {amountThisIngredient > 1 ? <Counter count={amountThisIngredient} size="small" /> : null}
      <img src={fullIngredientData?.image} 
        className={styles.imageEl}
        alt='Изображение ингредиента бургера' />
    </div>
  )
}