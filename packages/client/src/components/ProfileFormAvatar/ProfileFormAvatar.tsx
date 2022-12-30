import React, { useState } from 'react'
import { ButtonTheme } from '../../shared/ui/Button/Button.types'
import styles from './ProfileFormAvatar.module.css'
import Button from '../../shared/ui/Button'

export function ProfileFormAvatar(){
  const [file, Setfile]=useState('')
  const choosedFiles=file ? `Выран файл - ${file}`: ''

  const changeHandler=(e:React.FormEvent<HTMLInputElement>)=>{
    const target =e.target as HTMLInputElement
    if(target.files)
    if(target.files[0]){
      Setfile(target.files[0].name)
    }
  }

  return(
    <form className={styles.profileForm}>
      <label className={styles.label}>
        Выберите Аватар
        <input className={styles.fileInput} type={"file"} onChange={changeHandler}/>
      </label>
      {choosedFiles && <p className={styles.choosedFiles}>{choosedFiles}</p>}
      <Button theme={ButtonTheme.GREEN} type='submit' className={styles.button}>Сохранить</Button>
    </form>
  )



}

