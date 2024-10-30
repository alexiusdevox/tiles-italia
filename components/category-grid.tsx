import React from "react"
import { Button } from "@/components/ui/button" // Assumendo che il componente Button provenga da qui
import Link from "next/link"

export default function CategoryGrid() {
    // Array di categorie con relative immagini
    const categories = [
        { name: "Marble", imgSrc: "/marble.webp", slug: "/products?effect=Marble" },
        { name: "Concrete", imgSrc: "/concrete.webp", slug: "/products?effect=Concrete" },
        { name: "Wood", imgSrc: "/wood.webp", slug: "/products?effect=Wood" },
        { name: "Stone", imgSrc: "/stone.webp", slug: "/products?effect=Stone" },
        { name: "Metal", imgSrc: "/metal.webp", slug: "/products?effect=Metal" },
        { name: "Terrazzo", imgSrc: "/terrazzo.webp", slug: "/products?effect=Terrazzo" },
        { name: "Terracotta", imgSrc: "/cotto.webp", slug: "/products?effect=Terracotta" },
        { name: "Decor", imgSrc: "/decor.webp", slug: "/products?effect=Decor" },
    ]

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {
                categories.map((category) => (
                    <Link href={category.slug}>
                        <article key={category.name} className="relative bg-black group overflow-hidden">
                            {/* Per creare un quadrato basato sul padding */}
                            <div className="pt-[100%]" />

                            {/* Immagine posizionata assolutamente */}
                            <img
                                src={category.imgSrc}
                                alt={category.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />

                            {/* Sovrapposizione del nome */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <span className="text-white text-lg font-light transform scale-110 transition-transform duration-300 group-hover:scale-90">
                                    {category.name}
                                </span>
                            </div>
                        </article>
                    </Link>
                ))
            }
        </div>
    )
}
