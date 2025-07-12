import type { JSX } from 'react';
import { Component } from 'react';
import classes from './error.module.css';

type ErrorMessageProps = {
  error: Error | null;
};

export default class ErrorMessage extends Component<ErrorMessageProps> {
  render(): JSX.Element {
    const { error } = this.props;

    return (
      <div className={classes.error}>
        <h2>{error?.name}</h2>
        <h3>{error?.message}</h3>
        <pre>
          <code>{error?.stack}</code>
        </pre>
      </div>
    );
  }
}
