import { create } from 'zustand';
import type { FormInputs } from '../zod/schema';
import { countries } from '../utility/countries';

type FormDataStore = {
  countries: typeof countries;
  items: FormInputs[];
  setItem: (item: FormInputs) => void;
  removeItem: (name: string) => void;
  clearStore: () => void;
};

export const useFormDataStore = create<FormDataStore>((set) => ({
  countries,
  items: [],
  setItem: (item): void => {
    set((state) => ({ items: [...state.items, item] }));
  },
  removeItem: (name): void => {
    set((state) => ({ items: state.items.filter((element) => element.name !== name) }));
  },
  clearStore: (): void => {
    set({ items: [] });
  },
}));
