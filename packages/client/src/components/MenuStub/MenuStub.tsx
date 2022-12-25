import React, { FC } from 'react'
import { OnlyChildren } from '../../types/global.types'

import style from './MenuStub.module.css'

const MenuStub: FC<OnlyChildren> = ({ children }) => {
  return <section className={style.section}>{children}</section>
}

export default MenuStub
