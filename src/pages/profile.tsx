import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import { useState, FC, ChangeEvent, SyntheticEvent, useEffect } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../services/types/hooks";
import { changeUserData } from "../services/actions/authorization";
import { setCookie, getCookie } from "../utils/cookie-utils";
import { logoutUser } from "../services/actions/authorization";

interface IProfilePage {
  name?: string;
  email?: string;
  password: string;
  dataChanged: boolean;
}

export const ProfilePage: FC = () => {

  const { data } = useSelector(state => state.userReducer)
  const name = data?.user.name;
  const email = data?.user.email;

  console.log('profileLoaded')

  const [value, setValue] = useState<IProfilePage>({
    name: name,
    email: email,
    password: "",
    dataChanged: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setCookies();
  }, [])

  const setCookies = () => {
    setCookie('initialName', value.name);
    setCookie('initialEmail', value.email);
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setValue({ ...value, password: e.target.value, dataChanged: true });

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setValue({ ...value, email: e.target.value, dataChanged: true });

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setValue({ ...value, name: e.target.value, dataChanged: true });

  const onSubmit = (e: SyntheticEvent<Element>) => {
    e.preventDefault();
    setValue({ ...value, dataChanged: false });
    setCookies();
    dispatch(changeUserData(value.name, value.email, value.password))
  }

  const onCancel = (e: SyntheticEvent<Element>) => {
    e.preventDefault();
    setValue({ ...value, name: getCookie('initialName'), email: getCookie('initialEmail'), password: '', dataChanged: false })
  }

  const onLogout = () => {
    dispatch(logoutUser());
  }

  if (!data) {
    return(
      <p>Wait</p>
    )
  }

  return (
    <div className={styles.profile}>
      <div className={`${styles.content} mt-30`}>
        <div className={`${styles.linksContainer} mr-15`}>
          <ul className={styles.links}>
            <li className={styles.elementLink}>
              <NavLink
                to="/profile"
                className={`${styles.link} text text_type_main-medium`}
                activeClassName={styles.activeLink}
              >
                Профиль
              </NavLink>
            </li>
            <li className={styles.elementLink}>
              <NavLink
                to="/profile/orders"
                className={`${styles.link} text text_type_main-medium`}
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
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <form className={styles.inputContainer} onSubmit={onSubmit}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChangeName}
            icon={"EditIcon"}
            value={value.name? value.name : 'placeholder'}
            name={"name"}
            error={false}
            // ref={inputRef}
            // onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
          <EmailInput
            value={value.email? value.email : 'placeholder'}
            name={"Логин"}
            onChange={onChangeEmail}
          />
          <PasswordInput
            value={value.password}
            name={"password"}
            onChange={onChangePassword}
          />
          {value.dataChanged? 
            <div className={styles.buttonContainer}>
              <Button type="primary" size="medium" htmlType='submit' >
                Сохранить
              </Button>
              <Button type="primary" size="medium" onClick={onCancel}>
                Отмена
              </Button>
            </div> : null}
        </form>
      </div>
    </div>
  );
};
