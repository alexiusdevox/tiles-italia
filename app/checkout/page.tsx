import { Metadata } from 'next';
import CheckoutClient from './checkoutClient';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Cart page description',
};

export default function Checkout() {
  return (
    <>
      <CheckoutClient />
    </>
  );
}