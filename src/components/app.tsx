import type { JSX } from 'react';
import { Component } from 'react';
import Controls from './controls/controls';
import './app.css';
import Results from './results/results';

export type Product = {
  id: number;
  title: string;
  description: string;
};

export type Products = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

class App extends Component {
  state: Products = {
    products: [{ id: 0, title: '', description: '' }],
    total: 0,
    skip: 0,
    limit: 0,
  };

  componentDidMount(): void {
    (async (): Promise<void> => {
      const response = await fetch('https://dummyjson.com/products');
      const data: Products = await response.json();
      this.setState({ ...data });
    })();
  }

  render(): JSX.Element {
    return (
      <>
        <h1>My App</h1>
        <Controls />
        <Results products={this.state.products} />
      </>
    );
  }
}

export default App;
