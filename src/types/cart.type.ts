export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;

  product: {
    id: string;
    category: Category;
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
    specialPrice: number;
    brand: string;
    rating: number;
  };
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
