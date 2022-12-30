import React from 'react'
import { ButtonTheme } from '../../shared/ui/Button/Button.types'
import styles from './ProfileFormAvatar.module.css'
import Button from '../../shared/ui/Button'

export function ProfileFormAvatar(){
  return(
    <form className={styles.profileForm}>
      <label className={styles.label}>
        Выберите Аватар
        <input className={styles.fileInput} type={"file"}/>
      </label>

      <Button theme={ButtonTheme.GREEN} type='submit' className={styles.button}>Сохранить</Button>
    </form>
  )



}

