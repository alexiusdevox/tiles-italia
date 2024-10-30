import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWishlistStore } from '@/lib/wishlistStore';
import { Heart } from 'lucide-react';

type ProductCardProps = {
  id: number;
  brand: string;
  name: string;
  price: number;
  image: string;
  slug: string;
};

export default function ProductFeatured({ id, brand, name, price, image, slug, }: ProductCardProps) {
  const { addItem2, removeItem, items } = useWishlistStore();

  const isInWishlist = items.some(item => item.id === id);

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeItem(id);
    } else {
      addItem2({ id, brand, name, price, image, quantity: 1 });
    }
  };
  
  return (
    <Card key={id} className="overflow-hidden list">
      <CardContent className="p-0 list">
        <Link href={`/products/${slug}`} className="block relative list">
          <div className="relative grid aspect-square overflow-hidden">
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-full pointer-events-none" // Modifiche qui
            />
            <div className="absolute end-0 top-0 w-0 h-0 border-l-[60px] border-l-transparent border-r-transparent border-t-[60px] border-t-white" />
            <button 
              className="absolute end-0 top-0 z-10 p-2 text-gray-900 transition hover:text-gray-900/75"
              onClick={(e) => {
                e.preventDefault();
                handleToggleWishlist();
              }}
            >
              <Heart className={`size-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-red-500'}`} />
            </button>
          </div>
          <div className="flex flex-col p-4">
            <span className="text-xs text-gray-500 mb-1">{brand}</span>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
            <p className="text-2xl font-bold mt-auto">${price.toFixed(2)}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
