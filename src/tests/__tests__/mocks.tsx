import type { JSX } from 'react';
import { Component } from 'react';

export class MockClass extends Component {
  state = {
    query: '',
  };

  updateState = (query: string): void => {
    this.setState({ query });
  };

  render(): JSX.Element {
    return <h1>Hello Mock!</h1>;
  }
}
