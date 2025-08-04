import type { ErrorInfo, JSX, ReactNode } from 'react';
import { Component } from 'react';
import classes from './error-boundry.module.css';

type ErrorProps = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

type ChildrenProps = {
  children?: ReactNode;
};

export default class ErrorBoundry extends Component<ChildrenProps> {
  state: ErrorProps = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  render(): JSX.Element {
    return (
      <>
        {this.state.errorInfo ? (
          <div className={classes.error} id="fallback" data-testid="fallback">
            <h2>Something went wrong!</h2>
            <p>{this.state.error && this.state.error.toString()}</p>
            <pre>
              <code>{this.state.errorInfo.componentStack}</code>
            </pre>
          </div>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}
