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
import { ProfileMenu } from "../components/profile-menu/profile-menu";

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

  if (!data) {
    return(
      <p>Wait</p>
    )
  }

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

  return (
    <div className={styles.profile}>
      <div className={`${styles.content}`}>
        <ProfileMenu />
        <form className={`${styles.inputContainer} mt-30`} onSubmit={onSubmit}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChangeName}
            icon={"EditIcon"}
            value={value.name? value.name : 'placeholder'}
            name={"name"}
            error={false}
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
