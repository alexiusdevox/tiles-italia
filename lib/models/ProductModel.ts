import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type Product = {
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
