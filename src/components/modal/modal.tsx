import { createPortal } from 'react-dom';
import { useRef } from 'react';
import type { Dispatch, FormEvent, JSX, Ref, SetStateAction } from 'react';
import classes from './modal.module.css';
import type { MouseEvent } from 'react';
import { cells } from '../../utility/country-names';

type ModalProps = {
  dialogReference: Ref<HTMLDialogElement> | undefined;
  setCells: Dispatch<SetStateAction<string[]>>;
};

export default function Modal(props: ModalProps): JSX.Element {
  const { dialogReference, setCells } = props;

  const formReference = useRef<HTMLFormElement>(null);

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

  function handleBlur(event: MouseEvent<HTMLDialogElement>): void {
    if (event.target instanceof HTMLDialogElement && event.target.tagName === 'DIALOG') {
      handleClose();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (formReference.current instanceof HTMLFormElement) {
      const formData = new FormData(formReference.current);
      const data = Object.keys(Object.fromEntries(formData));
      setCells(data);
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
      <div className={classes.head} key={'basic'}>
        <span data-testid="basic" className={classes['head-txt']}>
          Add Cells
        </span>
        <button
          type="button"
          name="close-modal"
          className={classes['close-btn']}
          onClick={handleClose}
          title="Close Modal"
        ></button>
      </div>

      <form ref={formReference} name="cell-form" onSubmit={handleSubmit} className={classes.form}>
        {cells.map((item) => (
          <div key={item} className={classes.list}>
            <input type="checkbox" name={item} id={item} className={classes.checkbox} />
            <label htmlFor={item} className={classes.label}>
              {item}
            </label>
          </div>
        ))}
        <button className={classes.save} type="submit">
          Save
        </button>
      </form>
    </dialog>,
    document.body,
  );
}
