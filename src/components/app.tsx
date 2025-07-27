import { type JSX } from 'react';
import './app.css';
import Header from './header/header';
import { Route, BrowserRouter, Routes } from 'react-router';
import Home from '../pages/home/home';
import About from '../pages/about/about';
import NoPage from '../pages/no-page/no-page';
import Details from './details/details';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":details" element={<Details />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
