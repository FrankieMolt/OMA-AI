'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, Product } from '@/lib/supabase';

export interface CartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  
  // Actions
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  loadCart: (userId: string) => Promise<void>;
  
  // Computed
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,

      addItem: async (product: Product, quantity = 1) => {
        set({ isLoading: true });
        
        const items = get().items;
        const existingItem = items.find(item => item.product_id === product.id);

        if (existingItem) {
          // Update quantity
          const updatedItems = items.map(item =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: updatedItems, isLoading: false });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: crypto.randomUUID(),
            product_id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image_url: product.image_url || undefined,
          };
          set({ items: [...items, newItem], isLoading: false });
        }

        // Sync to database if user is logged in
        const { data: { user } } = await supabase!.auth.getUser();
        if (user) {
          await supabase!.from('cart_items').upsert({
            user_id: user.id,
            product_id: product.id,
            quantity: existingItem ? existingItem.quantity + quantity : quantity,
          }, { onConflict: 'user_id,product_id' });
        }
      },

      removeItem: async (productId: string) => {
        const items = get().items.filter(item => item.product_id !== productId);
        set({ items });

        // Sync to database
        const { data: { user } } = await supabase!.auth.getUser();
        if (user) {
          await supabase!.from('cart_items')
            .delete()
            .eq('user_id', user.id)
            .eq('product_id', productId);
        }
      },

      updateQuantity: async (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const items = get().items.map(item =>
          item.product_id === productId ? { ...item, quantity } : item
        );
        set({ items });

        // Sync to database
        const { data: { user } } = await supabase!.auth.getUser();
        if (user) {
          await supabase!.from('cart_items')
            .update({ quantity })
            .eq('user_id', user.id)
            .eq('product_id', productId);
        }
      },

      clearCart: async () => {
        set({ items: [] });

        // Sync to database
        const { data: { user } } = await supabase!.auth.getUser();
        if (user) {
          await supabase!.from('cart_items')
            .delete()
            .eq('user_id', user.id);
        }
      },

      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

      loadCart: async (userId: string) => {
        set({ isLoading: true });
        
        try {
          const { data, error } = await supabase!
            .from('cart_items')
            .select(`
              id,
              quantity,
              product_id,
              products (
                name,
                price,
                image_url
              )
            `)
            .eq('user_id', userId);

          if (error) throw error;

          if (data) {
            const items: CartItem[] = data.map((item: any) => ({
              id: item.id,
              product_id: item.product_id,
              name: item.products.name,
              price: item.products.price,
              quantity: item.quantity,
              image_url: item.products.image_url,
            }));
            set({ items, isLoading: false });
          }
        } catch (error) {
          console.error('Failed to load cart:', error);
          set({ isLoading: false });
        }
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'spendthrone-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
