import styles from './NavBarProfile.module.css';
import React, { useState } from 'react'
import {NavBarProfileProps } from './NavBarProfile.types';
import { memo } from 'react';
import { NavBarProfileDropMenu } from '../NavBarProfileDropMenu/NavBarProfileDropMenu'

export const  NavBarProfile=memo(({ userLogo, userName }: NavBarProfileProps)=> {
 const [drop, Setdrop]=useState(false)

  const clickHandler=()=>{
    Setdrop(!drop)
  }

 /* document.addEventListener("click", (e)=>{
    Setdrop(false)
    console.log("fghj")
  })*/

  return (
    <div className={styles.navbarUser}>
     <div onClick={clickHandler}>
       <img src={userLogo} className={styles.userLogo} alt={userName} /> {userName}
     </div>
        <NavBarProfileDropMenu drop={drop} onClick={clickHandler}/>
    </div>
  );
});
