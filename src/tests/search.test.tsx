import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Controls from '../components/controls/controls';
import { getLSData, setLSData } from '../utility/local-storage';
import { MemoryRouter } from 'react-router';

describe('rendering', () => {
  it('should render search input', () => {
    const mockState = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <Controls updateState={mockState} />
      </MemoryRouter>,
    );
    const input = container.querySelector<HTMLInputElement>('#search-field');
    expect(input).toBeInTheDocument();
  });

  it('should render search button', () => {
    const mockState = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <Controls updateState={mockState} />
      </MemoryRouter>,
    );
    const button = container.querySelector<HTMLButtonElement>('#search-btn');
    expect(button).toBeInTheDocument();
  });

  it('should displays previously saved search term from localStorage on mount', () => {
    const mockState = vi.fn();
    setLSData('query', 'some text');
    const { container } = render(
      <MemoryRouter>
        <Controls updateState={mockState} />
      </MemoryRouter>,
    );
    const input = container.querySelector<HTMLInputElement>('#search-field');
    expect(input?.value).toBe('some text');
  });

  it('should displays empty input if no data in localstorage', () => {
    const mockState = vi.fn();
    localStorage.removeItem('query');
    const { container } = render(
      <MemoryRouter>
        <Controls updateState={mockState} />
      </MemoryRouter>,
    );
    const input = container.querySelector<HTMLInputElement>('#search-field');
    expect(input?.value).toBe('');
  });
});

describe('user interaction', () => {
  it('should Updates input value when user types', () => {
    const mockState = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <Controls updateState={mockState} />
      </MemoryRouter>,
    );
    const input = container.querySelector<HTMLInputElement>('#search-field');

    if (input) {
      fireEvent.change(input, { target: { value: 'exampletext123' } });
      expect(input?.value).toBe('exampletext123');
    }
  });

  it('should saves search term to localStorage when search button is clicked', () => {
    const mockState = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <Controls updateState={mockState} />
      </MemoryRouter>,
    );
    const input = container.querySelector<HTMLInputElement>('#search-field');
    const button = container.querySelector<HTMLButtonElement>('#search-btn');

    if (input && button) {
      fireEvent.change(input, { target: { value: 'exampletext123' } });
      fireEvent.click(button);
      const lsData = getLSData('query');
      expect(lsData).toBe('exampletext123');
    }
  });
});

describe('LocalStorage Integration', () => {
  it('should overwrites existing localStorage value when new search is performed', () => {
    const mockState = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <Controls updateState={mockState} />
      </MemoryRouter>,
    );
    const input = container.querySelector<HTMLInputElement>('#search-field');
    const button = container.querySelector<HTMLButtonElement>('#search-btn');
    setLSData('query', 'current');
    const currentLsData = getLSData('query');

    if (input && button) {
      fireEvent.change(input, { target: { value: 'new data' } });
      fireEvent.click(button);
      const newLsData = getLSData('query');
      expect(currentLsData).not.toBe(newLsData);
    }
  });
});
