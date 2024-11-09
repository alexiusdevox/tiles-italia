'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ChevronRight, Filter, Search } from 'lucide-react'
import ProductCard from '@/components/product-item'
import FiltersAside from '@/components/filters-aside'
import SelectedFilters from '@/components/selected-filters'
import Toolbar from '@/components/toolbar'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import SearchBar from '@/components/header/search-bar'
import { Product } from '@/lib/models/ProductModel'

type FilterState = {
  brand: string[]
  surface: string[]
  effect: string[]
  thickness: number[]
  priceRange: [number | null, number | null]
  antislip: string[]
  application: string
  setting: string
  size: string[]
  environment: string
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchInput, setSearchInput] = useState('') 
  const [isSearching, setIsSearching] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const productsPerPage = 12

  const [filters, setFilters] = useState<FilterState>({
    effect: [],
    brand: [],
    surface: [],
    thickness: [],
    antislip: [],
    priceRange: [null, null],
    application: 'Wall',
    setting: 'Indoor',
    size: [],
    environment: '',
  })

  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const updateURLWithFilters = () => {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'priceRange') {
        if (value[0] !== null) queryParams.set("minPrice", value[0].toString())
        if (value[1] !== null) queryParams.set("maxPrice", value[1].toString())
      } else if (Array.isArray(value) && value.length > 0) {
        queryParams.set(key, value.join(","))
      } else if (!Array.isArray(value) && value !== '') {
        queryParams.set(key, value)
      }
    })

    queryParams.set("page", currentPage.toString())
    if (searchTerm) queryParams.set("search", searchTerm)
    router.push(`?${queryParams.toString()}`, { scroll: false })
  }

  const loadFiltersFromURL = () => {
    const query = new URLSearchParams(window.location.search)
    const newFilters = { ...filters }

    Object.keys(newFilters).forEach((key) => {
      const filterKey = key as keyof FilterState
      const value = query.get(key)

      if (!value) return

      switch (filterKey) {
        case 'priceRange':
          const minPrice = query.get("minPrice")
          const maxPrice = query.get("maxPrice")
          newFilters.priceRange = [
            minPrice ? Number(minPrice) : null,
            maxPrice ? Number(maxPrice) : null
          ]
          break

        case 'brand':
        case 'surface':
        case 'effect':
        case 'antislip':
        case 'size':
          newFilters[filterKey] = value.split(",")
          break

        case 'thickness':
          newFilters[filterKey] = value.split(",").map(Number)
          break

        case 'application':
        case 'setting':
        case 'environment':
          newFilters[filterKey] = value
          break
      }
    })

    setFilters(newFilters)

    const pageQuery = query.get("page")
    if (pageQuery) {
      setCurrentPage(Number(pageQuery))
    }

    const searchQuery = query.get("search")
    if (searchQuery) {
      setSearchTerm(searchQuery)
      setSearchInput(searchQuery)
    }
  }

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true)
      loadFiltersFromURL()
      await fetchProducts()
      setIsLoading(false)
    }
    loadInitialData()
  }, [])

  useEffect(() => {
    applyFiltersAndSearch()
  }, [filters, products, searchTerm])

  useEffect(() => {
    updateURLWithFilters()
  }, [filteredProducts, currentPage, searchTerm])

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')

    if (error) {
      console.error('Error fetching products:', error)
    } else {
      setProducts(data)
      setFilteredProducts(data)
    }
  }

  const applyFiltersAndSearch = () => {
    let filtered = products.filter(product => {
      // Parse surface
      let productSurfaces = []
      try {
        if (typeof product.surface === 'string') {
          const parsed = JSON.parse(product.surface)
          productSurfaces = Array.isArray(parsed) ? parsed : [parsed]
        } else if (Array.isArray(product.surface)) {
          productSurfaces = product.surface
        } else if (product.surface) {
          productSurfaces = [product.surface]
        }
      } catch (e) {
        productSurfaces = Array.isArray(product.surface) 
          ? product.surface 
          : [product.surface]
      }

      // Parse thickness
      let productThicknesses = []
      try {
        if (typeof product.thickness === 'string') {
          const parsed = JSON.parse(product.thickness)
          productThicknesses = Array.isArray(parsed) ? parsed : [parsed]
        } else if (Array.isArray(product.thickness)) {
          productThicknesses = product.thickness
        } else if (product.thickness) {
          productThicknesses = [product.thickness]
        }
      } catch (e) {
        productThicknesses = Array.isArray(product.thickness) 
          ? product.thickness 
          : [product.thickness]
      }

      // Parse size
      let productSizes = []
      try {
        if (typeof product.size === 'string') {
          const parsed = JSON.parse(product.size)
          productSizes = Array.isArray(parsed) ? parsed : [parsed]
        } else if (Array.isArray(product.size)) {
          productSizes = product.size
        } else if (product.size) {
          productSizes = [product.size]
        }
      } catch (e) {
        productSizes = Array.isArray(product.size) 
          ? product.size 
          : [product.size]
      }

      // Helper function to check if arrays have any common elements
      const hasCommonElement = (arr1: any[], arr2: any[]) => {
        return arr1.some(item => arr2.includes(String(item)))
      }

      // Apply search filter
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)

      return (
        matchesSearch &&
        (filters.brand.length === 0 || filters.brand.includes(product.brand)) &&
        (filters.surface.length === 0 || hasCommonElement(filters.surface, productSurfaces)) &&
        (filters.thickness.length === 0 || hasCommonElement(filters.thickness, productThicknesses.map(String))) &&
        (filters.size.length === 0 || hasCommonElement(filters.size, productSizes)) &&
        (filters.effect.length === 0 || filters.effect.includes(product.effect)) &&
        (filters.antislip.length === 0 || filters.antislip.includes(product.antislip)) &&
        (filters.priceRange[0] === null || product.price >= filters.priceRange[0]) &&
        (filters.priceRange[1] === null || product.price <= filters.priceRange[1]) &&
        (!filters.application || product.application === filters.application) &&
        (!filters.setting || product.setting === filters.setting)
      )
    })

    setFilteredProducts(filtered)
    if (searchTerm !== '') {
      setCurrentPage(1)
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
    if (value.length > 0) {
      const newSuggestions = products
        .filter(product => 
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          product.brand.toLowerCase().includes(value.toLowerCase())
        )
        .map(product => product.name)
        .slice(0, 5)
      setSuggestions(newSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchInput(suggestion);
    setShowSuggestions(false);
    setSearchTerm(suggestion); // Imposta direttamente il termine di ricerca
    applyFiltersAndSearch();    // Applica direttamente i filtri
};


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setSearchTerm(searchInput)
    setShowSuggestions(false)

    // Auto-update radio filters based on search results
    const searchResults = products.filter(product => 
      product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchInput.toLowerCase())
    )

    if (searchResults.length > 0) {
      const newFilters = { ...filters }
      let filtersUpdated = false

      // Update application filter
      const applications = new Set(searchResults.map(p => p.application))
      if (applications.size === 1 && !applications.has(filters.application)) {
        const applicationValue = applications.values().next().value;
        if (applicationValue !== undefined) { // Controllo aggiunto
          newFilters.application = applicationValue;
          filtersUpdated = true;
        }
      }
      

      // Update setting filter
      const settings = new Set(searchResults.map(p => p.setting))
      if (settings.size === 1 && !settings.has(filters.setting)) {
        newFilters.setting = settings.values().next().value
        filtersUpdated = true
      }

      if (filtersUpdated) {
        setFilters(newFilters)
      }
    }

    applyFiltersAndSearch()
    setIsSearching(false)
  }

  const removeFilter = (filterType: keyof FilterState, value: string | number) => {
    setFilters(prevFilters => {
      if (filterType === 'application' || filterType === 'setting') {
        return {
          ...prevFilters,
          [filterType]: ''
        }
      } else {
        return {
          ...prevFilters,
          [filterType]: Array.isArray(prevFilters[filterType])
            ? (prevFilters[filterType] as any[]).filter(item => item !== value)
            : prevFilters[filterType]
        }
      }
    })
  }

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = 3
    const ellipsisThreshold = 2

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - ellipsisThreshold && i <= currentPage + ellipsisThreshold)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                paginate(i)
              }}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      } else if (
        (i === currentPage - ellipsisThreshold - 1 && i > 1) ||
        (i === currentPage + ellipsisThreshold + 1 && i < totalPages)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }

    return items
  }

  return (
    <div className="container py-10">
      <div className="mb-6 relative" ref={searchRef}>
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={handleSearchInputChange}
              className="w-full"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button type="submit" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </form>
      </div>

      <Toolbar
        products={products}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        layout={layout}
        setLayout={setLayout}
        productsPerPage={productsPerPage}
      />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile filter drawer */}
        <div className="md:hidden mb-4">
          <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[85vh] flex flex-col">
              <DrawerHeader className="flex-shrink-0">
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>
                  Apply filters to refine your product search.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex-grow overflow-y-auto px-4">
                <FiltersAside
                  filters={filters}
                  setFilters={setFilters}
                  products={products}
                  removeFilter={removeFilter}
                />
              </div>
              <DrawerFooter className="flex-shrink-0">
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Desktop filter sidebar */}
        <aside className="hidden md:block w-full md:w-1/4">
          <FiltersAside
            filters={filters}
            setFilters={setFilters}
            products={products}
            removeFilter={removeFilter}
          />
        </aside>

        <main className="w-full md:w-3/4">
          <SelectedFilters filters={filters} removeFilter={removeFilter} />
          <div className={`${layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4' : 'flex flex-col space-y-4'}`}>
            {isLoading ? (
              Array(12).fill(0).map((_, index) => (
                <Skeleton key={index} className="h-40 w-full" />
              ))
            ) : (
              currentProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  brand={product.brand}
                  name={product.name}
                  price={product.price}
                  image={Array.isArray(product.image) ? product.image[0] : product.image}
                  slug={product.slug}
                  layout={layout}
                />
              ))
            )}
          </div>
          {!isLoading && filteredProducts.length > 0 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) paginate(currentPage - 1)
                    }}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) paginate(currentPage + 1)
                    }}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>
    </div>
  )
}