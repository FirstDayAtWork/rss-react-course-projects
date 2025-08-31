import type { ChangeEvent, Dispatch, JSX, SetStateAction } from 'react';
import classes from './year-selector.module.css';
import { createYearRange } from '../../utility/years';

const years = createYearRange(1750, 2023);

type YearSelectorProps = {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
};

export default function YearSelector(props: YearSelectorProps): JSX.Element {
  const { year, setYear } = props;

  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    setYear(+event.target.value);
  }

  return (
    <select onChange={handleChange} className={classes.select} value={year} name={'year-selector'}>
      {years.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
