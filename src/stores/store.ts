import { create } from 'zustand';

import { useItemSlice, type ItemSlice } from './slices/items-slice';

type ItemStore = ItemSlice;

export const useItemStore = create<ItemStore>((...a) => ({
  ...useItemSlice(...a),
}));
