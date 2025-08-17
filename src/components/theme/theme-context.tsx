'use client';
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export type ThemeContextType = {
  theme: 'dark' | 'light';
  setTheme: Dispatch<SetStateAction<ThemeContextType['theme']>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: (value) => value,
});
