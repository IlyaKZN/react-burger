import styles from './empty-burger-constructor.module.css';
import { FC } from 'react';
import { ConnectDropTarget } from "react-dnd";
import { TIngredientData } from '../../services/types';
import emptyBunImg from '../../images/empty-bun.svg';
import emptyFillingImg from '../../images/empty-filling.svg';

interface IEmptyBurgerConstructorProps {
  propRef: ConnectDropTarget;
  stateIngredients: {
    selectedItems: {
      data: TIngredientData;
      id: string;
    }[];
    bun?: {
      data: TIngredientData;
      id: string;
    };
    totalPrice: number;
    orderNumber: number | null;
  }
}

const EmptyBurgerConstructor: FC<IEmptyBurgerConstructorProps> = ({ propRef }) => {

  return (
    <div ref={propRef} className={styles.emptyContainer}>
      <p className='text text_type_main-large'>Добавьте булочку и начинку</p>
      <img className={styles.bun} src={emptyBunImg} alt='Изображение контура булки' />
      <img src={emptyFillingImg} alt='Изображение контура котлеты' />
      <img className={styles.bun} src={emptyBunImg} alt='Изображение контура булки' />
    </div>
  )
}


export default EmptyBurgerConstructor;