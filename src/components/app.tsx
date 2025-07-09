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
    isError: false,
    errorMessage: null,
  };

  componentDidMount(): void {
    (async (): Promise<void> => {
      const lsData = getLSData('query') ?? '';
      try {
        const search = new URLSearchParams();
        if (lsData) {
          search.set('q', lsData.toString() ?? '');
        }
        search.set('limit', lsData ? '10' : '0');
        const url = `https://dummyjson.com/products${search.has('q') ? '/search' : ''}?${search}`;
        const response = await fetch(url);
        const data: Products = await response.json();
        this.setState({ ...data, isLoading: false });
      } catch (error) {
        this.setState({ isError: true, errorMessage: error });
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
          const search = new URLSearchParams();
          search.set('q', this.state.query);
          search.set('limit', '10');
          const url = `https://dummyjson.com/products/search?${search}`;
          const response = await fetch(url);
          const data: Products = await response.json();
          this.setState({ ...data, isLoading: false });
        } catch (error) {
          this.setState({ isError: true, errorMessage: error });
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
        <Results
          products={this.state.products}
          isLoading={this.state.isLoading}
          isError={this.state.isError}
          errorMessage={this.state.errorMessage}
        />
      </>
    );
  }
}

export default App;
