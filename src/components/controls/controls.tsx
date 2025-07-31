import { useState, type ChangeEvent, type JSX } from 'react';
import classes from './controls.module.css';
import { useStorage } from '../../hooks/use-storage';

type ControlsProps = {
  updateState: (query: string) => void;
};

export default function Controls(props: ControlsProps): JSX.Element {
  const { updateState } = props;

  const [lsValue, setLSValue] = useStorage('', 'query');
  const [value, setValue] = useState(lsValue);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setValue(event?.target.value.trim());
  }

  function handleClick(): void {
    updateState(value);
    setLSValue(value);
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
