import type { JSX } from 'react';
import { getData } from '../../api/get-data';
import { useQuery } from '../../hooks/use-query';

export default function Table(): JSX.Element {
  const data = useQuery({
    fn: () => getData(),
    key: 'data',
  });

  console.log(data);

  return <h1>Table</h1>;
}
