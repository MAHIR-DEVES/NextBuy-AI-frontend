import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IProduct } from '@/types/products.type';

export interface CartItem {
  product: IProduct;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addToCart: (product: IProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  clearCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        set(state => {
          const existingItem = state.items.find(
            item => item.product.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                quantity,
              },
            ],
          };
        });
      },

      removeFromCart: productId => {
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId),
        }));
      },

      increase: productId => {
        set(state => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        }));
      },

      decrease: productId => {
        set(state => ({
          items: state.items
            .map(item =>
              item.product.id === productId
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter(item => item.quantity > 0),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.specialPrice ?? item.product.price;

          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    },
  ),
);
