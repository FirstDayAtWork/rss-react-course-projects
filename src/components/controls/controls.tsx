import type { ChangeEvent, JSX } from 'react';
import { Component } from 'react';

export default class Controls extends Component {
  state = {
    value: '',
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ value: event?.target.value });
  };

  handleClick = (): void => {
    console.log(this.state.value);
  };

  render(): JSX.Element {
    return (
      <>
        <p>Controls</p>
        <input
          value={this.state.value}
          onChange={this.handleChange}
          type="text"
          id="search-field"
          placeholder="Type here..."
        />
        <button onClick={this.handleClick} type="button">
          Search
        </button>
      </>
    );
  }
}
