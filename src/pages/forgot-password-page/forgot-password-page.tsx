import formStyles from '.././form.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { requestPasswordChange } from '../../services/actions/authorization';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../services/types/hooks';
import { Redirect, useLocation } from 'react-router';

export const ForgotPasswordPage: FC = () => {

  const [value, setValue] = useState<string>('')

  const dispatch = useDispatch();
  const { requestChangePasswordSuccess } = useSelector((state) => state.userReducer)
  const location = useLocation();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e?: SyntheticEvent) => {
    e?.preventDefault();
    dispatch(requestPasswordChange(value));
  }

  if(requestChangePasswordSuccess) {
    return(
      <Redirect to={{ pathname: '/reset-password', state: {from :location.pathname} }} />
    )
  }

  return(
    <div className={formStyles.wrapper}>
      <form className={formStyles.form} onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <EmailInput size="default" onChange={onChangeEmail} value={value} name={'email'} />
        <Button type="primary" size="medium" htmlType='submit' >Восстановить</Button>
        <div className={formStyles.linkContainer}>
          <p className="text text_type_main-default">Вспомнили пароль?</p>
          <Link to={'/login'} className={`${formStyles.link} text text_type_main-default ml-2`}>Войти</Link>
        </div>
        <p className="text text_type_main-default"></p>
      </form>
    </div>
  )
}