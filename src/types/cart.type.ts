export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;

  product: {
    id: string;
    name: string;
    price: number;
    discount: number;
    thumbnail: string;
    brand: string;
    rating: number;
  };
};
