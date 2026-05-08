import { create } from 'zustand';
import { getCartItems } from '@/services/cart.service';

type CartStore = {
  count: number;

  setCount: (count: number) => void;

  increase: (qty: number) => void;

  decrease: (qty: number) => void;

  fetchCart: () => Promise<void>;

  reset: () => void;
};

export const useCartStore = create<CartStore>(set => ({
  count: 0,

  setCount: count => set({ count }),

  increase: qty =>
    set(state => ({
      count: state.count + qty,
    })),

  // NEW
  decrease: qty =>
    set(state => ({
      count: Math.max(0, state.count - qty),
    })),

  reset: () => set({ count: 0 }),

  fetchCart: async () => {
    try {
      const res = await getCartItems();

      set({
        count: res.data.length,
      });
    } catch (err) {
      console.log(err);
    }
  },
}));
