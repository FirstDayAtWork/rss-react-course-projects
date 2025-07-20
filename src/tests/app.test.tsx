import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorBoundry from '../components/error-boundry/error-boundry';
import App from '../components/app';
import { setLSData } from '../utility/local-storage';

describe('Test API', () => {
  it('Should Display Fetched Data on Screen', async () => {
    render(<ErrorBoundry children={<App />} />);

    await waitFor(() => {
      expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument();
    });
  });

  it('Should Display Fetched Data on Screen based on Local Storage Data', async () => {
    setLSData('query', 'powder');

    render(<ErrorBoundry children={<App />} />);

    await waitFor(() => {
      expect(screen.getByText('Protein Powder')).toBeInTheDocument();
    });
  });
});
