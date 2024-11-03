import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type RecentProduct = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  slug: string;
}

type RecentViewedState = {
  items: RecentProduct[];
  lastViewed: RecentProduct | null; // Stato per l'ultimo prodotto visualizzato
  addItem: (product: RecentProduct) => void;
  clearItems: () => void;
}

export const useRecentViewedStore = create<RecentViewedState>()(
  persist(
    (set) => ({
      items: [],
      lastViewed: null, // Inizializza lastViewed come null
      addItem: (product) => 
        set((state) => {
          // Controlla se il prodotto è l'ultimo visualizzato
          if (state.lastViewed && state.lastViewed.id === product.id) {
            return state; // Non fare nulla se è lo stesso prodotto
          }

          // Aggiungi il nuovo prodotto solo se non è già presente
          const filteredItems = state.items.filter(
            (item) => item.id !== product.id
          );

          // Aggiungi il nuovo prodotto all'inizio e mantieni solo gli ultimi 4
          return {
            items: [product, ...filteredItems].slice(0, 4),
            lastViewed: product // Aggiorna lastViewed
          };
        }),
      clearItems: () => set({ items: [], lastViewed: null }), // Resetta anche lastViewed
    }),
    {
      name: 'recent-viewed-storage', // nome utilizzato per il localStorage
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
