import burgerFace from '../images/Burger404.svg';
import styles from './not-found404.module.css';
import { Link } from 'react-router-dom';

export const NotFound404 = () => {
  return (
    <div className={styles.page}>
      <img src={burgerFace} className={styles.burgerFace} alt='Изображения лицо-бургера' />
      <h1 className="text text_type_main-large">К сожалению данная страница не найдена,
        но вы можете перейти на нашу
        <Link to='/' className={styles.link}> главную страницу</Link>
      </h1>
    </div>
  )
}