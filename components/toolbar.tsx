"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutGrid, LayoutList } from "lucide-react";

interface Product {
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
  application: string;
  setting: string;
  created_at?: string;
}

interface ToolbarProps {
  products: Product[];
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  layout: 'grid' | 'list';
  setLayout: (layout: 'grid' | 'list') => void;
  productsPerPage: number;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  products, 
  filteredProducts, 
  setFilteredProducts, 
  layout, 
  setLayout,
  productsPerPage
}) => {
  const [sortBy, setSortBy] = React.useState('newest');

  React.useEffect(() => {
    handleSortChange(sortBy);
  }, [products]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const sorted = [...filteredProducts].sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      
      
      if (value === 'newest') {
        return dateB - dateA;
      } else if (value === 'price-asc') {
        return a.price - b.price;
      } else if (value === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });
    setFilteredProducts(sorted);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <div className="text-sm text-gray-600 mb-4 md:mb-0">
        <p>Showing {productsPerPage} of {products.length}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest Arrivals</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex space-x-2">
          <Button
            variant={layout === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setLayout('grid')}
          >
            <LayoutGrid className="h-4 w-4" strokeWidth={1.5} />
          </Button>
          <Button
            variant={layout === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setLayout('list')}
          >
            <LayoutList className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;