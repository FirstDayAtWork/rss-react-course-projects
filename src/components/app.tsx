import { Suspense, useRef, useState } from 'react';
import type { JSX, MouseEvent } from 'react';
import './app.css';
import Table from './table/table';
import { SkeletonTable } from '../ui/skeleton/table-skeleton';
import { countryNames } from '../utility/country-names';
import YearSelector from './year-selector/year-selector';
import ErrorBoundry from './error-boundry/error-boundry';
import Search from './search/search';
import Modal from './modal/modal';

function App(): JSX.Element {
  const [year, setYear] = useState(2023);
  const [search, setSearch] = useState('');
  const [cells, setCells] = useState<string[]>([]);

  const dialogReference = useRef<HTMLDialogElement>(null);

  function openModal(event: MouseEvent<HTMLButtonElement>): void {
    if (!dialogReference) return;

    if (event.target instanceof HTMLButtonElement) {
      dialogReference.current?.showModal();
    }
  }

  return (
    <div className="app">
      <ErrorBoundry>
        <header className="header">
          <YearSelector year={year} setYear={setYear} />
          <Search setSearch={setSearch} />
          <button className="cell-btn" type="button" onClick={openModal}>
            Add Cells
          </button>
        </header>
        <Modal dialogReference={dialogReference} setCells={setCells} />
        <Suspense fallback={<SkeletonTable length={countryNames.length} />}>
          <Table year={year} search={search} cells={cells} />
        </Suspense>
      </ErrorBoundry>
    </div>
  );
}

export default App;
