import React, { useState, ChangeEvent, FC, SyntheticEvent, useEffect } from "react";
import formStyles from "./form.module.css";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../services/actions/authorization";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import { useSelector } from "../services/types/hooks";
import { Redirect } from "react-router";

interface ILoginPage {
  email: string;
  password: string;
}

interface LocationState {
  from: string
}

export const LoginPage: FC = () => {

  const [value, setValue] = useState<ILoginPage>({ email: '', password: '' })

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<LocationState>();
  const state:{from: string} = location.state;
  const userState = useSelector(state => state.userReducer);
  const { data: userData } = useSelector(state => state.userReducer);

  useEffect(() => {

    console.log(state)

    return () => {
      console.log(userState)

      }
      
    
  }, [])
  
  if (userData) {
    return (
      <Redirect
                // Если объект state не является undefined, вернём пользователя назад.
        to={ state?.from || '/' }
      />
    );
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, email: e.target.value})
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, password: e.target.value})
  }
  
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({ email: value.email, password: value.password }))
  }

  return (
    <div className={formStyles.wrapper}>
      <form className={formStyles.form} onSubmit={(e)=> handleSubmit(e)}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <EmailInput size="default" onChange={onChangeEmail} value={value.email} name={'email'}/>
        <PasswordInput onChange={onChangePassword} value={value.password} name={'password'} />
        <Button type="primary" size="medium" htmlType="submit">Войти</Button>
        <div className={formStyles.linkContainer}>
          <p className="text text_type_main-default">Вы — новый пользователь?</p>
          <Link to={'/register'} className={`${formStyles.link} text text_type_main-default ml-2`}>Зарегистрироваться</Link>
        </div>
        <div className={formStyles.linkContainer}>
          <p className="text text_type_main-default">Забыли пароль?</p>
          <Link to={'/forgot-password'} className={`${formStyles.link} text text_type_main-default ml-2`}>Восстановить пароль</Link>
        </div>
        <p className="text text_type_main-default"></p>
      </form>
    </div>
  );
}
