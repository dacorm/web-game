import React from 'react'
import styles from './Form.module.css'
import Input from '../../shared/ui/Input'
import { InputFeature } from '../../shared/ui/Input/Input.types'
import Button from '../../shared/ui/Button'
import { ButtonTheme } from '../../shared/ui/Button/Button.types'
import { FormProps } from './Form.types'

export const Form: React.FC<FormProps> = ({ isAuth }) => {
  return (
    <form className={styles.container}>
      <h1 className={styles.title}>{isAuth ? 'Авторизация' : 'Регистрация'}</h1>
      <Input feature={InputFeature.WITH_LABEL} type={'email'} label='Электронная почта' />
      <Input feature={InputFeature.WITH_LABEL} type={'password'} label='Пароль' />
      {!isAuth && (<>
        <Input feature={InputFeature.WITH_LABEL} type={'password'} label='Повторите пароль' />
        <Input feature={InputFeature.WITH_LABEL} type={'text'} label='Никнейм' />
      </>)}
      <Button theme={ButtonTheme.GREEN} type='submit' className={styles.button}>{isAuth ? 'Войти' : 'Зарегистрироваться'}</Button>
    </form>
  )
}