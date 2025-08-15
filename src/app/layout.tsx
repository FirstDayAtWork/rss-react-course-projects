import type { JSX, ReactNode } from 'react';
import type { Metadata } from 'next';
import '../../src/index.css';
import Header from '../components/header/header';

export const metadata: Metadata = {
  title: 'Some Website',
  description: 'React Course App',
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
