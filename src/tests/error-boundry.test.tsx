import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorBoundry from '../components/error-boundry/error-boundry';
import { MockClass } from './__tests__/mocks';

describe('Error Catching', () => {
  it('Should catches and handles JavaScript errors in child component', () => {
    render(<ErrorBoundry children={<MockClass />} />);

    const fallback = screen.getByTestId('fallback');
    expect(fallback).toBeInTheDocument();

    const h2 = screen.getByText('Something went wrong!');
    const p = screen.getByRole('paragraph');

    expect(h2).toHaveTextContent('Something went wrong!');
    expect(p).toHaveTextContent('Error: Mock Error Example');
  });
});
