import styles from './NavBar.module.css'
import { NavBarItem } from '../NavBarItem'
import React from 'react'
import { NavBarProfile } from '../NavBarProfile'
import { NavBarLogo } from '../NavBarLogo'
import { NavbarItemProps } from '../NavBarItem/NavBarItem.types'
import { NavBarProps } from './NavBar.types'
import {ROUTES} from '../../constants'


const menuItems: NavbarItemProps[] = [
  { id: 1, path: ROUTES.MAIN, title: 'Поиск игры' },
  { id: 2, path: ROUTES.FORUM, title: 'Форум' },
  { id: 3, path: ROUTES.LEADER, title: 'Лидерборд' }
]

export function NavBar({ userLogo, userName }: NavBarProps) {

  return (
    <nav className={styles.navbar}>
      <NavBarLogo />
      <ul className={styles.menu}>
        {menuItems.map((item) => <NavBarItem
          path={item.path}
          title={item.title}
          id={item.id} key={item.id} />)}
      </ul>
      <NavBarProfile userLogo={userLogo} userName={userName} />
    </nav>
  )
}

