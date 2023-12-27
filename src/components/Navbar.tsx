import React from "react";
import styles from './Navbar.module.css';
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
  <nav className={styles.navbar}>
    <ul>
      <li>
        <NavLink exact to='/' className={styles.navlink} activeClassName={styles.active}>Таймер</NavLink>
      </li>
      <li>
        <NavLink to='/countdown' className={styles.navlink} activeClassName={styles.active}>Отсчет</NavLink>
      </li>
    </ul>
  </nav>
  );
}
 
export default Navbar;