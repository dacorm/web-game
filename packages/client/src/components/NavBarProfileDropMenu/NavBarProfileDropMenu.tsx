import styles from './NavBarProfileDropMenu.module.css'
import React from 'react'
import { Link } from 'react-router-dom'

interface NavBarProfileDropMenuProps {
  drop: boolean
  onClick: () => void
}


export function NavBarProfileDropMenu({ drop, onClick }: NavBarProfileDropMenuProps) {

  const style = drop ? `${styles.dropdown} ${styles.dropdownActive}` : `${styles.dropdown}`

  return (
    <ul className={style} onClick={onClick}>
      <li className={styles.dropdownItem}>
        <Link to={'/profile'} >
          Профиль
        </Link>
      </li>
      <li>Выйти</li>
    </ul>
  )

}