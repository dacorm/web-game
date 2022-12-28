import Input from '../../shared/ui/Input'
import { InputFeature } from '../../shared/ui/Input/Input.types'
import React from 'react'
import { ButtonTheme } from '../../shared/ui/Button/Button.types'
import styles from './ProfileFormPass.module.css'
import Button from '../../shared/ui/Button'

export function ProfileFormPass(){
  return(
    <form className={styles.profileForm}>
      <Input feature={InputFeature.WITH_LABEL} type={'password'} label='Старый пароль' />
      <Input feature={InputFeature.WITH_LABEL} type={'password'} label='Новый пароль' />
      <Input feature={InputFeature.WITH_LABEL} type={'password'} label='Повторите новый пароль еще раз' />
      <Button theme={ButtonTheme.GREEN} type='submit' className={styles.button}>Сохранить</Button>
    </form>
  )



}

