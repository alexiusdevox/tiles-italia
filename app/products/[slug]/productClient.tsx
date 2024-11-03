'use client'

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle, ZoomIn, Minus, Plus, ZoomOut } from 'lucide-react';
import { useWishlistStore } from '@/lib/wishlistStore';
import { useRecentViewedStore } from '@/lib/recentViewedStore';
import { Skeleton } from "@/components/ui/skeleton";
import { RecentlyViewed } from '@/components/recent-viewed-store';
import RelatedProducts from '@/components/related-products';
import { Product } from '@/lib/models/ProductModel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from '@/components/ui/badge';
import ProductImageGallery from '@/components/product-image-gallery';

interface SizeData {
  size: string;
  squareMeters: number;
}


interface Position {
  x: number;
  y: number;
}

export default function ProductClient() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem2, removeItem, items } = useWishlistStore();
  const { addItem } = useRecentViewedStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [squareMeters, setSquareMeters] = useState(1);
  const [sizeData, setSizeData] = useState<SizeData[]>([]);
  const [selectedSurface, setSelectedSurface] = useState<string>('');
  const [selectedThickness, setSelectedThickness] = useState<string>('');
  const [availableSurfaces, setAvailableSurfaces] = useState<string[]>([]);
  const [availableThicknesses, setAvailableThicknesses] = useState<string[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<string[]>([]);

  const isInWishlist = product ? items.some(item => item.id === product.id) : false;

  const calculateTotalPrice = (): string => {
    if (!product) return '0.00';
    return (product.price * squareMeters * quantity).toFixed(2);
  };

  const handleSizeChange = (newSize: string): void => {
    setSelectedSize(newSize);
    const selectedSizeData = sizeData.find(data => data.size === newSize);
    if (selectedSizeData) {
      setSquareMeters(selectedSizeData.squareMeters);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, size, surface, thickness, square_meters, image')
          .eq('slug', params.slug)
          .single();

        if (error) {
          console.error('Error fetching product:', error);
        } else {
          const productData = data as Product;
          setProduct(productData);
          setImages(Array.isArray(productData.image) ? productData.image : [productData.image]);

          // Create array of size and square_meters pairs
          const sizes = Array.isArray(productData.size) ? productData.size : [productData.size];
          const squareMetersArray = Array.isArray(productData.square_meters) 
            ? productData.square_meters 
            : [productData.square_meters];

          const sizeDataArray = sizes.map((size, index) => ({
            size,
            squareMeters: squareMetersArray[index] || squareMetersArray[0]
          }));

          setSizeData(sizeDataArray);

          if (sizeDataArray.length > 0) {
            setSelectedSize(sizeDataArray[0].size);
            setSquareMeters(sizeDataArray[0].squareMeters);
          }

          const surfaces = Array.isArray(productData.surface) ? productData.surface : [productData.surface];
          setAvailableSurfaces(surfaces);
          if (surfaces.length > 0) {
            setSelectedSurface(surfaces[0]);
          }

          const thicknesses = Array.isArray(productData.thickness) ? productData.thickness : [productData.thickness];
          setAvailableThicknesses(thicknesses);
          if (thicknesses.length > 0) {
            setSelectedThickness(thicknesses[0]);
          }
        }
      } catch (error) {
        console.error('Error in fetchProduct:', error);
      }
      setIsLoading(false);
    };

    if (params.slug) {
      fetchProduct();
    }
  }, [params.slug]);

  useEffect(() => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: Array.isArray(product.image) ? product.image[0] : product.image,
        slug: product.slug
      });
    }
  }, [product, addItem]);

  const handleToggleWishlist = (): void => {
    if (!product) return;

    if (isInWishlist) {
      removeItem(product.id);
    } else {
      addItem2({
        id: product.id,
        brand: product.brand,
        name: product.name,
        price: product.price,
        image: Array.isArray(product.image) ? product.image[0] : product.image,
        quantity: 1
      });
    }
  };

  const handleToggleZoom = (): void => {
    setIsZoomed(!isZoomed);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isZoomed || !containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setPosition({
      x: Math.max(Math.min(x * 100, 100), 0),
      y: Math.max(Math.min(y * 100, 100), 0),
    });
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
    <main className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container py-6 md:py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-4">
              {!isLoading && images.length > 0 && (
                <ProductImageGallery
                  images={images}
                  productName={product?.name || ''}
                  isInWishlist={isInWishlist}
                  onToggleWishlist={handleToggleWishlist}
                />
              )}
              {product.video && (
                <div className="mt-6">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <video
                      src={product.video}
                      autoPlay
                      muted
                      loop
                      className="w-full h-full rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div className="lg:sticky lg:top-20">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between items-center">
                  <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <div className='space-x-2 space-y-2'>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 self-start mt-2 sm:mt-0">Sustainability</Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800 self-start mt-2 sm:mt-0">Premium</Badge>
                      <Badge variant="secondary" className="bg-red-100 text-red-800 self-start mt-2 sm:mt-0">Made in Italy</Badge>
                    </div>
                    <p className="text-xl sm:text-2xl font-semibold mt-2">€{product.price.toFixed(2)} per m²</p>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">{product.description}</p>
                <p className="text-gray-500 text-xs mt-4">
                  MOQ: 1 pallet.
                </p>
                {sizeData.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Size:</h3>
                    <Select value={selectedSize} onValueChange={handleSizeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizeData.map((data) => (
                          <SelectItem key={data.size} value={data.size}>
                            {data.size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {availableSurfaces.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Thickness:</h3>
                    <Select value={selectedSurface} onValueChange={setSelectedSurface}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select surface" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSurfaces.map((surface) => (
                          <SelectItem key={surface} value={surface}>
                            {surface}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {availableThicknesses.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Surface:</h3>
                    <Select value={selectedThickness} onValueChange={setSelectedThickness}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select thickness" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableThicknesses.map((thickness) => (
                          <SelectItem key={thickness} value={thickness}>
                            {thickness}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex items-center space-x-6">
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Square Meters:</h3>
                    <Input
                      type="number"
                      value={squareMeters}
                      readOnly
                      className="w-full bg-gray-100"
                    />
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Quantity:</h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-16 text-center"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity((prev) => prev + 1)}
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-lg font-semibold">
                      Total: €{calculateTotalPrice()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ({squareMeters} m² x {quantity} = {(squareMeters * quantity).toFixed(2)} m² total)
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col space-y-2">
                <Button variant="outline">Order a sample</Button>
                  <Button
                    className="w-full mt-8"
                    onClick={() => {
                      console.log('Adding to cart:', {
                        ...product,
                        selectedSize,
                        selectedSurface,
                        selectedThickness,
                        squareMeters,
                        quantity,
                        totalPrice: parseFloat(calculateTotalPrice())
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <dt className="font-semibold">Application</dt>
                    <dd className="text-muted-foreground">{product.application}</dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="font-semibold">Setting</dt>
                    <dd className="text-muted-foreground">{product.setting}</dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="font-semibold">Surface</dt>
                    <dd className="text-muted-foreground">{selectedSurface}</dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="font-semibold">Effect</dt>
                    <dd className="text-muted-foreground">{product.effect}</dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="font-semibold">Size</dt>
                    <dd className="text-muted-foreground">{selectedSize}</dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="font-semibold">Thickness</dt>
                    <dd className="text-muted-foreground">{selectedThickness}</dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="font-semibold">Antislip</dt>
                    <dd className="text-muted-foreground">{product.antislip}</dd>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <dt className="font-semibold">Brand</dt>
                    <dd className="text-muted-foreground">{product.brand}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
          <RelatedProducts currentProduct={product} />
          <RecentlyViewed />
        </div>
      </div>
    </main>
  );
}
