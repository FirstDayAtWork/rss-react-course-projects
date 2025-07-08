import type { JSX } from 'react';
import { Component } from 'react';
import type { Product } from '../app';

type ResultProps = {
  products: Product[];
};

export default class Results extends Component<ResultProps> {
  state = {
    value: '',
  };

  render(): JSX.Element {
    const { products } = this.props;
    console.log(products);
    return (
      <>
        <p>Results</p>
        <ul>
          {products.map((item) => (
            <li key={item.id + '.'}>
              <span>{item.title}</span>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
