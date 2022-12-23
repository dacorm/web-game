import React from 'react'
import logo from '../../assets/img/MainLoGo.png'
import styles from './NavBarLogo.module.css'

export function NavBarLogo() {

  return (
    <div>
      <img className={styles.mainLogo} src={logo} alt='Monopoly' />
      Monopoly Game</div>
  )
}
