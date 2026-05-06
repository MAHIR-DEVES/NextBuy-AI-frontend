export interface IProduct {
  id: string;
  name: string;
  description: string;

  price: number;
  discount?: number;

  thumbnail: string;
  images: string[];

  brand: string;
  category: string;

  rating: number;
  reviewCount: number;

  stock: number;

  slug: string;

  createdAt: string;
  updatedAt: string;
}
