import { createPortal } from 'react-dom';
import type { Dispatch, JSX, Ref, SetStateAction } from 'react';
import classes from './modal.module.css';
import Form from '../form/form';
import type { MouseEvent } from 'react';
import type { ModalVisible } from '../app';
import BasicForm from '../basic-form/basic-form';

type ModalProps = {
  dialogReference: Ref<HTMLDialogElement> | undefined;
  isVisible: ModalVisible;
  setVisible: Dispatch<SetStateAction<ModalVisible>>;
};

export default function Modal(props: ModalProps): JSX.Element {
  const { dialogReference, isVisible, setVisible } = props;

  function handleEscape(event: { key: string }): void {
    if (!dialogReference) return;

    if (event.key === 'Escape' && 'current' in dialogReference) {
      setVisible({ basic: false, advance: false });
      dialogReference?.current?.close();
    }
  }

  function handleClose(): void {
    if (!dialogReference) return;

    if ('current' in dialogReference) {
      setVisible({ basic: false, advance: false });
      dialogReference?.current?.close();
    }
  }

  function handleBlur(event: MouseEvent<HTMLDialogElement>): void {
    if (event.target instanceof HTMLDialogElement && event.target.tagName === 'DIALOG') {
      handleClose();
    }
  }

  return createPortal(
    <dialog
      onClick={handleBlur}
      ref={dialogReference}
      onKeyDown={handleEscape}
      className={classes.modal}
    >
      {isVisible.basic && (
        <>
          <div className={classes.head} key={'basic'}>
            <span data-testid="basic" className={classes['head-txt']}>
              Basic
            </span>
            <button
              type="button"
              name="close-modal"
              className={classes['close-btn']}
              onClick={handleClose}
              title="Close Modal"
            ></button>
          </div>
          <BasicForm handleClose={handleClose} />
        </>
      )}

      {isVisible.advance && (
        <>
          <div className={classes.head} key={'advance'}>
            <span data-testid="advance" className={classes['head-txt']}>
              Advance
            </span>
            <button
              type="button"
              name="close-modal"
              className={classes['close-btn']}
              onClick={handleClose}
              title="Close Modal"
            ></button>
          </div>
          <Form handleClose={handleClose} />
        </>
      )}
    </dialog>,
    document.body,
  );
}
