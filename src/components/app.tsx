import { useRef, useState } from 'react';
import type { JSX } from 'react';
import './app.css';
import Modal from './modal/modal';

function App(): JSX.Element {
  const [isVisible, setVisible] = useState(false);
  const dialogReference = useRef<HTMLDialogElement>(null);

  function openModal(): void {
    if (!dialogReference) return;

    setVisible(true);
    dialogReference.current?.showModal();
  }

  return (
    <>
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      <Modal dialogReference={dialogReference} isVisible={isVisible} setVisible={setVisible} />
    </>
  );
}

export default App;
