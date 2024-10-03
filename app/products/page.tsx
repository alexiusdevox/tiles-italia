"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Importa il client Supabase
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/product-item';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Product = {
    id: number;
    name: string;
    category: string;
    manufacturer: string;
    surface: string;
    effect: string;
    thickness: number;
    price: number;
    image: string;
};

type FilterState = {
    category: string[];
    manufacturer: string[];
    surface: string[];
    effect: string[];
    thickness: number[];
    priceRange: [number, number];
};

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<FilterState>({
        category: [],
        manufacturer: [],
        surface: [],
        effect: [],
        thickness: [],
        priceRange: [0, 1000],
    });
    const router = useRouter();

    // Funzione per aggiornare l'URL con i filtri
    const updateURLWithFilters = () => {
        const queryParams = new URLSearchParams();

        Object.keys(filters).forEach((key) => {
            const value = (filters as any)[key];
            if (Array.isArray(value) && value.length > 0) {
                queryParams.set(key, value.join(","));
            } else if (key === "priceRange" && (value[0] !== 0 || value[1] !== 1000)) {
                queryParams.set("minPrice", value[0].toString());
                queryParams.set("maxPrice", value[1].toString());
            }
        });

        router.push(`?${queryParams.toString()}`, { scroll: false });
    };

    // Funzione per caricare i filtri dall'URL
    const loadFiltersFromURL = () => {
        const query = new URLSearchParams(window.location.search);
        const newFilters = { ...filters };

        Object.keys(newFilters).forEach((key) => {
            if (query.has(key)) {
                newFilters[key as keyof FilterState] = query.get(key)?.split(",") || [];
            }
        });

        if (query.has("minPrice") && query.has("maxPrice")) {
            newFilters.priceRange = [Number(query.get("minPrice")), Number(query.get("maxPrice"))];
        }

        setFilters(newFilters);
    };

    useEffect(() => {
        loadFiltersFromURL();
        fetchProducts(); // Carica i prodotti da Supabase
    }, []);

    useEffect(() => {
        applyFilters();
        updateURLWithFilters();
    }, [filters]);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products') // Assicurati che il nome della tabella corrisponda a quello nel tuo database
            .select('*');

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data);
            setFilteredProducts(data);
        }
    };

    const applyFilters = () => {
        const filtered = products.filter(product => {
            return (
                (filters.category.length === 0 || filters.category.includes(product.category)) &&
                (filters.manufacturer.length === 0 || filters.manufacturer.includes(product.manufacturer)) &&
                (filters.surface.length === 0 || filters.surface.includes(product.surface)) &&
                (filters.effect.length === 0 || filters.effect.includes(product.effect)) &&
                (filters.thickness.length === 0 || filters.thickness.includes(product.thickness)) &&
                (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1])
            );
        });
        setFilteredProducts(filtered);
    };

    const handleFilterChange = (filterType: keyof FilterState, value: any) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
    }

    const renderFilterCheckboxes = (filterType: keyof FilterState, options: string[]) => {
        return options.map((option) => (
            <div className="flex items-center space-x-2" key={option}>
                <Checkbox
                    id={`${filterType}-${option}`}
                    checked={(filters[filterType] as string[]).includes(option)}
                    onCheckedChange={(checked) => {
                        if (checked) {
                            handleFilterChange(filterType, [...filters[filterType] as string[], option])
                        } else {
                            handleFilterChange(filterType, (filters[filterType] as string[]).filter(item => item !== option))
                        }
                    }}
                />
                <Label htmlFor={`${filterType}-${option}`}>{option}</Label>
            </div>
        ))
    }

    const filterContent = (
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold mb-2">Category</h3>
            {renderFilterCheckboxes('category', ['Floor Tiles', 'Wall Tiles', 'Outdoor Tiles', 'Decorative Tiles'])}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold mb-2">Manufacturer</h3>
            {renderFilterCheckboxes('manufacturer', ['CeramicaItaliana', 'TuscanTiles', 'VenetianCraft', 'SicilianArt'])}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold mb-2">Surface</h3>
            {renderFilterCheckboxes('surface', ['Matte', 'Glossy', 'Textured', 'Polished'])}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold mb-2">Effect</h3>
            {renderFilterCheckboxes('effect', ['Wood', 'Marble', 'Concrete', 'Terracotta'])}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold mb-2">Thickness (mm)</h3>
            {renderFilterCheckboxes('thickness', [6, 8, 10, 12, 14].map(String))}
          </div>
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="flex items-center space-x-4 space-y-2">
              <Input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])}
                className="w-20"
              />
              <span>to</span>
              <Input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                className="w-20"
              />
            </div>
          </div>
        </div>
      )

    return (
        <div className="flex-grow mx-auto max-w-screen-xl py-16 px-4 sm:px-6 lg:px-8 relative">
            <nav className="py-2">
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">
                                <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 49" className="h-5 w-5 fill-gray-500 hover:fill-gray-600" >
                                    <defs>
                                        <image id="img1" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAxAQMAAAC1R/iVAAAAAXNSR0IB2cksfwAAAANQTFRF////p8QbyAAAABBJREFUeJxjZIAAxlF6QGkAJ9AAMok2y6kAAAAASUVORK5CYII=" />
                                    </defs>
                                    <use id="Background" href="#img1" x="0" y="0" />
                                    <path d="m0 26.4l21.6-12.5 12.4 21.7-21.6 12.5z" />
                                    <path d="m15.5 0.1h24.9v25h-24.9z" />
                                    <path d="m43.5 48.1l-21.5-12.5 12.4-21.7 21.6 12.5z" />
                                </svg>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4" />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-[#7A7157]">Products</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </nav>
            <h1 className="text-3xl md:text-5xl pb-16 font-semibold text-[#7A7157]">Products</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4">
                    <Card>
                        <CardContent className="p-6">
                            {/* Desktop version */}
                            <div className="hidden md:block">
                                <h2 className="text-xl font-semibold mb-4">Filters</h2>
                                {filterContent}
                            </div>

                            {/* Mobile version */}
                            <div className="md:hidden">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="filters">
                                        <AccordionTrigger>Filters</AccordionTrigger>
                                        <AccordionContent>
                                            {filterContent}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </CardContent>
                    </Card>
                </aside>
                <main className="w-full md:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.slug}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                slug={product.slug}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
