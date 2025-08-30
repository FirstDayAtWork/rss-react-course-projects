import type { JSX } from 'react';
import type { Data } from '../../api/get-data';
import { getData } from '../../api/get-data';
import { useQuery } from '../../hooks/use-query';
import { tableHeaderNames } from '../../utility/country-names';
import { isKeyOfType } from '../../utility/key-of-type';
import classes from './table.module.css';

function filterByYear(data: Data[], year: number): Data[] {
  return data.filter((item) => item.year === year);
}

export default function Table(): JSX.Element {
  const data = useQuery({
    fn: () => getData(),
    key: 'data',
  });

  const countries = Object.keys(data);

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.wrapper}>
          {tableHeaderNames.map((item) => (
            <th className={classes.col} scope="col" key={item}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => {
          const filtered = filterByYear(data[country].data, 2023);

          return (
            <tr key={country} className={classes.wrapper}>
              {tableHeaderNames.map((item, index) => {
                const dataKey = item.toLowerCase();

                if (index === 0) {
                  return (
                    <td className={classes.row} scope="row" key={item + '.'} title={country}>
                      {country.length > 20 ? country.slice(0, 20) + '...' : country}
                    </td>
                  );
                }

                if (index === 1) {
                  return (
                    <td className={classes.row} scope="row" key={item + '.'}>
                      {data[country].iso_code || 'N/A'}
                    </td>
                  );
                }

                return (
                  <td className={classes.row} scope="row" key={item + '.'}>
                    {(isKeyOfType(filtered[0], dataKey) && filtered[0][dataKey]) || 'N/A'}
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
