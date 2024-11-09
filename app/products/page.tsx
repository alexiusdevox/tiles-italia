import { Metadata } from 'next';
import ProductsClient from './productsClient';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Products page',
};

export default function AccountPage() {
  return (
    <>
      <ProductsClient />
    </>
  );
}