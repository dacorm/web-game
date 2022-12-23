import styles from './NavBarProfileDropMenu.module.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants'

interface NavBarProfileDropMenuProps {
  drop: boolean
  onClick: () => void
}


export function NavBarProfileDropMenu({ drop, onClick }: NavBarProfileDropMenuProps) {

  const style = drop ? `${styles.dropdown} ${styles.dropdownActive}` : `${styles.dropdown}`

  return (
    <ul className={style} onClick={onClick}>
      <li className={styles.dropdownItem}>
        <Link to={ROUTES.PROFILE} >
          Профиль
        </Link>
      </li>
      <li>Выйти</li>
    </ul>
  )

}