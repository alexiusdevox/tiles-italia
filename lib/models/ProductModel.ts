import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type Product = {
  id?: string
  brand: string
  name: string
  slug: string
  image: string
  banner?: string
  price: number
  description: string
  category: string
  rating: number
  numReviews: number
  countInStock: number
}

// Funzione per ottenere tutti i prodotti
export async function getAllProducts() {
  return await prisma.product.findMany()
}

// Funzione per ottenere un prodotto tramite `slug`
export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
  })
}

// Funzione per creare un nuovo prodotto
export async function createProduct(product: Product) {
  return await prisma.product.create({
    data: product,
  })
}

// Funzione per aggiornare un prodotto tramite `id`
export async function updateProduct(id: string, product: Product) {
  return await prisma.product.update({
    where: { id },
    data: product,
  })
}

// Funzione per eliminare un prodotto tramite `id`
export async function deleteProduct(id: string) {
  return await prisma.product.delete({
    where: { id },
  })
}
