import { Metadata } from 'next';
import AccountClient from './accountClient';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Account page description',
};

export default function AccountPage() {
  return (
    <>
      <AccountClient />
    </>
  );
}