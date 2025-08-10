import { render, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Controls from '../components/controls/controls';
import { getLSData, setLSData } from '../utility/local-storage';
import { MemoryRouter } from 'react-router';

describe('rendering', () => {
  it('should render search input', () => {
    const mockState = vi.fn();
    render(
      <MemoryRouter>
        <Controls updatePage={mockState} />
      </MemoryRouter>,
    );
    const input = screen.getByPlaceholderText('Type here...');
    expect(input).toBeInTheDocument();
  });

  it('should render search button', () => {
    const mockState = vi.fn();
    render(
      <MemoryRouter>
        <Controls updatePage={mockState} />
      </MemoryRouter>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should displays previously saved search term from localStorage on mount', () => {
    const mockState = vi.fn();
    setLSData('query', 'some text');
    render(
      <MemoryRouter>
        <Controls updatePage={mockState} />
      </MemoryRouter>,
    );
    const input: HTMLInputElement = screen.getByPlaceholderText('Type here...');
    expect(input.value).toBe('some text');
  });

  it('should displays empty input if no data in localstorage', () => {
    const mockState = vi.fn();
    localStorage.removeItem('query');
    render(
      <MemoryRouter>
        <Controls updatePage={mockState} />
      </MemoryRouter>,
    );
    const input: HTMLInputElement = screen.getByPlaceholderText('Type here...');
    expect(input.value).toBe('');
  });
});

describe('user interaction', () => {
  it('should Updates input value when user types', () => {
    const mockState = vi.fn();
    render(
      <MemoryRouter>
        <Controls updatePage={mockState} />
      </MemoryRouter>,
    );
    const input: HTMLInputElement = screen.getByPlaceholderText('Type here...');

    fireEvent.change(input, { target: { value: 'exampletext123' } });
    expect(input?.value).toBe('exampletext123');
  });

  it('should saves search term to localStorage when search button is clicked', () => {
    const mockState = vi.fn();
    render(
      <MemoryRouter>
        <Controls updatePage={mockState} />
      </MemoryRouter>,
    );
    const input: HTMLInputElement = screen.getByPlaceholderText('Type here...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'exampletext123' } });
    fireEvent.click(button);
    const lsData = getLSData('query');
    expect(lsData).toBe('exampletext123');
  });

  it('should saves search term to localStorage when Enter is clicked', () => {
    const mockState = vi.fn();
    render(
      <MemoryRouter>
        <Controls updatePage={mockState} />
      </MemoryRouter>,
    );
    const input: HTMLInputElement = screen.getByPlaceholderText('Type here...');

    fireEvent.change(input, { target: { value: 'exampletext123' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    const lsData = getLSData('query');
    expect(lsData).toBe('exampletext123');
  });
});

describe('LocalStorage Integration', () => {
  it('should overwrites existing localStorage value when new search is performed', () => {
    const mockState = vi.fn();
    render(
      <MemoryRouter>
        <Controls updatePage={mockState} />
      </MemoryRouter>,
    );
    const input: HTMLInputElement = screen.getByPlaceholderText('Type here...');
    const button = screen.getByRole('button');
    setLSData('query', 'current');
    const currentLsData = getLSData('query');

    fireEvent.change(input, { target: { value: 'new data' } });
    fireEvent.click(button);
    const newLsData = getLSData('query');
    expect(currentLsData).not.toBe(newLsData);
  });
});
