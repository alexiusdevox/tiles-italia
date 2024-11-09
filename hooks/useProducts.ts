"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export type Product = {
  id: number
  brand: string
  name: string
  price: number
  image: string | string[]
  slug: string
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('products')
          .select('*')

        if (error) {
          throw new Error('Error fetching products')
        }

        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, isLoading, error }
}