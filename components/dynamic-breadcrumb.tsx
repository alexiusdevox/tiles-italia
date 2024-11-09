'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"

const DynamicBreadcrumb = () => {
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ label: string; path: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

  // Funzione per determinare se la pagina dovrebbe avere breadcrumb
  const shouldShowBreadcrumbs = (path: string) => {
    const excludedPaths = ['/', '/about']
    return !excludedPaths.includes(path)
  }

  useEffect(() => {
    const generateBreadcrumbs = async () => {
      if (!shouldShowBreadcrumbs(pathname)) {
        setBreadcrumbs([])
        return
      }

      setIsLoading(true)
      const paths = pathname.split('/').filter(path => path)
      const breadcrumbsData = [{ label: 'Home', path: '/' }]
      let currentPath = ''

      for (const path of paths) {
        currentPath += `/${path}`

        try {
          const response = await fetch(currentPath)
          const html = await response.text()
          const parser = new DOMParser()
          const doc = parser.parseFromString(html, 'text/html')

          const metaTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
            doc.querySelector('meta[name="title"]')?.getAttribute('content') ||
            doc.title ||
            path.charAt(0).toUpperCase() + path.slice(1)

          breadcrumbsData.push({
            label: metaTitle,
            path: currentPath
          })
        } catch (error) {
          breadcrumbsData.push({
            label: path.charAt(0).toUpperCase() + path.slice(1),
            path: currentPath
          })
        }
      }

      setBreadcrumbs(breadcrumbsData)
      setIsLoading(false)
    }

    generateBreadcrumbs()
  }, [pathname])

  // Non mostrare nulla nelle pagine escluse
  if (!shouldShowBreadcrumbs(pathname)) {
    return null
  }

  // Skeleton loader solo per le pagine che avranno breadcrumb
  if (isLoading) {
    return (
      <div className="container pt-16 mb-4">
      <Skeleton className="h-6 w-64" />
    </div>
    )
  }

  // Se non ci sono breadcrumb (caso che non dovrebbe verificarsi dato il check iniziale)
  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <Breadcrumb className="container pt-16 mb-4">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem key={breadcrumb.path}>
            {index === breadcrumbs.length - 1 ? (
              <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.path}>
                    {index === 0 ? (
                      <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 49" className="h-5 w-5 fill-gray-500 hover:fill-gray-600">
                        <path d="m0 26.4l21.6-12.5 12.4 21.7-21.6 12.5z" />
                        <path d="m15.5 0.1h24.9v25h-24.9z" />
                        <path d="m43.5 48.1l-21.5-12.5 12.4-21.7 21.6 12.5z" />
                      </svg>
                    ) : (
                      breadcrumb.label
                    )}
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default DynamicBreadcrumb