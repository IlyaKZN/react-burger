import styles from './profile-menu.module.css';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../services/actions/authorization';
import { useDispatch } from '../../services/types/hooks';
import { useLocation } from 'react-router';
import { FC } from 'react';

export const ProfileMenu: FC = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  const onLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <div className={`${styles.linksContainer} mr-15`}>
          <ul className={styles.links}>
            <li className={styles.elementLink}>
              <NavLink
                exact
                to="/profile"
                className={location.pathname === '/profile' ?
                  `${styles.link} ${styles.activeLink} text text_type_main-medium` :
                  `${styles.link} text text_type_main-medium`}
              >
                Профиль
              </NavLink>
            </li>
            <li className={styles.elementLink}>
              <NavLink
                exact
                to="/profile/orders"
                className={location.pathname === '/profile/orders' ?
                  `${styles.link} ${styles.activeLink} text text_type_main-medium` :
                  `${styles.link} text text_type_main-medium`}
              >
                История заказов
              </NavLink>
            </li>
            <li className={styles.elementLink}>
              <button
                className={`${styles.link} text text_type_main-medium`}
                onClick={onLogout}
              >
                Выход
              </button>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_inactive">
            {location.pathname === '/profile' ?
              'В этом разделе вы можете изменить свои персональные данные' :
              'В этом разделе вы можете просмотреть свою историю заказов'}
          </p>
        </div>
  )
}