import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistItem {
  id: number
  brand: string
  name: string
  price: number
  quantity: number
  image: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem2: (item: WishlistItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      items: [],
      addItem2: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id)
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }
        }
        return { items: [...state.items, { ...item, quantity: 1 }] }
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        ),
      })),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
)