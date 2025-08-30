import type { JSX } from 'react';
import classes from './table-skeleton.module.css';

export function SkeletonTable({ length }: { length: number }): JSX.Element {
  const array = Array.from({ length: length });

  return (
    <div className={classes.skeleton}>
      <div className={classes.head}>
        <div className={classes.child}></div>
      </div>
      {array.map((_, index) => (
        <div className={classes.body} key={index}>
          <div className={classes.child}></div>
        </div>
      ))}
    </div>
  );
}
