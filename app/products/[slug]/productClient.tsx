'use client'

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle, ZoomIn, Minus, Plus, ZoomOut, Ruler, Facebook, Twitter, Instagram } from 'lucide-react';
import { useWishlistStore } from '@/lib/wishlistStore';
import { useRecentViewedStore } from '@/lib/recentViewedStore';
import { Skeleton } from "@/components/ui/skeleton";
import { RecentlyViewed } from '@/components/recent-viewed-store';
import RelatedProducts from '@/components/related-products';
import { Product } from '@/lib/models/ProductModel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from '@/components/ui/badge';
import ProductImageViewer from '@/components/product-image-viewer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCartStore } from '@/lib/cartStore';
import { useToast } from '@/hooks/use-toast';

interface SizeData {
  size: string;
  squareMeters: number;
}

interface ProductData extends Product {
  id: number
  brand: string
  name: string
  price: number
  description: string
  image: string | string[]
  slug: string
  surface: string | string[]
  thickness: string | string[]
  size: string | string[]
  video?: string
  effect: string
  antislip: string
  application: string
  setting: string
  square_meters: number | number[];
}

interface Position {
  x: number;
  y: number;
}

export default function ProductClient() {
  const params = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem3 } = useCartStore();
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
  const [toastVisible, setToastVisible] = useState(false); // Stato per il Toast

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

  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!product) return

    const itemTotalPrice = product.price * squareMeters
    const cartItem = {
      id: product.id,
      brand: product.brand,
      name: product.name,
      price: itemTotalPrice,
      pricePerSquareMeter: product.price,
      quantity: quantity,
      image: Array.isArray(product.image) ? product.image[0] : product.image,
      size: selectedSize,
      surface: selectedSurface,
      thickness: selectedThickness,
      squareMeters: squareMeters
    }
    addItem3(cartItem)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

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
          const productData = data as ProductData;
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
    if (!product) return

    if (isInWishlist) {
      removeItem(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addItem2({
        id: product.id,
        brand: product.brand,
        name: product.name,
        price: product.price,
        image: Array.isArray(product.image) ? product.image[0] : product.image,
        quantity: 1
      })
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }


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
                <ProductImageViewer
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
                <div className="flex flex-col sm:flex-row">
                  <div className="flex flex-col">
                    <h1 className="text-2xl sm:text-2xl font-bold text-[#7A7157]">{product.name}</h1>
                    <div className='space-x-2 space-y-2'>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 self-start mt-2 sm:mt-0">Sustainability</Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800 self-start mt-2 sm:mt-0">Premium</Badge>
                      <Badge variant="secondary" className="bg-red-100 text-red-800 self-start mt-2 sm:mt-0">Made in Italy</Badge>
                    </div>
                    <p className="text-4xl sm:text-4xl font-bold mt-2">€{product.price.toFixed(2)} per m²</p>
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
                {availableThicknesses.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Thickness:</h3>
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
                {availableSurfaces.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Surface:</h3>
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
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </div>





                <div className="flex flex-wrap items-center gap-4 mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Ruler className="h-4 w-4" />
                        Size Guide
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Tile Size Guide</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <p>Our Tuscan Terracotta Floor Tiles come in the following sizes:</p>
                        <ul className="list-disc list-inside">
                          {sizeData.map((sizeObj) => (
                            <li key={sizeObj.size}>
                              {sizeObj.size} ({sizeObj.squareMeters} m²)
                            </li>
                          ))}
                        </ul>
                        <p>Please ensure you measure your space accurately before ordering. We recommend ordering 10% extra to account for cuts and potential breakage during installation.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Share:</span>
                    <Button variant="outline" size="icon">
                      <svg role="img" className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Pinterest</title><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" /></svg>
                      <span className="sr-only">Share on Pinterest</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <svg role="img" className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>                      <span className="sr-only">Share on X</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <svg role="img" className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" /></svg>
                      <span className="sr-only">Share on Instagram</span>
                    </Button>
                  </div>
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