import emptyContainerStyles from './empty-burger-constructor.module.css';
import { FC } from 'react';
import { ConnectDropTarget } from "react-dnd";

interface IEmptyBurgerConstructorProps {
  propRef: ConnectDropTarget
}

const EmptyBurgerConstructor: FC<IEmptyBurgerConstructorProps> = ({ propRef }) => {

  return (
    <div ref={propRef} className={emptyContainerStyles.emptyContainer}>
      <p className='text text_type_main-large'>Добавьте булочку и начинку</p>
    </div>
  )
}


export default EmptyBurgerConstructor;