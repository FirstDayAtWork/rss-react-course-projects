import { useRef } from 'react';
import type { JSX } from 'react';
import './app.css';
import Modal from './modal/modal';

function App(): JSX.Element {
  const dialogReference = useRef<HTMLDialogElement>(null);

  function openModal(): void {
    if (!dialogReference) return;
    dialogReference.current?.showModal();
  }

  return (
    <>
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      <Modal dialogReference={dialogReference} />
    </>
  );
}

export default App;
