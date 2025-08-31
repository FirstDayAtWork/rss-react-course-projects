import { useState } from 'react';
import type { ChangeEvent, Dispatch, JSX, SetStateAction, KeyboardEvent } from 'react';
import classes from './search.module.css';

type SeachProps = {
  setSearch: Dispatch<SetStateAction<string>>;
};

export default function Search(props: SeachProps): JSX.Element {
  const { setSearch } = props;

  const [value, setValue] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setValue(event?.target.value.trim());
  }

  function handleClick(): void {
    setSearch(value);
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      handleClick();
    }
  }

  return (
    <div className={classes.search}>
      <input
        className={classes.input}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="search"
        id="search"
        placeholder="Type here..."
        list="country-list"
      />

      <button className={classes.button} onClick={handleClick} type="button" id="search-btn">
        Search
      </button>
    </div>
  );
}
