import { FC } from 'react'
import { OnlyChildren } from '../../types/global.types'

import styles from './MenuStub.module.css'

const MenuStub: FC<OnlyChildren> = ({ children }) => {
  return <section className={styles.section}>{children}</section>
}

export default MenuStub
