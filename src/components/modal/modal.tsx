import { createPortal } from 'react-dom';
import type { JSX, Ref } from 'react';
import classes from './modal.module.css';
import Form from '../form/form';

type ModalProps = {
  dialogReference: Ref<HTMLDialogElement> | undefined;
};

export default function Modal(props: ModalProps): JSX.Element {
  const { dialogReference } = props;

  function handleEscape(event: { key: string }): void {
    if (!dialogReference) return;
    if (event.key === 'Escape' && 'current' in dialogReference) {
      dialogReference?.current?.close();
    }
  }

  function handleClose(): void {
    if (!dialogReference) return;

    if ('current' in dialogReference) {
      dialogReference?.current?.close();
    }
  }

  return createPortal(
    <dialog ref={dialogReference} onKeyDown={handleEscape} className={classes.modal}>
      <div className={classes.head}>
        <span className={classes['head-txt']}>Sample123</span>
        <button
          type="button"
          name="close-modal"
          className={classes['close-btn']}
          onClick={handleClose}
        ></button>
      </div>
      <Form />
    </dialog>,
    document.body,
  );
}
