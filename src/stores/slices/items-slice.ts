import type { StateCreator } from 'zustand';
import type { ProductDetails } from '../../components/details/details';

export type ItemSlice = {
  items: ProductDetails[];
  setItem: (item: ProductDetails) => void;
  removeItem: (id: number) => void;
  clearStore: () => void;
};

export const useItemSlice: StateCreator<ItemSlice> = (set) => ({
  items: [],
  setItem: (item): void => {
    set((state) => ({ items: [...state.items, item] }));
  },
  removeItem: (id): void => {
    set((state) => ({ items: state.items.filter((element) => element.id !== id) }));
  },
  clearStore: (): void => {
    set({ items: [] });
  },
});
