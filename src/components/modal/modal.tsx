import { createPortal } from 'react-dom';
import type { Dispatch, JSX, Ref, SetStateAction } from 'react';
import classes from './modal.module.css';
import Form from '../form/form';

type ModalProps = {
  dialogReference: Ref<HTMLDialogElement> | undefined;
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function Modal(props: ModalProps): JSX.Element {
  const { dialogReference, isVisible, setVisible } = props;

  function handleEscape(event: { key: string }): void {
    if (!dialogReference) return;

    if (event.key === 'Escape' && 'current' in dialogReference) {
      setVisible(false);
      dialogReference?.current?.close();
    }
  }

  function handleClose(): void {
    if (!dialogReference) return;

    if ('current' in dialogReference) {
      setVisible(false);
      dialogReference?.current?.close();
    }
  }

  return createPortal(
    <dialog ref={dialogReference} onKeyDown={handleEscape} className={classes.modal}>
      {isVisible && (
        <>
          <div className={classes.head}>
            <span className={classes['head-txt']}>Sample123</span>
            <button
              type="button"
              name="close-modal"
              className={classes['close-btn']}
              onClick={handleClose}
            ></button>
          </div>
          <Form handleClose={handleClose} />
        </>
      )}
    </dialog>,
    document.body,
  );
}
