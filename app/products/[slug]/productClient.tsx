"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/lib/wishlistStore';
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  brand: string;
  surface: string;
  effect: string;
  thickness: number;
  price: number;
  image: string;
  antislip: string;
  slug: string;
  description?: string;
};

export default function ProductClient() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem2, removeItem, items } = useWishlistStore();

  const isInWishlist = product ? items.some(item => item.id === product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', params.slug)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
      } else {
        setProduct(data);
      }
      setIsLoading(false);
    };

    if (params.slug) {
      fetchProduct();
    }
  }, [params.slug]);

  const handleToggleWishlist = () => {
    if (!product) return;

    if (isInWishlist) {
      removeItem(product.id);
    } else {
      addItem2({
        id: product.id,
        brand: product.brand,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="mb-8">
          <Skeleton className="h-4 w-48 mb-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p>The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container py-6 md:py-12">


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="absolute end-0 top-0 w-0 h-0 border-l-[60px] border-l-transparent border-r-transparent border-t-[60px] border-t-white" />
              <button
                className="absolute end-0 top-0 z-10 p-2 text-gray-900 transition hover:text-gray-900/75"
                onClick={handleToggleWishlist}
              >
                <Heart className={`size-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-red-500'}`} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">{product.brand}</span>
                <h1 className="text-3xl font-bold">{product.name}</h1>
              </div>

              <p className="text-4xl font-bold">${product.price.toFixed(2)}</p>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Product Details</h2>
                <dl className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-gray-600">Surface</dt>
                    <dd className="font-medium">{product.surface}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-gray-600">Effect</dt>
                    <dd className="font-medium">{product.effect}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-gray-600">Thickness</dt>
                    <dd className="font-medium">{product.thickness}mm</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-gray-600">Anti-slip Rating</dt>
                    <dd className="font-medium">{product.antislip}</dd>
                  </div>
                </dl>
              </div>

              {product.description && (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Description</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              )}

              <div className="pt-4">
                <Button size="lg" className="w-full">Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
