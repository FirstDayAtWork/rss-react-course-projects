import type { JSX } from 'react';
import classes from './loader.module.css';

export default function Loader(): JSX.Element {
  return (
    <div className={[classes['loader'], classes['show-loader']].join(' ')}>
      <svg
        className={classes.circle}
        xmlns="http://www.w3.org/2000/svg"
        width="100px"
        height="100px"
        viewBox="0 0 24 24"
      >
        <path
          d="M10.8 22.4C6 21.9 2.1 18 1.6 13.2.9 7.1 5.4 1.9 11.3 1.5c.4 0 .7-.3.7-.7 0-.4-.4-.8-.8-.8C4.8.4-.2 5.9 0 12.5.2 18.6 5.4 23.8 11.5 24c6.6.2 12-4.8 12.4-11.2 0-.4-.3-.8-.8-.8-.4 0-.7.3-.7.7-.3 5.9-5.5 10.4-11.6 9.7z"
          fill="oklch(0.7 0.12 260)"
        />
      </svg>
    </div>
  );
}
