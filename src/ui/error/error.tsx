import type { JSX } from 'react';
import classes from './error.module.css';

type ErrorMessageProps = {
  error: Error | null;
};

export default function ErrorMessage(props: ErrorMessageProps): JSX.Element {
  const { error } = props;

  return (
    <div className={classes.error} id="error">
      <h2>{error?.name}</h2>
      <h3>{error?.message}</h3>
      <pre>
        <code>{error?.stack}</code>
      </pre>
    </div>
  );
}
