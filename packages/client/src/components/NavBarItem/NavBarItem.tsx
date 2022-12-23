import { NavLink } from 'react-router-dom'
import styles from './NavBarItem.module.css'
import { NavbarItemProps } from './NavBarItem.types'


export function NavBarItem({ path, title }: NavbarItemProps) {

  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) => isActive ? `${styles.menuItem} ${styles.menuItemActive}` : `${styles.menuItem}`}>
        {title}
      </NavLink>
    </li>
  )
}
