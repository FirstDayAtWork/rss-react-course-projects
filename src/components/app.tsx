import { Suspense, type JSX } from 'react';
import './app.css';
import Table from './table/table';

function App(): JSX.Element {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Table />
    </Suspense>
  );
}

export default App;
