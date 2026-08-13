import { create } from 'zustand';

interface ProductStore {
  selectedImage: string | null;
  selectedColor: string | null;
  setSelectedImage: (image: string | null) => void;
  setSelectedColor: (color: string | null) => void;
  resetSelectedImage: () => void;
}

export const useProductStore = create<ProductStore>(set => ({
  selectedImage: null,
  selectedColor: null,

  setSelectedImage: image => set({ selectedImage: image }),
  setSelectedColor: color => set({ selectedColor: color }),
  resetSelectedImage: () => set({ selectedImage: null, selectedColor: null }),
}));
