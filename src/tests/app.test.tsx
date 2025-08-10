import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorBoundry from '../components/error-boundry/error-boundry';
import App from '../components/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Test API', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        experimental_prefetchInRender: true,
      },
    },
  });

  it('Should Display Fetched Data on Screen', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ErrorBoundry children={<App />} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Some Title')).toBeInTheDocument();
    });
  });

  it('Should Display Details', async () => {
    window.scrollTo = vi.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <ErrorBoundry children={<App />} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const item = screen.getByText('Some Title');
      expect(item).toBeInTheDocument();

      fireEvent.click(item);
      const detail = screen.getByText('brand');
      expect(detail).toBeInTheDocument();
    });
  });
});
