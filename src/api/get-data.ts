import type { countryNames } from '../utility/country-names';

export type CO2DATA = Record<string, DataIso>;

type DataIso = {
  iso_code: string;
  data: Data[];
};

export type Data = {
  year: number;
  population: number;
  cement_co2: number;
  cement_co2_per_capita: number;
  co2: number;
  co2_per_capita: number;
  coal_co2_per_capita: number;
  gas_co2: number;
  gas_co2_per_capita: number;
  oil_co2: number;
  oil_co2_per_capita: number;
};

export async function getData(): Promise<CO2DATA> {
  const url = `https://raw.githubusercontent.com/FirstDayAtWork/co2_data/refs/heads/main/data.json`;
  const response = await fetch(url);
  return response.json();
}

export async function getCountryData(country: (typeof countryNames)[number]): Promise<CO2DATA> {
  const url = `https://raw.githubusercontent.com/FirstDayAtWork/co2_data/refs/heads/main/countries/${country.replaceAll(' ', '')}.json`;
  const response = await fetch(url);
  return response.json();
}
