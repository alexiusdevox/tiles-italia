import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ProductImageViewerProps {
  images: string[];
  productName: string;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
}

const ProductImageViewer: React.FC<ProductImageViewerProps> = ({ 
  images, 
  productName,
  isInWishlist,
  onToggleWishlist,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsZoomed(false);
  };

  const handleToggleZoom = () => {
    setIsZoomed(!isZoomed);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setPosition({
      x: Math.max(Math.min(x, 100), 0),
      y: Math.max(Math.min(y, 100), 0),
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const touch = e.touches[0];
    const element = e.currentTarget;
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = ((touch.clientX - left) / width) * 100;
    const y = ((touch.clientY - top) / height) * 100;

    setPosition({
      x: Math.max(Math.min(x, 100), 0),
      y: Math.max(Math.min(y, 100), 0),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        {/* Main Image */}
        <div
          className={`relative h-full ${isZoomed ? 'cursor-move' : ''}`}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          <img
            src={images[currentImageIndex]}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            className={`h-full w-full object-cover transition-transform duration-300 pointer-events-none ${
              isZoomed ? 'scale-200' : ''
            }`}
            style={{
              transform: isZoomed
                ? `translate(-${position.x}%, -${position.y}%) scale(2)`
                : 'none',
            }}
          />
        </div>

        {/* Wishlist Button */}
        <div className="absolute end-0 top-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-white" />
        <button
          className="absolute end-0 top-0 z-10 p-2 text-gray-900 transition hover:text-gray-900/75"
          onClick={onToggleWishlist}
        >
          <Heart className={`size-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-red-500'}`} />
        </button>

        {/* Zoom Button */}
        <button
          className="absolute end-2 bottom-2 z-10 p-2 bg-white bg-opacity-50 rounded-full text-gray-900 transition hover:bg-opacity-75"
          onClick={handleToggleZoom}
        >
          {isZoomed ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
        </button>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90"
          onClick={handlePrevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90"
          onClick={handleNextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Thumbnails */}
      <div className="overflow-x-auto mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6">
      {images.map((image, index) => (
          <button
            key={index}
            className={`relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-100 ${
              currentImageIndex === index ? 'ring-2 ring-black' : ''
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image}
              alt={`${productName} - Thumbnail ${index + 1}`}
              className="w-full h-full object-cover aspect-square pointer-events-none"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageViewer;
