import React, { FC } from 'react'
import MenuStub from '../../components/MenuStub'
import { NavBar } from '../../components/NavBar'
import { OnlyChildren } from '../../types/global.types'

import style from './MenuLayout.module.scss'
import userLogo from '../../assets/img/userLogo.png'
import { Outlet } from 'react-router'

const MenuLayout: FC<OnlyChildren> = ({ children }) => {
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
