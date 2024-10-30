"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DynamicTitle({ defaultTitle }: { defaultTitle: string }) {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState(defaultTitle);

  useEffect(() => {
    // Aggiorna il titolo della pagina corrente usando il document.title
    setPageTitle(document.title);
  }, [pathname]);

  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  // Non mostrare il titolo per home, about e slug dinamici come /products/[slug]
  if (pathname === '/' || pathname === '/about' || pathname.startsWith('/products/')) {
    return null;
  }

  return (
    <div className="container">
      <h1 className="text-5xl font-semibold text-[#7A7157]">{pageTitle}</h1>
    </div>
  );
}
