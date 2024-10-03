import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Banknote, Headset, Brush, Star, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home">
      <section id="hero" className="">
        <div className="bg-[url('/homepage.webp?height=1200&width=1600')] bg-cover bg-center grayscale">
          <div className="bg-black opacity-85">
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
                <Link href="/sell" className="bg-black border border-white hover:bg-white/20 py-3 px-12 text-base text-white text-center">Sell now</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-500">
          <div className="container py-5 md:py-10 text-white">
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:flex md:items-center md:justify-evenly">
              <li className="flex items-center">
                <Target className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
                <h2 className="ml-3 font-normal text-xs md:text-lg uppercase">Wide selection of products</h2>
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
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">The Prestige Marketplace</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Floor Tiles",
              "Wall Tiles",
              "Outdoor Tiles",
              "Decorative Tiles",
              "Mosaic Tiles",
              "Porcelain Tiles",
              "Ceramic Tiles",
              "Specialty Tiles",
            ].map((category) => (
              <Button variant="outline" key={category} className="h-32 text-lg font-semibold">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Tuscan Terracotta", image: "/placeholder.svg?height=400&width=300" },
              { name: "Venetian Marble", image: "/placeholder.svg?height=400&width=300" },
              { name: "Sicilian Mosaic", image: "/placeholder.svg?height=400&width=300" },
            ].map((collection) => (
              <Card key={collection.name}>
                <CardContent className="p-4">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-[200px] object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
                  <Button variant="outline" className="w-full">View Collection</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Customers Say</h2>
          <div className="flex">
            <h3 className="text-2xl font-bold">Compra</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
