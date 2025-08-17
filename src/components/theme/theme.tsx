'use client';
import Image from 'next/image';

import { use, type JSX } from 'react';
import { ThemeContext } from './theme-context';
import classes from './theme.module.css';

export default function Theme(): JSX.Element {
  const context = use(ThemeContext);

  function handleClick(): void {
    const value = context.theme === 'dark' ? 'light' : 'dark';
    context.setTheme(value);
    document.documentElement.classList.toggle('light');
  }

  return (
    <div>
      <button className={classes['theme-btn']} onClick={handleClick} title="Change theme">
        <Image
          className={context.theme === 'light' ? classes.hide : ''}
          key="dark"
          src="/icons/dark_28.svg"
          alt="theme dark icon"
          width={24}
          height={24}
        />
        <Image
          className={context.theme === 'dark' ? classes.hide : ''}
          key="light"
          src="/icons/light_28.svg"
          alt="theme light icon"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
