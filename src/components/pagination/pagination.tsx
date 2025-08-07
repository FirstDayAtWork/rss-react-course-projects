import type { MouseEvent, JSX } from 'react';
import { useState, useEffect } from 'react';
import classes from './pagination.module.css';
import { fillArray } from '../../utility/fill-array';
import type { SetURLSearchParams } from 'react-router';

type PaginationProps = {
  total: number;
  page: URLSearchParams;
  setPage: SetURLSearchParams;
};

export default function Pagination(props: PaginationProps): JSX.Element {
  const { total, page, setPage } = props;

  const [pageInfo, setPageInfo] = useState(fillArray(total, 10));

  useEffect(() => {
    setPageInfo(fillArray(total, 10));
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
      {pageInfo.length > 1 &&
        pageInfo.map((item) => (
          <button
            onClick={handleClick}
            className={`${classes['pagination-btn']} ${page.get('page') === item.toString() && classes.active}`}
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
