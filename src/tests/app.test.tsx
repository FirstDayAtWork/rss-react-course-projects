import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../components/app';
import { mockValidFormData } from './__tests__/mocks';

describe('Test App', () => {
  it('Should Render Modal Buttons', async () => {
    render(<App />);

    const basic = screen.getByText('Basic');
    const advance = screen.getByText('Advance');

    expect(basic).toBeInTheDocument();
    expect(advance).toBeInTheDocument();
  });

  it('Should Render Basic Modal', async () => {
    render(<App />);
    const basic = screen.getByText('Basic');
    fireEvent.click(basic);
    const modal = screen.getByTestId('basic');
    expect(modal).toHaveTextContent('Basic');
  });

  it('Should Render Advance Modal', async () => {
    render(<App />);
    const advance = screen.getByText('Advance');
    fireEvent.click(advance);
    const modal = screen.getByTestId('advance');
    expect(modal).toHaveTextContent('Advance');
  });

  it('Should Render Content Card after form Submit', async () => {
    render(<App />);
    const basic = screen.getByText('Advance');
    fireEvent.click(basic);

    const modal = screen.getByTestId('advance');
    expect(modal).toHaveTextContent('Advance');

    for (const [key, value] of Object.entries(mockValidFormData)) {
      if (key === 'terms') {
        const input = screen.getByLabelText('Accept Terms and Conditions agreement');
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: value } });
      } else {
        const input = screen.getByLabelText(key);
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: key === 'image' ? '' : value } });
      }
    }
  });
});
