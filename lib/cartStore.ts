import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  brand?: string;
  name: string;
  price: number;
  pricePerSquareMeter?: number;
  quantity: number;
  image: string;
  size?: string;
  surface?: string;
  thickness?: string;
  squareMeters?: number;
}

interface CartStore {
  items: CartItem[];
  addItem3: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem3: (newItem) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) =>
              i.id === newItem.id &&
              i.size === newItem.size &&
              i.surface === newItem.surface &&
              i.thickness === newItem.thickness
          );
          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
            };
            return { items: updatedItems };
          } else {
            return { items: [...state.items, newItem] };
          }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? quantity > 0
                ? { ...i, quantity }
                : null
              : i
          ).filter(Boolean) as CartItem[],
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);