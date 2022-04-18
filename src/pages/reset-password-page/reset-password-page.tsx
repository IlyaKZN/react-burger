import formStyles from '.././form.module.css';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useState, ChangeEvent, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../services/actions/authorization';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../services/types/hooks';
import { Redirect, useLocation } from 'react-router';

interface IResetPasswordPage {
  password: string;
  code: string;
}

interface ILocationState {
  from: string
}

export const ResetPasswordPage: FC = () => {

  const [value, setValue] = useState<IResetPasswordPage>({ password: '', code: '' })
  const dispatch = useDispatch();
  const { resetPasswordSuccess } = useSelector(state => state.userReducer);
  const location = useLocation<ILocationState>();
  const locationState = location.state;

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, password: e.target.value } )
  }

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, code: e.target.value } )
  }

  const handleSubmit = (e?: SyntheticEvent) => {
    e?.preventDefault();
    dispatch(resetPassword(value.password, value.code));
  }

  if (!locationState || locationState.from !== '/forgot-password') {
    return (
      <Redirect to='/forgot-password' />
    )
  }

  if (resetPasswordSuccess) {
    return (
      <Redirect to='/login' />
    )
  }

  return (
    <div className={formStyles.wrapper}>
      <form className={formStyles.form} onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <PasswordInput onChange={onChangePassword} value={value.password} name={'Введите новый пароль'} />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChangeCode}
          value={value.code}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type="primary" size="medium" htmlType='submit' >Сохранить</Button>
        <div className={formStyles.linkContainer}>
          <p className="text text_type_main-default">Вспомнили пароль?</p>
          <Link to={'/login'} className={`${formStyles.link} text text_type_main-default ml-2`}>Войти</Link>
        </div>
        <p className="text text_type_main-default"></p>
      </form>
    </div>
  )
}