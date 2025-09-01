import type { ChangeEvent, Dispatch, JSX, SetStateAction } from 'react';
import { useCallback, memo } from 'react';
import classes from './year-selector.module.css';
import { createYearRange } from '../../utility/years';

const years = createYearRange(1750, 2023);

type YearSelectorProps = {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
};

function YearSelector(props: YearSelectorProps): JSX.Element {
  const { year, setYear } = props;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>): void => {
      setYear(+event.target.value);
    },
    [setYear],
  );

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

export default memo(YearSelector);
