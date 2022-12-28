import React from 'react'
import logo from '../../assets/img/MainLoGo.png'
import styles from './NavBarLogo.module.css'
import { memo } from 'react'

export const NavBarLogo = memo(() => {

  return (
    <div className={styles.navLogoBlock}>
      <img className={styles.mainLogo} src={logo} alt='Monopoly' />
     <div className={styles.textLogo}>
       Monopoly Game
     </div>
    </div>
  )
})
