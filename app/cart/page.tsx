import { Metadata } from 'next';
import CartClient from './cartClient';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Cart page description',
};

export default function Cart() {
  return (
    <>
      <CartClient />
    </>
  );
}