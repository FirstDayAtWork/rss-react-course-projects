'use client';

import type { JSX } from 'react';

export default function Error({ error }: { error: Error & { digest?: string } }): JSX.Element {
  return (
    <div>
      <h2>{error.name}</h2>
      <h3>{error.message}</h3>
      <pre>
        <code>{error.stack}</code>
      </pre>
    </div>
  );
}
