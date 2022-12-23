import styles from './NavBar.module.css'
import { NavBarItem } from '../NavBarItem'
import React from 'react'
import { NavBarProfile } from '../NavBarProfile'
import { NavBarLogo } from '../NavBarLogo'
import { NavbarItemProps } from '../NavBarItem/NavBarItem.types'
import { NavBarProps } from './NavBar.types'

const menuItems:NavbarItemProps[]=[
  {path:"/", title:"Поиск игры"},
  {path:"/forum", title:"Форум"},
  {path:"/leaderboard", title:"Лидерборд"}
]

export function NavBar({userLogo, userName}:NavBarProps) {

  return (
    <nav className={styles.navbar}>
      <NavBarLogo/>
      <ul className={styles.menu}>
        {menuItems.map((item)=><NavBarItem path={item.path} title={item.title}/>)}
      </ul>
      <NavBarProfile  userLogo={userLogo} userName={userName}/>
    </nav>

  )
}
