"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

interface DynamicBreadcrumbProps {
  defaultTitle?: string;
  pageTitle?: string;
}

export default function DynamicBreadcrumb({
  defaultTitle = 'Page',
  pageTitle: externalPageTitle,
}: DynamicBreadcrumbProps) {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState(externalPageTitle || defaultTitle);

  useEffect(() => {
    setPageTitle(externalPageTitle || document.title || defaultTitle);
  }, [pathname, defaultTitle, externalPageTitle]);

  const pathSegments = pathname.split('/').filter((segment) => segment !== '');

  if (pathname === '/' || pathname === '/about') {
    return null;
  }

  return (
    <nav
      aria-label="breadcrumb"
      className="container pt-16 mb-4"
      itemScope
      itemType="http://schema.org/BreadcrumbList"
    >
      <ol className="breadcrumb-list flex items-center" itemProp="itemListElement" itemScope itemType="http://schema.org/ItemList">
        <BreadcrumbItem>
          <BreadcrumbLink href="/" itemProp="item" itemScope itemType="http://schema.org/Thing">
            <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 49" className="h-5 w-5 fill-gray-500 hover:fill-gray-600">
              <path d="m0 26.4l21.6-12.5 12.4 21.7-21.6 12.5z" />
              <path d="m15.5 0.1h24.9v25h-24.9z" />
              <path d="m43.5 48.1l-21.5-12.5 12.4-21.7 21.6 12.5z" />
            </svg>
            <span className="sr-only">Home</span>
          </BreadcrumbLink>
          <meta itemProp="name" content="Home" />
          <meta itemProp="position" content="1" />
          <ChevronRight className="h-4 w-4 mr-2" />
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          let segmentTitle = segment.charAt(0).toUpperCase() + segment.slice(1);

          if (pathSegments[0] === 'products' && index === 1) {
            segmentTitle = pageTitle;
          }

          return (
            <BreadcrumbItem
              key={href}
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              {isLast ? (
                <BreadcrumbPage className="text-[#7A7157] text-base" itemProp="name">
                  {segmentTitle}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={href} itemProp="item" itemScope itemType="http://schema.org/Thing">
                  {segmentTitle}
                </BreadcrumbLink>
              )}
              <meta itemProp="position" content={(index + 2).toString()} />
              {!isLast && <ChevronRight className="h-4 w-4" />}
            </BreadcrumbItem>
          );
        })}
      </ol>
    </nav>
  );
}
