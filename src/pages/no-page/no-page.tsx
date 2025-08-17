import type { JSX } from 'react';
import classes from './no-page.module.css';
import Image from 'next/image';

export default function NoPage(): JSX.Element {
  return (
    <div className={classes['no-page']}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <Image src="/pics/homer_grass.gif" alt="page not found" width={500} height={375} />
    </div>
  );
}
