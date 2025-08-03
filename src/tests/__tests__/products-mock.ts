import type { ProductDetails } from '../../components/details/details';

export const MockProduct1: ProductDetails = {
  id: 1,
  title: 'Some Title',
  images: ['image.jpg'],
  description: 'Some Description',
  brand: 'hueta',
  price: 69,
  category: 'shit',
  stock: 1,
  dimensions: {
    depth: 2,
    height: 2,
    width: 8,
  },
};

const MockProduct2: ProductDetails = {
  id: 2,
  title: 'Some Title2',
  images: ['yourmom.jpg'],
  description: 'Some Description2',
  brand: 'chepuha',
  price: 96,
  category: 'sameshit',
  stock: 3,
  dimensions: {
    depth: 3,
    height: 2,
    width: 2,
  },
};

export const MockArray: ProductDetails[] = [MockProduct1, MockProduct2];
