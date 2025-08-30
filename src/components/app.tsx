import { Suspense, type JSX } from 'react';
import './app.css';
import Table from './table/table';
import { SkeletonTable } from '../ui/skeleton/table-skeleton';
import { countryNames } from '../utility/country-names';

function App(): JSX.Element {
  return (
    <div className="app">
      <Suspense fallback={<SkeletonTable length={countryNames.length} />}>
        <Table />
      </Suspense>
    </div>
  );
}

export default App;
