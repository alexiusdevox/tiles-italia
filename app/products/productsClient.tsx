"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight, Filter } from 'lucide-react';
import ProductCard from '@/components/product-item';
import FiltersAside from '@/components/filters-aside';
import SelectedFilters from '@/components/selected-filters';
import Toolbar from '@/components/toolbar';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Product } from '@/lib/models/ProductModel';

type FilterState = {
    brand: string[];
    surface: string[];
    effect: string[];
    thickness: number[];
    priceRange: [number | null, number | null];
    antislip: string[];
    application: string;
    setting: string;
    size: string[];
    environment: string;
};

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const productsPerPage = 12;

    const [filters, setFilters] = useState<FilterState>({
        effect: [],
        brand: [],
        surface: [],
        thickness: [],
        antislip: [],
        priceRange: [null, null],
        application: 'Wall',
        setting: 'Indoor',
        size: [],
        environment: '',
    });

    const router = useRouter();

    const updateURLWithFilters = () => {
        const queryParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (key === 'priceRange') {
                if (value[0] !== null) queryParams.set("minPrice", value[0].toString());
                if (value[1] !== null) queryParams.set("maxPrice", value[1].toString());
            } else if (Array.isArray(value) && value.length > 0) {
                queryParams.set(key, value.join(","));
            } else if (!Array.isArray(value) && value !== '') {
                queryParams.set(key, value);
            }
        });

        queryParams.set("page", currentPage.toString());
        router.push(`?${queryParams.toString()}`, { scroll: false });
    };

    const loadFiltersFromURL = () => {
        const query = new URLSearchParams(window.location.search);
        const newFilters = { ...filters };

        // Handle each filter type specifically based on its expected type
        Object.keys(newFilters).forEach((key) => {
            const filterKey = key as keyof FilterState;
            const value = query.get(key);

            if (!value) return;

            switch (filterKey) {
                case 'priceRange':
                    const minPrice = query.get("minPrice");
                    const maxPrice = query.get("maxPrice");
                    newFilters.priceRange = [
                        minPrice ? Number(minPrice) : null,
                        maxPrice ? Number(maxPrice) : null
                    ];
                    break;

                case 'brand':
                case 'surface':
                case 'effect':
                case 'antislip':
                case 'size':
                    // These are string array types
                    newFilters[filterKey] = value.split(",");
                    break;

                case 'thickness':
                    // Convert string values to numbers for thickness array
                    newFilters[filterKey] = value.split(",").map(Number);
                    break;

                case 'application':
                case 'setting':
                case 'environment':
                    // These are string types
                    newFilters[filterKey] = value;
                    break;
            }
        });

        setFilters(newFilters);

        const pageQuery = query.get("page");
        if (pageQuery) {
            setCurrentPage(Number(pageQuery));
        }
    };

    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            loadFiltersFromURL();
            await fetchProducts();
            setIsLoading(false);
        };
        loadInitialData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, products]);

    useEffect(() => {
        updateURLWithFilters();
    }, [filteredProducts, currentPage]);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
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
                (filters.brand.length === 0 || filters.brand.includes(product.brand)) &&
                (filters.surface.length === 0 || filters.surface.includes(product.surface)) &&
                (filters.effect.length === 0 || filters.effect.includes(product.effect)) &&
                (filters.thickness.length === 0 || filters.thickness.includes(product.thickness)) &&
                (filters.antislip.length === 0 || filters.antislip.includes(product.antislip)) &&
                (filters.priceRange[0] === null || product.price >= filters.priceRange[0]) &&
                (filters.priceRange[1] === null || product.price <= filters.priceRange[1]) &&
                (!filters.application || product.application === filters.application) &&
                (!filters.setting || product.setting === filters.setting)
            );
        });
        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const removeFilter = (filterType: keyof FilterState, value: string | number) => {
        setFilters(prevFilters => {
            if (filterType === 'application' || filterType === 'setting') {
                return {
                    ...prevFilters,
                    [filterType]: ''
                };
            } else {
                return {
                    ...prevFilters,
                    [filterType]: Array.isArray(prevFilters[filterType])
                        ? (prevFilters[filterType] as any[]).filter(item => item !== value)
                        : prevFilters[filterType]
                };
            }
        });
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 3;
        const ellipsisThreshold = 2;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - ellipsisThreshold && i <= currentPage + ellipsisThreshold)
            ) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                paginate(i);
                            }}
                            isActive={currentPage === i}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            } else if (
                (i === currentPage - ellipsisThreshold - 1 && i > 1) ||
                (i === currentPage + ellipsisThreshold + 1 && i < totalPages)
            ) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        return items;
    };

    const ProductSkeleton = () => (
        <div className="space-y-3">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
    );

    return (
        <div className="container py-10">
            <Toolbar
                products={products}
                filteredProducts={filteredProducts}
                setFilteredProducts={setFilteredProducts}
                layout={layout}
                setLayout={setLayout}
                productsPerPage={productsPerPage}
            />
            <div className="flex flex-col md:flex-row gap-8">
                {/* Mobile filter drawer */}
                <div className="md:hidden mb-4">
                    <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
                        <DrawerTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <Filter className="mr-2 h-4 w-4" />Filters
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="h-[85vh] flex flex-col">
                            <DrawerHeader className="flex-shrink-0">
                                <DrawerTitle>Filters</DrawerTitle>
                                <DrawerDescription>
                                    Apply filters to refine your product search.
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="flex-grow overflow-y-auto px-4">
                                <FiltersAside
                                    filters={filters}
                                    setFilters={setFilters}
                                    products={products}
                                    removeFilter={removeFilter}
                                />
                            </div>
                            <DrawerFooter className="flex-shrink-0">
                                <DrawerClose asChild>
                                    <Button variant="outline">Close</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>

                {/* Desktop filter sidebar */}
                <aside className="hidden md:block w-full md:w-1/4">
                    <FiltersAside
                        filters={filters}
                        setFilters={setFilters}
                        products={products}
                        removeFilter={removeFilter}
                    />
                </aside>

                <main className="w-full md:w-3/4">
                    <SelectedFilters filters={filters} removeFilter={removeFilter} />
                    <div className={`${layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4' : 'flex flex-col space-y-4'}`}>
                        {isLoading ? (
                            Array(12).fill(0).map((_, index) => (
                                <ProductSkeleton key={index} />
                            ))
                        ) : (
                            currentProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    brand={product.brand}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    slug={product.slug}
                                    layout={layout}
                                />
                            ))
                        )}
                    </div>
                    {!isLoading && filteredProducts.length > 0 && (
                        <Pagination className="mt-8">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage > 1) paginate(currentPage - 1);
                                        }}
                                        aria-disabled={currentPage === 1}
                                    />
                                </PaginationItem>
                                {renderPaginationItems()}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage < totalPages) paginate(currentPage + 1);
                                        }}
                                        aria-disabled={currentPage === totalPages}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </main>
            </div>
        </div>
    );
}