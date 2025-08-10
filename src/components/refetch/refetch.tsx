import { useQueryClient } from '@tanstack/react-query';
import type { JSX } from 'react';
import classes from './refetch.module.css';

export function Refetch(): JSX.Element {
  const queryClient = useQueryClient();

  function handleClick(): void {
    queryClient.invalidateQueries({ queryKey: ['data'] });
    queryClient.invalidateQueries({ queryKey: ['details'] });
  }

  return (
    <>
      <button className={classes.refetch} onClick={handleClick}>
        Refetch
      </button>
    </>
  );
}
