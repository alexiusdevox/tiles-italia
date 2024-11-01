import { Metadata } from 'next';
import ProductsClient from './productsClient';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Account page description',
};

export default function AccountPage() {
  return (
    <>
      <ProductsClient />
    </>
  );
}