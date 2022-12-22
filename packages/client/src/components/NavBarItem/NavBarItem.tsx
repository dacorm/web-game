import { Link } from 'react-router-dom'
import styles from "./NavBarItem.module.css"

interface INavbarItemProps{
  path:string,
  title:string,
  activePath:string,
  onClick:(e:React.MouseEvent)=>void
}


export function NavBarItem({path, title, activePath, onClick}:INavbarItemProps) {
  const style=activePath===path?`${styles.menuItem} ${styles.menuItemActive}`:`${styles.menuItem}`

  return (
        <li className={`${style}`}><Link to={path} onClick={onClick}>{title}</Link></li>
  )
}