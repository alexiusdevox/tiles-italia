// "use client"

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation'; // Usa useParams al posto di useRouter
// import { supabase } from '@/lib/supabaseClient';

// const ProductPage = () => {
//   const { slug } = useParams(); // Ottieni lo slug dai parametri
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (slug) {
//         const { data, error } = await supabase
//           .from('products')
//           .select('*')
//           .eq('slug', slug)
//           .single();

//         if (error) {
//           console.error('Error fetching product:', error);
//         } else {
//           setProduct(data);
//         }
//       }
//     };

//     fetchProduct();
//   }, [slug]);

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <img src={product.image} alt={product.name} />
//       <p>Category: {product.category}</p>
//       <p>Manufacturer: {product.manufacturer}</p>
//       <p>Surface: {product.surface}</p>
//       <p>Effect: {product.effect}</p>
//       <p>Thickness: {product.thickness} mm</p>
//       <p>Price: ${product.price.toFixed(2)}</p>
//     </div>
//   );
// };

// export default ProductPage;



"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Star, Search, ShoppingCart, Menu, Plus, Minus, ChevronLeft, ChevronRight, ZoomIn, Share2, Facebook, Twitter, Instagram, Ruler, PlayCircle, MessageCircle, Camera, Calendar, Leaf, Heart, Truck, Gift, Lightbulb, Home } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

export default function ResponsiveProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [selectedColor, setSelectedColor] = useState('Natural')
  const [is360View, setIs360View] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [roomStyle, setRoomStyle] = useState('modern')
  const [tilePattern, setTilePattern] = useState('grid')

  useEffect(() => {
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 14)
    setEstimatedDelivery(deliveryDate.toDateString())
  }, [])

  const [estimatedDelivery, setEstimatedDelivery] = useState('')

  const product = {
    name: "Tuscan Terracotta Floor Tile",
    price: 24.99,
    description: "Authentic Italian terracotta floor tile, perfect for creating a warm, rustic ambiance in any room. Each tile is handcrafted by skilled artisans in Tuscany, ensuring unique character and superior quality.",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800"
    ],
    colors: ['Natural', 'Aged', 'Polished'],
    highlights: [
      "Handcrafted in Tuscany, Italy",
      "Natural, rustic appearance",
      "Durable and long-lasting",
      "Suitable for indoor and outdoor use",
      "Easy to clean and maintain"
    ],
    specs: {
      "Material": "Terracotta",
      "Size": "30cm x 30cm",
      "Thickness": "12mm",
      "Finish": "Natural matte",
      "Color": "Warm orange-brown",
      "Usage": "Indoor and outdoor floors",
      "Origin": "Tuscany, Italy"
    },
    reviews: [
      { name: "Emma R.", rating: 5, comment: "Beautiful tiles that transformed my kitchen! The quality is outstanding.", image: "/placeholder.svg?height=100&width=100" },
      { name: "Michael S.", rating: 4, comment: "Great authentic look. Slightly challenging to install but worth the effort.", image: "/placeholder.svg?height=100&width=100" },
      { name: "Sophia L.", rating: 5, comment: "Exactly what I was looking for to complete my Mediterranean-style patio.", image: "/placeholder.svg?height=100&width=100" },
      { name: "David K.", rating: 5, comment: "Exceptional quality and beautiful color variations. Highly recommend!", image: "/placeholder.svg?height=100&width=100" },
      { name: "Laura M.", rating: 4, comment: "Love the rustic look, but be prepared for some color variations between tiles.", image: "/placeholder.svg?height=100&width=100" }
    ],
    faqs: [
      { question: "How do I clean these tiles?", answer: "Clean with a pH-neutral cleaner and avoid harsh chemicals. Regular sweeping and occasional damp mopping is usually sufficient." },
      { question: "Are these tiles suitable for outdoor use?", answer: "Yes, our Tuscan Terracotta tiles are suitable for both indoor and outdoor use. However, in freeze-prone areas, special installation considerations may be necessary." },
      { question: "Do I need to seal these tiles?", answer: "Yes, we recommend sealing the tiles after installation to protect them from stains and moisture. Resealing every 3-5 years is advised." },
      { question: "How much variation should I expect between tiles?", answer: "As these are handcrafted natural tiles, you should expect some variation in color and texture between tiles. This is part of their rustic charm." }
    ],
    sustainability: [
      "Made from natural, locally-sourced clay",
      "Traditional firing methods reduce energy consumption",
      "Durable product with long lifespan reduces waste",
      "Packaging made from recycled materials",
      "Company supports local artisans and traditional craftsmanship"
    ],
    careAndMaintenance: [
      "Sweep or vacuum regularly to remove dirt and debris",
      "Clean with a pH-neutral cleaner and warm water",
      "Avoid acidic or abrasive cleaning products",
      "Reseal tiles every 3-5 years to maintain protection",
      "Use furniture pads to prevent scratching",
      "Clean spills immediately to prevent staining"
    ]
  }

  const relatedProducts = [
    { name: "Venetian Marble Wall Tile", price: 34.99, image: "/placeholder.svg?height=400&width=400" },
    { name: "Sicilian Mosaic Decorative Tile", price: 29.99, image: "/placeholder.svg?height=400&width=400" },
    { name: "Florentine Porcelain Floor Tile", price: 27.99, image: "/placeholder.svg?height=400&width=400" },
    { name: "Amalfi Coast Blue Ceramic Tile", price: 26.99, image: "/placeholder.svg?height=400&width=400" }
  ]

  const recentlyViewed = [
    { name: "Umbrian Slate Tile", price: 32.99, image: "/placeholder.svg?height=200&width=200" },
    { name: "Milanese Modern Tile", price: 28.99, image: "/placeholder.svg?height=200&width=200" }
  ]

  const designInspirations = [
    { title: "Rustic Tuscan Kitchen", image: "/placeholder.svg?height=300&width=300" },
    { title: "Mediterranean Patio", image: "/placeholder.svg?height=300&width=300" },
    { title: "Modern Farmhouse Entryway", image: "/placeholder.svg?height=300&width=300" }
  ]

  return (
    <div className="flex-grow mx-auto max-w-screen-xl py-16 px-4 sm:px-6 lg:px-8 relative">
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-12">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className='flex items-center'>
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/collections/floor-tiles">Floor Tiles</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                {is360View ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-lg font-semibold">360° View</span>
                  </div>
                ) : (
                  <img
                    src={product.images[currentImage]}
                    alt={`${product.name} - Image ${currentImage + 1}`}
                    className={`object-cover transition-all duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={() => setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next image</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-2 right-2"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <ZoomIn className="h-4 w-4" />
                  <span className="sr-only">{isZoomed ? 'Zoom out' : 'Zoom in'}</span>
                </Button>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6">
                {product.images.map((image, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className={`aspect-square w-full p-0 overflow-hidden ${index === currentImage ? 'ring-2 ring-primary' : ''
                      }`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="sr-only">View image {index + 1}</span>
                  </Button>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Product Video</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-primary" />
                </div>
              </div>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Room Visualizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="room-style" className="block text-sm font-medium text-gray-700">Room Style</label>
                      <Select value={roomStyle} onValueChange={setRoomStyle}>
                        <SelectTrigger id="room-style">
                          <SelectValue placeholder="Select room style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="traditional">Traditional</SelectItem>
                          <SelectItem value="rustic">Rustic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="tile-pattern" className="block text-sm font-medium text-gray-700">Tile Pattern</label>
                      <Select value={tilePattern} onValueChange={setTilePattern}>
                        <SelectTrigger id="tile-pattern">
                          <SelectValue placeholder="Select tile pattern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grid">Grid</SelectItem>
                          <SelectItem value="herringbone">Herringbone</SelectItem>
                          <SelectItem value="basketweave">Basketweave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-semibold">Room Visualization</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col gap-4">
              <div className="lg:sticky lg:top-20">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
                    <p className="text-xl sm:text-2xl font-semibold mt-2">${product.price.toFixed(2)}</p>
                  </div>
                  <Badge variant="secondary" className="bg-red-100 text-red-800 self-start mt-2 sm:mt-0">Made in Italy</Badge>
                </div>
                <p className="text-muted-foreground mt-4">{product.description}</p>
                <div className="space-y-4 mt-6">
                  <h3 className="font-semibold">Product Highlights:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {product.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Select Color/Finish:</h3>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.colors.map((color) => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <p className="text-sm text-muted-foreground">
                      Total: ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-6">
                  <Button className="flex-1">Add to Cart</Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setIsWishlisted(!isWishlisted)}>
                          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                          <span className="sr-only">{isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Estimated Delivery:</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    {estimatedDelivery}
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Financing Options:</h3>
                  <p className="text-sm text-muted-foreground">As low as $8.33/mo with Affirm. <a href="#" className="text-primary hover:underline">Learn More</a></p>
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
                        <p>Our Tuscan Terracotta Floor Tiles come in the following size:</p>
                        <ul className="list-disc list-inside">
                          <li>30cm x 30cm (approximately 11.8 inches x 11.8 inches)</li>
                          <li>Thickness: 12mm (approximately 0.47 inches)</li>
                        </ul>
                        <p>Please ensure you measure your space accurately before ordering. We recommend ordering 10% extra to account for cuts and potential breakage during installation.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Share:</span>
                    <Button variant="outline" size="icon">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Share on Facebook</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Share on Twitter</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Share on Instagram</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <Tabs defaultValue="specifications">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="installation">Installation</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                <TabsTrigger value="care">Care & Maintenance</TabsTrigger>
              </TabsList>
              <TabsContent value="specifications">
                <Card>
                  <CardContent className="p-6">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex flex-col space-y-1">
                          <dt className="font-semibold">{key}</dt>
                          <dd className="text-muted-foreground">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="installation">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Installation Guide</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Prepare the surface: Ensure the substrate is clean, dry, and level.</li>
                      <li>Plan your layout: Dry lay tiles to determine the best arrangement and cut tiles as needed.</li>
                      <li>Apply adhesive: Use a notched trowel to spread an appropriate tile adhesive.</li>
                      <li>Set the tiles: Place tiles into the adhesive, using spacers for consistent gaps.</li>
                      <li>Allow to set: Let the adhesive cure according to manufacturer's instructions.</li>
                      <li>Grout the tiles: Apply grout between tiles, cleaning excess as you go.</li>
                      <li>Seal the tiles: Once grout has cured, apply a penetrating sealer to protect the terracotta.</li>
                    </ol>
                    <p className="mt-4 text-sm text-muted-foreground">For detailed instructions or professional installation, please consult our full guide or contact a certified installer.</p>
                    <Button className="mt-4">Download Full Installation Guide</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h3 className="text-lg font-semibold">Customer Reviews</h3>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <span className="text-2xl font-bold mr-2">4.6</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
                      </div>
                    </div>
                    <div className="space-y-4 mb-4">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = product.reviews.filter(r => r.rating === rating).length;
                        const percentage = (count / product.reviews.length) * 100;
                        return (
                          <div key={rating} className="flex items-center">
                            <span className="w-12 text-sm">{rating} stars</span>
                            <Progress value={percentage} className="h-2 mx-2 flex-grow" />
                            <span className="w-12 text-sm text-right">{percentage.toFixed(0)}%</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="space-y-4">
                      {product.reviews.map((review, index) => (
                        <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{review.name}</Badge>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-muted-foreground">{review.comment}</p>
                          {review.image && (
                            <img src={review.image} alt={`Review by ${review.name}`} className="mt-2 w-24 h-24 object-cover rounded-md" />
                          )}
                        </div>
                      ))}
                    </div>
                    <Button className="mt-4">Write a Review</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="faq">
                <Card>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {product.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="sustainability">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Our Commitment to Sustainability</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {product.sustainability.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Leaf className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="care">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Care and Maintenance Tips</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {product.careAndMaintenance.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover mb-4 rounded-md"
                    />
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
                    <Button variant="outline" className="w-full mt-2">View Product</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {recentlyViewed.map((product, index) => (
                <Card key={index} className="w-48 flex-shrink-0">
                  <CardContent className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover mb-2 rounded-md"
                    />
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Design Inspiration</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {designInspirations.map((inspiration, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <img
                      src={inspiration.image}
                      alt={inspiration.title}
                      className="w-full aspect-video object-cover mb-4 rounded-md"
                    />
                    <h3 className="font-semibold">{inspiration.title}</h3>
                    <Button variant="link" className="mt-2 p-0">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-4 right-4 space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full w-12 h-12 p-0 shadow-lg">
              <Calendar className="h-6 w-6" />
              <span className="sr-only">Book Consultation</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book a Virtual Consultation</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p>Schedule a free virtual consultation with our tile experts to discuss your project and get personalized recommendations.</p>
              <Button>Schedule Now</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button className="rounded-full w-12 h-12 p-0 shadow-lg">
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Live Chat</span>
        </Button>
      </div>
    </div>
  )
}