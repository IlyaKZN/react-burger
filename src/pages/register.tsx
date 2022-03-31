import formStyles from './form.module.css';
import { useState, ChangeEvent, FC, SyntheticEvent } from 'react';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from '../services/types/hooks';
import { register } from '../services/actions/authorization';

interface IRegisterPage {
  email: string;
  password: string;
  name: string;
}

export const RegisterPage: FC = () => {

  const [value, setValue] = useState<IRegisterPage>({ email: '', password: '', name: '' })

  const disptach = useDispatch();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, email: e.target.value})
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, password: e.target.value})
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, name: e.target.value})
  }

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    disptach(register({ email: value.email, password: value.password, name: value.name }));
  }


  return(
    <div className={formStyles.wrapper}>
      <form className={formStyles.form}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChangeName}
          // icon={'CurrencyIcon'}
          value={value.name}
          name={'name'}
          error={false}
          // ref={}
          // onIconClick={}
          errorText={'Ошибка'}
          size={'default'}
        />
        <EmailInput size="default" onChange={onChangeEmail} value={value.email}/>
        <PasswordInput onChange={onChangePassword} value={value.password} name={'password'} />
        <Button type="primary" size="medium" onClick={(e) => submitForm(e)}>Зарегистрироваться</Button>
        <div className={formStyles.linkContainer}>
          <p className="text text_type_main-default">Уже зарегистрированы?</p>
          <Link to={'/login'} className={`${formStyles.link} text text_type_main-default ml-2`}>Войти</Link>
        </div>
        <p className="text text_type_main-default"></p>
      </form>
    </div>
  )
}