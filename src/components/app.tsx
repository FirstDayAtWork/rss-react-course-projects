import type { JSX } from 'react';
import { Component } from 'react';
import Controls from './controls/controls';
import './app.css';
import Results from './results/results';

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
  };

  componentDidMount(): void {
    (async (): Promise<void> => {
      try {
        const url = 'https://dummyjson.com/products';
        const response = await fetch(url);
        const data: Products = await response.json();
        this.setState({ ...data });
      } catch (error) {
        console.error('Error', error);
      }
    })();
  }

  componentDidUpdate(_previousProps: Readonly<object>, previousState: Products): void {
    if (this.state.query.length > 0 && this.state.query !== previousState.query) {
      (async (): Promise<void> => {
        try {
          const url = `https://dummyjson.com/products/search?q=${this.state.query}&limit=${10}`;
          const response = await fetch(url);
          const data: Products = await response.json();
          this.setState({ ...data });
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
        <Results products={this.state.products} />
      </>
    );
  }
}

export default App;
