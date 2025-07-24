import { useEffect, useState, type ChangeEvent, type JSX } from 'react';
import classes from './controls.module.css';
import { getLSData, setLSData } from '../../utility/local-storage';

type ControlsProps = {
  updateState: (query: string) => void;
};

export default function Controls(props: ControlsProps): JSX.Element {
  const { updateState } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    const lsData: string = getLSData('query') ?? '';
    setValue(lsData);
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setValue(event?.target.value.trim());
  }

  function handleClick(): void {
    updateState(value);
    setLSData('query', value);
  }

  return (
    <div className={classes['controls']}>
      <input
        className={classes['control-input']}
        value={value}
        onChange={handleChange}
        type="search"
        id="search-field"
        placeholder="Type here..."
      />
      <button
        className={classes['control-search-btn']}
        onClick={handleClick}
        type="button"
        id="search-btn"
      >
        Search
      </button>
    </div>
  );
}
