import { FC } from 'react'
import MenuStub from '../../components/MenuStub'
import { NavBar } from '../../components/NavBar'

import styles from './MenuLayout.module.css'
import defaultAvatar from '../../assets/img/defaultUserAvatar.png'
import { Outlet } from 'react-router'

const MenuLayout: FC = () => {
  return (
    <>
      <NavBar userLogo={defaultAvatar} userName="SomeUser" />
      <main className={styles.main}>
        <MenuStub>
          <Outlet />
        </MenuStub>
      </main>
    </>
  )
}

export default MenuLayout
