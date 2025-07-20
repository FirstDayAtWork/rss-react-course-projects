import type { Product } from '../../components/app';

const MockProduct1: Product = {
  id: 1,
  title: 'Some Title',
  images: ['image.jpg'],
  description: 'Some Description',
};

const MockProduct2: Product = {
  id: 2,
  title: 'Some Title2',
  images: ['image2.jpg'],
  description: 'Some Description2',
};

export const MockArray: Product[] = [MockProduct1, MockProduct2];
