'use client';

import { useRef, type JSX } from 'react';
import classes from './checkboard.module.css';
import { useItemStore } from '../../stores/store';
import { compileCSV } from '../../app/compile-csv';
import Image from 'next/image';

export default function CheckBoard(): JSX.Element {
  const linkReference = useRef<HTMLAnchorElement>(null);
  const items = useItemStore((state) => state.items);
  const clearStore = useItemStore((state) => state.clearStore);

  function handleClearStore(): void {
    clearStore();
  }

  async function handleDownload(): Promise<void> {
    const regex = /id|title|brand|category|stock|price/g;

    const response = await compileCSV(items, regex);
    const csv = await response.text();

    if (linkReference.current) {
      linkReference.current.href = csv;
      linkReference.current.download = `${items.length}_items.csv`;
      linkReference.current.click();
    }
  }

  return (
    <>
      {items.length > 0 && (
        <div className={classes.checkboard}>
          <span title="Selected Items" className={classes['checkboard-count']}>
            {items.length}
          </span>
          <button
            onClick={handleClearStore}
            title="Unselect All"
            className={classes['checkboard-btn']}
            type="button"
          >
            <Image src="icons/delete_48.svg" alt="delete icon" width={48} height={48} />
          </button>
          <button
            onClick={handleDownload}
            title="Download"
            className={classes['checkboard-btn']}
            type="button"
          >
            <Image src="icons/download_48.svg" alt="download icon" width={48} height={48} />
          </button>
          <a ref={linkReference} href="" download=""></a>
        </div>
      )}
    </>
  );
}
