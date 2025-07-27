import { useEffect, useState, type JSX } from 'react';
import { useParams } from 'react-router';
import type { Product } from '../../pages/home/home';

type ProductDetails = {
  price: number;
  stock: number;
  category: string;
  brand: string;
} & Product;

export default function Details(): JSX.Element {
  const [data, setData] = useState<ProductDetails>({
    id: 0,
    title: '',
    images: [''],
    description: '',
    price: 0,
    stock: 0,
    category: '',
    brand: '',
  });

  const { details } = useParams();

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const url = `https://dummyjson.com/products/${details}`;
        const response = await fetch(url);
        const data: ProductDetails = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error', error);
      }
    })();
  }, [details]);

  return (
    <div>
      {data.images[0] && <img src={data.images[0]} alt="Product Image" width={200} height={200} />}
      <span>{data.title}</span>
      <p>{data.description}</p>
      <span>{data.price}</span>
      <span>{data.stock}</span>
      <span>{data.category}</span>
      <span>{data.brand}</span>
    </div>
  );
}
