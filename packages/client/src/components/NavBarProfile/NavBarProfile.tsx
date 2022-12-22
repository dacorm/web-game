import styles from './NavBarProfile.module.css'
import { Link } from 'react-router-dom'
import React from 'react'


interface INavBarProfile{
  onClick:(e:React.MouseEvent)=>void
  userLogo:string,
  userName: string
}

export function NavBarProfile({onClick, userLogo, userName}:INavBarProfile){

  return(
    <div className={styles.NavBarUser}>
      <Link to={'/profile'} onClick={onClick}>
        <img src={userLogo} className={styles.userlogo} alt={userName}/> {userName}
      </Link>
    </div>


  )


}