import { useState } from 'react';
import type { KeyboardEvent, ChangeEvent, JSX } from 'react';
import classes from './controls.module.css';
import { useStorage } from '../../hooks/use-storage';

type ControlsProps = {
  updateState: (query: string) => void;
};

export default function Controls(props: ControlsProps): JSX.Element {
  const { updateState } = props;

  const [lsValue, setLSValue] = useStorage('', 'query');
  const [value, setValue] = useState(lsValue);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     updateState(value);
  //   }, 1000);

  //   return (): void => clearTimeout(timer);
  // }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setValue(event?.target.value.trim());
  }

  function handleClick(): void {
    updateState(value);
    setLSValue(value);
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      handleClick();
    }
  }

  return (
    <div className={classes['controls']}>
      <input
        className={classes['control-input']}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
