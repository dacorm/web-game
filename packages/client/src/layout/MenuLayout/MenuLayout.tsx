import React, { FC } from 'react'
import MenuStub from '../../components/MenuStub'
import { OnlyChildren } from '../../types/global.types'

import style from './MenuLayout.module.scss'

const MenuLayout: FC<OnlyChildren> = ({ children }) => {
  return (
    <>
      <div className="nav-bar" style={{ width: '100%', height: '60px' }}></div>
      <main className={style.main}>
        <MenuStub>{children}</MenuStub>
      </main>
    </>
  )
}

export default MenuLayout
