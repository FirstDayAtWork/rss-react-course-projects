'use client';

import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import classes from './pagination.module.css';
import { fillArray } from '../../utility/fill-array';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type PaginationProps = {
  total: number;
};

export default function Pagination(props: PaginationProps): JSX.Element {
  const { total } = props;

  const pathname = usePathname();
  const location = useSearchParams();

  const [pageInfo, setPageInfo] = useState(fillArray(total, 10));

  useEffect(() => {
    setPageInfo(fillArray(total, 10));
  }, [total]);

  function handleUrl(value: number): string {
    const queries = new URLSearchParams(location?.toString());
    queries.set('page', value.toString());
    return `${pathname}?${queries}`;
  }

  return (
    <>
      {pageInfo.length > 1 && (
        <div className={classes.pagination}>
          {pageInfo.map((item) => (
            <Link
              href={handleUrl(item)}
              className={`${classes['pagination-btn']} ${location?.get('page') === item.toString() && classes.active}`}
              data-value={item}
              type="button"
              key={item + '.'}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
