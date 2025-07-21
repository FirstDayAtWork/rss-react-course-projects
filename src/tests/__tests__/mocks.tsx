import type { JSX } from 'react';
import { Component } from 'react';

export class MockClass extends Component {
  state = {
    query: '',
  };

  throwError = (): void => {
    throw new Error('Mock Error Example');
  };

  render(): JSX.Element {
    return (
      <>
        <h1>Hello Mock!</h1>
        {this.throwError()}
      </>
    );
  }
}
