import React from 'react'
import logo from '../../assets/img/MainLoGo.png'
import styles from './NavBarLogo.module.css'
import { memo } from 'react'
export const NavBarLogo = memo(()=> {

  return (
    <div>
      <img className={styles.mainLogo} src={logo} alt='Monopoly' />
      Monopoly Game</div>
  )
})
