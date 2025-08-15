import type { MouseEvent, JSX } from 'react';
import { useState, useEffect } from 'react';
import classes from './pagination.module.css';
import { fillArray } from '../../utility/fill-array';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  total: number;
};

export default function Pagination(props: PaginationProps): JSX.Element {
  const { total } = props;
  const navigate = useRouter();
  const pathname = usePathname();
  const location = useSearchParams();

  const [pageInfo, setPageInfo] = useState(fillArray(total, 10));

  useEffect(() => {
    setPageInfo(fillArray(total, 10));
  }, [total]);

  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    if (event.target instanceof HTMLElement) {
      const queries = new URLSearchParams({
        page: event.target.dataset.value ?? '',
        q: location?.get('q') ?? '',
      });
      navigate.push(`${pathname}?${queries}`, { scroll: false });

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
            className={`${classes['pagination-btn']} ${location?.get('page') === item.toString() && classes.active}`}
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
