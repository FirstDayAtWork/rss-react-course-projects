import type { JSX } from 'react';
import classes from './header.module.css';
import Theme from '../theme/theme';
import ThemeProvider from '../theme/theme-provider';
import Navigation from './navigation/navigation';

export default function Header(): JSX.Element {
  return (
    <header className={classes.header}>
      <h2>My React App</h2>
      <ThemeProvider>
        <Theme />
      </ThemeProvider>
      <Navigation />
    </header>
  );
}
