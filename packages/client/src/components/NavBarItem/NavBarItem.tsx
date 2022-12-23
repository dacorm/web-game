import { NavLink } from 'react-router-dom'
import styles from './NavBarItem.module.css'
import { NavbarItemProps } from './NavBarItem.types'

const isActive=({ isActive }:{isActive:boolean}) => isActive ? `${styles.menuItem} ${styles.menuItemActive}` : `${styles.menuItem}`

export function NavBarItem({ path, title }: NavbarItemProps) {
  return (
    <li>
      <NavLink to={path} className={isActive}>
        {title}
      </NavLink>
    </li>
  )
}
