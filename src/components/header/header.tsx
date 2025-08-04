import type { JSX } from 'react';
import classes from './header.module.css';
import { Link } from 'react-router';
import Theme from '../theme/theme';
import ThemeProvider from '../theme/theme-provider';

export default function Header(): JSX.Element {
  return (
    <header className={classes.header}>
      <h2>My React App</h2>
      <ThemeProvider>
        <Theme />
      </ThemeProvider>
      <nav className={classes.navbar}>
        <Link to={'/'} className={classes['navbar-item']}>
          Home
        </Link>
        <Link to={'about'} className={classes['navbar-item']}>
          About
        </Link>
      </nav>
    </header>
  );
}
