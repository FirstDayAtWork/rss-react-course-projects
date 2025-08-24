import { useRef, useState } from 'react';
import type { JSX } from 'react';
import './app.css';
import Modal from './modal/modal';
import Content from './content/content';

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
      <nav className="navbar">
        <button className={['btn-style', 'small-btn'].join(' ')} type="button" onClick={openModal}>
          Modal
        </button>
      </nav>
      <Content />
      <Modal dialogReference={dialogReference} isVisible={isVisible} setVisible={setVisible} />
    </>
  );
}

export default App;
