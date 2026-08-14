import { create } from 'zustand';
import { IProduct } from '@/types/products.type';

interface OrderStore {
  selectedProduct: IProduct | null;

  setSelectedProduct: (product: IProduct) => void;
  clearSelectedProduct: () => void;
}

export const useOrderStore = create<OrderStore>(set => ({
  selectedProduct: null,

  setSelectedProduct: product =>
    set({
      selectedProduct: product,
    }),

  clearSelectedProduct: () =>
    set({
      selectedProduct: null,
    }),
}));
