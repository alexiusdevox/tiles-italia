import { Metadata } from 'next';
import AboutClient from './aboutClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'Account page description',
};

export default function AboutPage() {
  return (
    <>
      <AboutClient />
    </>
  );
}