import type { JSX } from 'react';
import classes from './header.module.css';
import { NavLink } from 'react-router';
import Theme from '../theme/theme';
import ThemeProvider from '../theme/theme-provider';

const navNames = ['Home', 'About'];

export default function Header(): JSX.Element {
  return (
    <header className={classes.header}>
      <h2>My React App</h2>
      <ThemeProvider>
        <Theme />
      </ThemeProvider>
      <nav className={classes.navbar}>
        {navNames.map((item) => (
          <NavLink
            key={item}
            to={item === 'Home' ? '/' : item.toLowerCase()}
            className={({ isActive }) =>
              `${classes['navbar-item']} ${isActive ? classes.active : ''}`
            }
            {...(item === 'Home' && { end: true })}
          >
            {item}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
