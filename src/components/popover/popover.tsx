import type { JSX, MouseEvent } from 'react';
import classes from './popover.module.css';

type PopoverProps = {
  actions: string[];
  callback: (event: MouseEvent<HTMLDivElement>) => void;
};

export default function Popover(props: PopoverProps): JSX.Element {
  const { actions, callback } = props;

  return (
    <div className={classes.popover}>
      <button className={classes.button} type="button" popoverTarget="theme-popover">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#e3e3e3"
        >
          <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" />
        </svg>
      </button>
      <div className={classes.wrapper} id="theme-popover" popover="auto">
        <div className={classes.content} onClick={callback}>
          {actions.length > 0 &&
            actions.map((action) => (
              <button
                data-value={action}
                className={classes.option}
                type="button"
                id={action}
                key={action}
              >
                {action}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
