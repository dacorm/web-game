import Input from '../../shared/ui/Input'
import { InputFeature } from '../../shared/ui/Input/Input.types'
import React from 'react'
import { ButtonTheme } from '../../shared/ui/Button/Button.types'
import styles from './ProfileFormAvatar.module.css'
import Button from '../../shared/ui/Button'

export function ProfileFormAvatar(){
  return(
    <form className={styles.profileForm}>
      <Input feature={InputFeature.WITH_LABEL} type={'file'} label='Аватар' />

      <Button theme={ButtonTheme.GREEN} type='submit' className={styles.button}>Сохранить</Button>
    </form>
  )



}

