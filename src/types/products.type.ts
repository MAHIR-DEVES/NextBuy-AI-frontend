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
  isFeatured: boolean;
  isPublished: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface IProductsResponse {
  success: boolean;
  message: string;
  data: IProduct[];
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
