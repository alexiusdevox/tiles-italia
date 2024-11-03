import { Metadata } from 'next';
import ProductClient from './productClient';

export const metadata: Metadata = {
  title: 'Kwikdry',
  description: 'Assistance page description',
};

export default function Product() {
  return (
    <>
      <ProductClient />
    </>
  );
}