import { useEffect } from 'react';
import type { KeyboardEvent, ChangeEvent, JSX } from 'react';
import classes from './controls.module.css';
import { useStorage } from '../../hooks/use-storage';

type ControlsProps = {
  updateState: (query: string) => void;
};

export default function Controls(props: ControlsProps): JSX.Element {
  const { updateState } = props;

  const [lsValue, setLSValue] = useStorage('', 'query');

  useEffect(() => {
    updateState(lsValue);
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setLSValue(event?.target.value.trim());
  }

  function handleClick(): void {
    updateState(lsValue);
    setLSValue(lsValue);
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
        value={lsValue}
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
