import { BiPencil } from 'react-icons/all'
import styles from '../../pages/Profile/Profile.module.css'

export function ProfileEdit(){

  return(
    <>
      <div className={styles.pencil}>
        <BiPencil /> Изменить аватар
      </div>
    </>

  )

}