'use client';

import type { JSX } from 'react';
import classes from './close-details.module.css';
import { useRouter } from 'next/navigation';

export default function CloseDetail(): JSX.Element {
  const navigate = useRouter();

  function handleCloseEvent(): void {
    navigate.back();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <button
      type="button"
      name="close-details"
      className={classes.close}
      onClick={handleCloseEvent}
    ></button>
  );
}
