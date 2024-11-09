import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

type Product = {
  id: number
  brand: string
  name: string
  price: number
  image: string | string[]
  slug: string
}

export default function SearchBar({ products }: { products: Product[] }) {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])

  useEffect(() => {
    if (searchInput.length > 2) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchInput.toLowerCase())
      ).slice(0, 5) // Limit to 5 results for preview
      setSearchResults(filteredProducts)
    } else {
      setSearchResults([])
    }
  }, [searchInput, products])

  return (
    <div className="relative">
      <div className="flex gap-2 mb-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 w-full"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Button type="submit" variant="default">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 border">
          {searchResults.map(product => (
            <Link href={`/products/${product.slug}`} key={product.id} className="flex items-center p-2 hover:bg-gray-100">
              <Image
                src={Array.isArray(product.image) ? product.image[0] : product.image}
                alt={product.name}
                width={50}
                height={50}
                className="object-cover mr-2"
              />
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">{product.brand}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}