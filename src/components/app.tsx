import type { JSX } from 'react';
import { Component } from 'react';
import Controls from './controls/controls';
import './app.css';
import Results from './results/results';
import { getLSData } from '../utility/local-storage';

export type Product = {
  id: number;
  title: string;
  images: string[];
  description: string;
};

export type Products = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
  query: string;
};

class App extends Component {
  state = {
    products: [{ id: 0, title: '', images: [''], description: '' }],
    total: 0,
    skip: 0,
    limit: 0,
    query: '',
    isLoading: true,
  };

  componentDidMount(): void {
    (async (): Promise<void> => {
      const lsData = getLSData('query') ?? '';
      try {
        const url = `https://dummyjson.com/products${
          lsData ? '/search?q=' + lsData + '&limit=' + 10 : ''
        }`;
        const response = await fetch(url);
        const data: Products = await response.json();
        this.setState({ ...data, isLoading: false });
      } catch (error) {
        console.error('Error', error);
      }
    })();
  }

  componentDidUpdate(_previousProps: Readonly<object>, previousState: Products): void {
    if (
      typeof this.state.query === 'string' &&
      this.state.query.length > 0 &&
      this.state.query !== previousState.query
    ) {
      (async (): Promise<void> => {
        try {
          this.setState({ isLoading: true });
          const url = `https://dummyjson.com/products/search?q=${this.state.query}&limit=${10}`;
          const response = await fetch(url);
          const data: Products = await response.json();
          this.setState({ ...data, isLoading: false });
        } catch (error) {
          console.error('Error', error);
        }
      })();
    }
  }

  updateState = (query: string): void => {
    this.setState({ query });
  };

  render(): JSX.Element {
    return (
      <>
        <h1>My App</h1>
        <Controls updateState={this.updateState} />
        <Results products={this.state.products} isLoading={this.state.isLoading} />
      </>
    );
  }
}

export default App;
