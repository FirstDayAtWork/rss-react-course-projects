'use client';

import type { JSX } from 'react';
import Link from 'next/link';
import classes from './navigation.module.css';
import { usePathname } from 'next/navigation';

const navNames = [
  { name: 'Home', path: '/' },
  { name: 'About', path: 'about' },
];

export default function Navigation(): JSX.Element {
  const pathname = usePathname();

  return (
    <nav className={classes.navbar}>
      {navNames.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          className={`${classes['navbar-item']} ${pathname === item.path ? classes.active : ''}`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
