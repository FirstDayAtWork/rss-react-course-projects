import type { ChangeEvent, JSX } from 'react';
import { Component } from 'react';
import classes from './controls.module.css';
import { getLSData, setLSData } from '../../utility/local-storage';

type ControlsProps = {
  updateState: (query: string) => void;
};

export default class Controls extends Component<ControlsProps> {
  state = {
    value: '',
  };

  componentDidMount(): void {
    const lsData = getLSData('query') ?? '';
    this.setState({ value: lsData });
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ value: event?.target.value.trim() });
  };

  handleClick = (): void => {
    this.props.updateState(this.state.value);
    setLSData('query', this.state.value);
  };

  render(): JSX.Element {
    return (
      <div className={classes['controls']}>
        <input
          className={classes['control-input']}
          value={this.state.value}
          onChange={this.handleChange}
          type="search"
          id="search-field"
          placeholder="Type here..."
        />
        <button className={classes['control-search-btn']} onClick={this.handleClick} type="button">
          Search
        </button>
      </div>
    );
  }
}
