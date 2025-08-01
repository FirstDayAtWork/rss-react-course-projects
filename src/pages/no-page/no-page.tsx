import type { JSX } from 'react';
import classes from './no-page.module.css';

export default function NoPage(): JSX.Element {
  return (
    <div className={classes['no-page']}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <img src="pics/homer_grass.gif" alt="page not found" />
    </div>
  );
}
