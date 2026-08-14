import { create } from 'zustand';
import { IProduct } from '@/types/products.type';

interface OrderStore {
  selectedProduct: IProduct | null;
  selectedSize: string | null;

  setSelectedProduct: (product: IProduct) => void;
  setSelectedSize: (size: string) => void;

  clearSelectedProduct: () => void;
  clearSelectedSize: () => void;
}

export const useOrderStore = create<OrderStore>(set => ({
  selectedProduct: null,
  selectedSize: null,

  setSelectedProduct: product =>
    set({
      selectedProduct: product,
    }),

  setSelectedSize: size =>
    set({
      selectedSize: size,
    }),

  clearSelectedProduct: () =>
    set({
      selectedProduct: null,
    }),

  clearSelectedSize: () =>
    set({
      selectedSize: null,
    }),
}));
