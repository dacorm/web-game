import styles from './ProfileBlockAvater.module.css'
import React from 'react'
import { ProfileBlockAvatarProps } from './ProfileBlockAvatar.types'
import defaultAvatar from "../../assets/img/defaultUserAvatar.png"



export const ProfileBlockAvatar: React.FC<ProfileBlockAvatarProps>=({avatar, onClick})=>{
  const userAvatar= avatar? avatar: defaultAvatar
  return(
    <div className={styles.blockImage}>
      <div className={styles.divAvatar} onClick={onClick}>
        <img className={styles.avatar}
             alt='userLogo'
             src={userAvatar}
        />
      </div>
    </div>
  )
}