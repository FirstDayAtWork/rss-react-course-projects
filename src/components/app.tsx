import { Suspense, useState, type JSX } from 'react';
import './app.css';
import Table from './table/table';
import { SkeletonTable } from '../ui/skeleton/table-skeleton';
import { countryNames } from '../utility/country-names';
import YearSelector from './year-selector/year-selector';
import ErrorBoundry from './error-boundry/error-boundry';
import Search from './search/search';

function App(): JSX.Element {
  const [year, setYear] = useState(2023);
  const [search, setSearch] = useState('');

  return (
    <div className="app">
      <ErrorBoundry>
        <header className="header">
          <YearSelector year={year} setYear={setYear} />
          <Search setSearch={setSearch} />
        </header>
        <Suspense fallback={<SkeletonTable length={countryNames.length} />}>
          <Table year={year} search={search} />
        </Suspense>
      </ErrorBoundry>
    </div>
  );
}

export default App;
