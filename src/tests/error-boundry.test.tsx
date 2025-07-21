import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorBoundry from '../components/error-boundry/error-boundry';
import { MockClass } from './__tests__/mocks';
import App from '../components/app';

describe('Error Catching', () => {
  it('Should catches and handles JavaScript errors in child component', () => {
    const { container } = render(<ErrorBoundry children={<MockClass />} />);

    const fallback = container.querySelector('#fallback');
    expect(fallback).toBeInTheDocument();

    const h2 = container.querySelector('h2');
    const p = container.querySelector('p');

    if (h2 && p) {
      expect(h2).toHaveTextContent('Something went wrong!');
      expect(p).toHaveTextContent('Error: Mock Error Example');
    }
  });
});

describe('Test Error Button', () => {
  it('Should throws error when test button is clicked', () => {
    const { container } = render(<ErrorBoundry children={<App />} />);

    const errorButton = container.querySelector<HTMLButtonElement>('#show-error-btn');

    if (errorButton) {
      fireEvent.click(errorButton);
      const error = container.querySelector('#error');

      expect(error).toBeInTheDocument();

      const h2 = container.querySelector('h2');
      const h3 = container.querySelector('h3');
      const code = container.querySelector('code');

      if (h2 && h3 && code) {
        expect(h2).toHaveTextContent('Test Error');
        expect(h3).toHaveTextContent('Error Example Text 123');
        expect(code).toHaveTextContent('Sample');
      }
    }
  });
});
