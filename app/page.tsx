"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import CategoryGrid from "@/components/category-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Banknote, Headset, Brush, Star, Target } from "lucide-react";
import Link from "next/link";
import ProductFeatured from '@/components/product-featured';

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
};

export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);

  // Funzione per caricare i prodotti dal database Supabase
  const fetchProducts = async () => {
    try {
      let { data, error } = await supabase
        .from('products') // Sostituisci 'products' con il nome corretto della tua tabella
        .select('*')
        .limit(8); // Limita a un massimo di 8 prodotti
  
      if (error) throw error;
  
      setProducts(data ?? []); // Usa l'operatore di coalescenza nulla per evitare il problema di null
    } catch (error) {
      // Verifica se l'errore è un'istanza di Error per accedere a error.message
      if (error instanceof Error) {
        console.error("Errore durante il caricamento dei prodotti: ", error.message);
      } else {
        console.error("Errore sconosciuto durante il caricamento dei prodotti");
      }
    }
  };
  

  // Carica i prodotti al caricamento del componente
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <section id="hero" className="">
        <div className="bg-[url('/homepage.webp?height=1200&width=1600')] bg-cover bg-center grayscale">
          <div className="bg-black bg-opacity-85">
            <div className="container py-20 text-white">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white text-center">Elegance in Every Tile, Trust in Every Partnership</h1>
              <div className="py-10 text-center mx-auto max-w-[700px] text-white md:text-lg">
                <p className="mb-3">Explore the unmatched beauty of <span className="font-bold">Italian</span> porcelain stoneware, crafted to <span className="font-bold">inspire</span> and built to <span className="font-bold">endure</span>.</p>
                <p className="mb-3"><span className="font-bold">Tiles Italia</span> <span className="font-bold">connects</span> top tile <span className="font-bold">manufacturers</span> with <span className="font-bold">construction professionals</span>, ensuring <span className="font-bold">quality</span> materials and <span className="font-bold">reliable</span> business relationships.</p>
              </div>
              <div className="flex flex-col lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <Link href="/products" className="bg-white border hover:bg-white/80 py-3 px-12 text-base text-black text-center">
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#C9BB84]">
          <div className="container py-5 md:py-8 text-black">
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:flex md:items-center md:justify-evenly">
              <li className="flex items-center">
                <Target className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
                <h2 className="ml-3 font-normal text-xs md:text-lg uppercase">E-commerce B2B</h2>
              </li>
              <li className="flex items-center">
                <Brush className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
                <h2 className="ml-3 font-normal text-xs md:text-lg uppercase">Made in Italy</h2>
              </li>
              <li className="flex items-center">
                <Banknote className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
                <h2 className="ml-3 font-normal text-xs md:text-lg uppercase">Competitive prices</h2>
              </li>
              <li className="flex items-center">
                <Headset className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
                <h2 className="ml-3 font-normal text-xs md:text-lg uppercase">7/7 Assistance</h2>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section id="" className="py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-16">The Prestige Marketplace</h2>
          <CategoryGrid />
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-16">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductFeatured
                key={product.id}
                id={product.id}
                brand={product.brand}
                name={product.name}
                price={product.price}
                image={product.image}
                slug={product.slug}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">Get the latest news!
          </h2>
          <p className="text-center mt-6 mb-10">Subscribe for updates on new products, offers, and trends in Italian porcelain stoneware tiles.</p>
          <div className="flex flex-col justify-between w-full md:w-[470px] m-auto">
            <form>
              <label htmlFor="UserEmail" className="sr-only">Email</label>
              <div
                className="bg-white border border-gray-300 p-2 focus-within:ring-1 ring-white sm:flex sm:items-center sm:gap-4"
              >
                <input
                  type="email"
                  id="UserEmail"
                  placeholder="youremail@domain.xyz"
                  className="text-black w-full border-none focus:outline-0 focus:ring-transparent sm:text-sm p-2" required
                />
                <Button className="mt-1 w-full px-6 py-3 tracking-wide transition-none sm:mt-0 sm:w-auto sm:shrink-0">Sign Up</Button>
              </div>
              <div className="mt-3 flex items-center space-x-3">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="leading-2">I consent to the processing of my personal data in order to subscribe to the newsletter, as indicated in the Privacy policy. *</Label>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
