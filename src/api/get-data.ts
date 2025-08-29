import type { countryNames } from '../utility/country-names';

type CO2DATA = Record<string, Data>;

type Data = {
  year: number;
  population: number;
  cement_co2: number;
  cement_co2_per_capita: number;
  cumulative_cement_co2: number;
  cumulative_luc_co2: number;
  ghg_excluding_lucf_per_capita: number;
  ghg_per_capita: number;
  land_use_change_co2: number;
  land_use_change_co2_per_capita: number;
  methane: number;
  methane_per_capita: number;
  nitrous_oxide: number;
  nitrous_oxide_per_capita: number;
  share_global_cement_co2: number;
  share_global_cumulative_cement_co2: number;
  share_global_cumulative_luc_co2: number;
  share_global_luc_co2: number;
  share_of_temperature_change_from_ghg: number;
  temperature_change_from_ch4: number;
  temperature_change_from_co2: number;
  temperature_change_from_ghg: number;
  temperature_change_from_n2o: number;
  total_ghg: number;
  total_ghg_excluding_lucf: number;
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
