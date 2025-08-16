'use client';

import type { KeyboardEvent, ChangeEvent, JSX } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import classes from './controls.module.css';
import { useStorage } from '../../hooks/use-storage';

export default function Controls(): JSX.Element {
  const navigate = useRouter();
  const pathname = usePathname();
  const location = useSearchParams();

  const [lsValue, setLSValue] = useStorage('', 'query');

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setLSValue(event?.target.value.trim());
  }

  function handleClick(): void {
    updatePage(lsValue);
    setLSValue(lsValue);
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      handleClick();
    }
  }

  function updatePage(query: string): void {
    const queries = new URLSearchParams({ page: '1', q: query });
    const preview = `${pathname}?${location}`;
    const current = `${pathname}?${queries}`;
    if (preview === current) {
      return;
    }
    navigate.push(current);
  }

  return (
    <div className={classes['controls']}>
      <input
        className={classes['control-input']}
        value={lsValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="search"
        id="search-field"
        placeholder="Type here..."
      />
      <button
        className={classes['control-search-btn']}
        onClick={handleClick}
        type="button"
        id="search-btn"
      >
        Search
      </button>
    </div>
  );
}
