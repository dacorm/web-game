import React, { useState } from 'react'
import { ButtonSize, ButtonTheme } from '../../shared/ui/Button/Button.types'
import styles from './ProfileFormAvatar.module.css'
import Button from '../../shared/ui/Button'

export function ProfileFormAvatar() {
  const [file, setFile] = useState('')
  const choosedFiles = file ? `Выбран файл - ${file}` : ''

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    if (target.files)
      if (target.files[0]) {
        setFile(target.files[0].name)
      }
  }

  return (
    <form className={styles.profileForm}>
      <label className={styles.label}>
        Выберите фото
        <input
          className={styles.fileInput}
          type={'file'}
          onChange={changeHandler}
        />
      </label>
      {choosedFiles && <p className={styles.choosedFiles}>{choosedFiles}</p>}
      {choosedFiles && (
        <Button
          theme={ButtonTheme.GREEN}
          size={ButtonSize.M}
          type="submit"
          className={styles.button}>
          Загрузить
        </Button>
      )}
    </form>
  )
}
