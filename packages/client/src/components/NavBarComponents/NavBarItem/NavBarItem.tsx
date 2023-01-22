import { NavLink } from 'react-router-dom';
import styles from './NavBarItem.module.css';
import { NavbarItemProps } from './NavBarItem.types';

const active = `${styles.menuItem} ${styles.menuItemActive}`;
const inactive = `${styles.menuItem}`;
const isActive = ({ isActive }:{isActive:boolean}) => (isActive ? active : inactive);

export function NavBarItem({ path, title }: NavbarItemProps) {
    return (
        <li>
            <NavLink to={path} className={isActive}>
                {title}
            </NavLink>
        </li>
    );
}
