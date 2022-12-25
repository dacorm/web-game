import { FC } from 'react'
import MenuStub from '../../components/MenuStub'
import { NavBar } from '../../components/NavBar'

import style from './MenuLayout.module.css'
import userLogo from '../../assets/img/userLogo.png'
import { Outlet } from 'react-router'

const MenuLayout: FC = () => {
  return (
    <>
      <NavBar userLogo={userLogo} userName="SomeUser" />
      <main className={style.main}>
        <MenuStub>
          <Outlet />
        </MenuStub>
      </main>
    </>
  )
}

export default MenuLayout
