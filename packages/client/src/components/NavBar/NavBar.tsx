import styles from './NavBar.module.css'
import { NavBarItem } from '../NavBarItem/NavBarItem'
import React, { useState } from 'react'
import { NavBarProfile } from '../NavBarProfile/NavBarProfile'
import { NavBarLogo } from '../NavBarLogo/NavBarLogo'

interface INavBar{
  userLogo:string,
  userName:string
}


export function NavBar({userLogo, userName}:INavBar) {
  const url = window.location.pathname
  const [activePath, SetActivePath] = useState(url)

  const ClickHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLLinkElement
    const nextPath = target.getAttribute('href')
    if (nextPath) {
      SetActivePath(nextPath)
    }

  }

  return (
    <nav className={styles.NavBar}>
      <NavBarLogo/>
      <ul className={styles.menu}>
        <NavBarItem path='/' title='Search game' activePath={activePath} onClick={ClickHandler} />
        <NavBarItem path='/forum' title='Forum' activePath={activePath} onClick={ClickHandler} />
        <NavBarItem path='/leaderboard' title='LeaderBoard' activePath={activePath} onClick={ClickHandler} />
      </ul>
      <NavBarProfile onClick={ClickHandler} userLogo={userLogo} userName={userName}/>
    </nav>

  )
}