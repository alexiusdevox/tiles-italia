// /components/SearchBar.tsx
"use client";

import { Product } from '@/lib/models/ProductModel';
import { useState } from 'react';

type SearchBarProps = {
    products: Product[];
    setFilteredProducts: (filteredProducts: Product[]) => void;
};

const SearchBar = ({ products, setFilteredProducts }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Funzione per filtrare i prodotti in base al termine di ricerca
    const searchProduct = () => {
        if (!searchTerm.trim()) {
            setFilteredProducts(products); // Mostra tutti i prodotti se non c'è termine di ricerca
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    // Funzione per gestire l'evento di ricerca all'Invio
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchProduct();
        }
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Cerca prodotto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border p-2 w-full bg-transparent"
            />
        </div>
    );
};

export default SearchBar;
