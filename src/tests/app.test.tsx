import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorBoundry from '../components/error-boundry/error-boundry';
import App from '../components/app';

describe('Test API', () => {
  it('Should Display Fetched Data on Screen', async () => {
    render(<ErrorBoundry children={<App />} />);

    await waitFor(() => {
      expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument();
    });
  });
});
