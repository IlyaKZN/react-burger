import emptyContainerStyles from './empty-burger-constructor.module.css';
import PropTypes from "prop-types";

function EmptyBurgerConstructor (props) {

  const { propRef } = props;

  return (
    <div ref={propRef} className={emptyContainerStyles.emptyContainer}>
      <p className='text text_type_main-large'>Добавьте булочку и начинку</p>
    </div>
  )
}

EmptyBurgerConstructor.propTypes = {
  propRef: PropTypes.func.isRequired
};

export default EmptyBurgerConstructor;