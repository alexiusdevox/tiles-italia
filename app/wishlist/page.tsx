import { Metadata } from 'next';
import WishlistClient from './wishlistClient';

export const metadata: Metadata = {
  title: 'Wishlist s',
  description: 'Wishlist page description',
};

export default function Wishlist() {
  return (
    <>
      <WishlistClient />
    </>
  );
}