import type { Data, DataIso } from '../api/get-data';

export function sortBy(data: [string, DataIso][], mode: string): [string, DataIso][] {
  if (mode === 'default') {
    return data;
  }

  const numbers = sortIt(filterIt(data, 'number'), mode);
  const strings = filterIt(data, 'string');

  return mode === 'ascending' ? [...strings, ...numbers] : [...numbers, ...strings];
}

export function filterIt(
  data: [string, DataIso][],
  mode: 'number' | 'string',
): [string, DataIso][] {
  return data.filter((item) => {
    if (!item[1].data[0]) return;

    if (!item[1].data[0].population) {
      item[1].data[0].population = 'N/A';
    }

    return typeof item[1].data[0].population === mode;
  });
}

export function sortIt(data: [string, DataIso][], mode: string): [string, DataIso][] {
  return data.toSorted((a, b) => {
    return mode === 'ascending'
      ? +a[1].data[0].population - +b[1].data[0].population
      : +b[1].data[0].population - +a[1].data[0].population;
  });
}

export function filterByYear(data: Data[], year: number): Data[] {
  return data.filter((item) => item.year === year);
}
