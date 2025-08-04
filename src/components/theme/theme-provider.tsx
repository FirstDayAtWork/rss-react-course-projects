import type { JSX, ReactNode } from 'react';
import { useState } from 'react';
import { ThemeContext } from './theme-context';

export default function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
  const [theme, setTheme] = useState('dark');

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
