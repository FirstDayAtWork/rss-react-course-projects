import { useEffect, useState, Fragment } from 'react';
import type { JSX, MouseEvent } from 'react';
import { getData } from '../../api/get-data';
import { useQuery } from '../../hooks/use-query';
import { tableHeaderNames } from '../../utility/country-names';
import { isKeyOfType } from '../../utility/key-of-type';
import classes from './table.module.css';
import Popover from '../popover/popover';
import { filterByYear, sortBy } from '../../utility/helpers';

const sortActions = ['ascending', 'descending', 'default'];

type TableProps = {
  year: number;
  search: string;
};

export default function Table(props: TableProps): JSX.Element {
  const { year, search } = props;

  const [isNewData, setStatus] = useState(false);
  const [sortType, setSortType] = useState('default');

  useEffect(() => {
    setStatus(true);

    const timeOut = setTimeout(() => {
      setStatus(false);
    }, 2000);

    return (): void => {
      clearTimeout(timeOut);
    };
  }, [year]);

  const data = useQuery({
    fn: () => getData(),
    key: 'data',
  });

  const filtered = Object.entries(data).filter((item) =>
    item[0].toLowerCase().startsWith(search.toLowerCase()),
  );

  const dataByYear: typeof filtered = filtered.map((item) => {
    return [
      item[0],
      {
        iso_code: item[1].iso_code,
        data: filterByYear(item[1].data, year) || [],
      },
    ];
  });

  const sorted = sortBy(dataByYear, sortType);

  function handlePopulation(event: MouseEvent<HTMLDivElement>): void {
    if (event.target instanceof HTMLButtonElement) {
      setSortType(event.target.dataset.value ?? '');
    }
  }

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.wrapper}>
          {tableHeaderNames.map((item) => (
            <Fragment key={item}>
              {item === 'Population' ? (
                <th className={`${classes.col} ${classes.clickable}`} scope="col">
                  {item}
                  <Popover actions={sortActions} callback={handlePopulation} />
                </th>
              ) : (
                <th className={`${classes.col}`} scope="col">
                  {item}
                </th>
              )}
            </Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((country) => {
          return (
            <tr key={country[0]} className={`${classes.wrapper} `}>
              {tableHeaderNames.map((item, index) => {
                const dataKey = item.toLowerCase();

                if (index === 0) {
                  return (
                    <td className={classes.row} scope="row" key={item + '.'} title={country[0]}>
                      {country[0].length > 20 ? country[0].slice(0, 20) + '...' : country[0]}
                    </td>
                  );
                }

                if (index === 1) {
                  return (
                    <td className={classes.row} scope="row" key={item + '.'}>
                      {country[1].iso_code || 'N/A'}
                    </td>
                  );
                }

                return (
                  <td
                    className={`${classes.row} ${isNewData && classes.highlight}`}
                    scope="row"
                    key={item + '.'}
                  >
                    {(country[1].data[0] &&
                      isKeyOfType(country[1].data[0], dataKey) &&
                      country[1].data[0][dataKey]) ||
                      'N/A'}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
