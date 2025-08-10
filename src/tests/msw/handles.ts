import { http, HttpResponse } from 'msw';
import { MockProduct1, MockProducts } from '../__tests__/products-mock';

export const handlers = [
  http.get('https://dummyjson.com/products/search', () => {
    return HttpResponse.json(MockProducts);
  }),
  http.get('https://dummyjson.com/products/:id', () => {
    return HttpResponse.json(MockProduct1);
  }),
];
