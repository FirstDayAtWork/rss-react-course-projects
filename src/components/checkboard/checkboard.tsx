import { useRef, type JSX } from 'react';
import classes from './checkboard.module.css';
import { useItemStore } from '../../stores/store';
import { dataToCsv } from '../../utility/data-to-csv';
import { setBlobUrl } from '../../utility/set-blob-url';

export default function CheckBoard(): JSX.Element {
  const linkReference = useRef<HTMLAnchorElement>(null);
  const items = useItemStore((state) => state.items);
  const clearStore = useItemStore((state) => state.clearStore);

  function handleClearStore(): void {
    clearStore();
  }

  function handleDownload(): void {
    const regex = /id|title|brand|category|stock|price/g;
    const csv = dataToCsv(items, regex);
    const url = setBlobUrl(csv);

    if (linkReference.current) {
      linkReference.current.href = url;
      linkReference.current.download = `${items.length}_items`;
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
            <img src="icons/delete_48.svg" alt="delete icon" width={48} height={48} />
          </button>
          <button
            onClick={handleDownload}
            title="Download"
            className={classes['checkboard-btn']}
            type="button"
          >
            <img src="icons/download_48.svg" alt="download icon" width={48} height={48} />
          </button>
          <a ref={linkReference} href="" download=""></a>
        </div>
      )}
    </>
  );
}
