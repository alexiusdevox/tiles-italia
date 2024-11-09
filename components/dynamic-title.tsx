"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import Head from 'next/head'; // Importa Head per aggiornare il titolo lato server

interface DynamicTitleProps {
  defaultTitle?: string;
  pageTitle?: string;
}

export default function DynamicTitlecrumb({
  defaultTitle = 'Page', 
  pageTitle: externalPageTitle
}: DynamicTitleProps) {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState(externalPageTitle || defaultTitle);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setPageTitle(document.title);
    setLoading(false);
  }, [pathname]);

  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  if (pathname === '/' || pathname === '/about' || pathname === '/sign-in' || pathname.startsWith('/products/')) {
    return null;
  }

  return (
    <div className="container">
      <Head>
        <title>{pageTitle}</title> {/* Titolo per SEO */}
      </Head>
      {loading ? (
        <Skeleton className="h-12 w-48" />
      ) : (
        <h1 className="text-5xl font-semibold text-[#7A7157]">{pageTitle}</h1>
      )}
    </div>
  );
}
