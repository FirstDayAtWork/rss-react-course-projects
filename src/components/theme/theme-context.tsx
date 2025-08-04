import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

type ContextType = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

export const ThemeContext = createContext<ContextType>({
  theme: 'dark',
  setTheme: (value) => value,
});
