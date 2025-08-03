import type { MouseEvent, JSX } from 'react';
import { useState, useEffect } from 'react';
import classes from './pagination.module.css';
import { setArray } from '../../utility/set-array';
import type { SetURLSearchParams } from 'react-router';

type PaginationProps = {
  total: number;
  setPage: SetURLSearchParams;
};

export default function Pagination(props: PaginationProps): JSX.Element {
  const { total, setPage } = props;

  const [pageInfo, setPageInfo] = useState(setArray(total, 10));

  useEffect(() => {
    setPageInfo(setArray(total, 10));
  }, [total]);

  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    if (event.target instanceof HTMLElement) {
      setPage({ page: event.target.dataset.value ?? '' });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div className={classes.pagination}>
      {pageInfo.map((item) => (
        <button
          onClick={handleClick}
          className={classes['pagination-btn']}
          data-value={item}
          type="button"
          key={item + '.'}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
