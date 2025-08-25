import { useRef, useState } from 'react';
import type { JSX, MouseEvent } from 'react';
import './app.css';
import Modal from './modal/modal';
import Content from './content/content';

export type ModalVisible = { basic: boolean; advance: boolean };

function App(): JSX.Element {
  const [isVisible, setVisible] = useState<ModalVisible>({ basic: false, advance: false });

  const dialogReference = useRef<HTMLDialogElement>(null);

  function openModal(event: MouseEvent<HTMLButtonElement>): void {
    if (!dialogReference) return;

    if (event.target instanceof HTMLButtonElement) {
      const type = event.target.dataset.modal;
      setVisible({ basic: type === 'basic', advance: type === 'advance' });
      dialogReference.current?.showModal();
    }
  }

  return (
    <>
      <nav className="navbar">
        <button
          className={['btn-style', 'small-btn'].join(' ')}
          data-modal="basic"
          type="button"
          onClick={openModal}
        >
          Basic
        </button>
        <button
          className={['btn-style', 'small-btn'].join(' ')}
          data-modal="advance"
          type="button"
          onClick={openModal}
        >
          Advance
        </button>
      </nav>
      <Content />
      <Modal dialogReference={dialogReference} isVisible={isVisible} setVisible={setVisible} />
    </>
  );
}

export default App;
