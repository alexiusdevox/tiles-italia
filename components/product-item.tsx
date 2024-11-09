"use client"

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { useWishlistStore } from '@/lib/wishlistStore'
import { Heart } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

type ProductCardProps = {
  id: number
  brand: string
  name: string
  price: number
  image: string
  slug: string
  layout: 'grid' | 'list'
}

export default function ProductItem({ id, brand, name, price, image, slug, layout }: ProductCardProps) {
  const { addItem2, removeItem, items } = useWishlistStore()
  const { toast } = useToast()

  const isInWishlist = items.some(item => item.id === id)

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeItem(id)
      toast({
        title: "Removed from Wishlist",
        description: `${name} has been removed from your wishlist.`,
      })
    } else {
      addItem2({ id, brand, name, price, image, quantity: 1 })
      toast({
        title: "Added to Wishlist",
        description: `${name} has been added to your wishlist.`,
      })
    }
  }

  return (
    <Card className={`overflow-hidden ${layout === 'list' ? 'flex' : ''}`}>
      <CardContent className={`p-0 ${layout === 'list' ? 'flex w-full' : ''}`}>
        <Link 
          href={`/products/${slug}`} 
          className={`block relative ${layout === 'list' ? 'flex items-center w-full' : ''}`}
        >
          <div className={`relative ${layout === 'grid' ? 'aspect-square' : 'aspect-square w-1/3 border-r-[1px]'}`}>
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-full pointer-events-none"
            />
            <div className="absolute end-0 top-0 w-0 h-0 border-l-[60px] border-l-transparent border-r-transparent border-t-[60px] border-t-white" />
            <button 
              className="absolute end-0 top-0 z-10 p-2 text-gray-900 transition hover:text-gray-900/75"
              onClick={(e) => {
                e.preventDefault()
                handleToggleWishlist()
              }}
            >
              <Heart className={`size-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-red-500'}`} />
            </button>
          </div>
          <div className={`flex flex-col ${layout === 'list' ? 'flex-grow p-4' : 'p-4'}`}>
            <span className="text-xs text-gray-500 mb-1">{brand}</span>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
            <p className="text-2xl font-bold mt-auto">${price.toFixed(2)}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}