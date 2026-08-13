export interface IProductSizeVariant {
  id: string;
  colorVariantId: string;
  size: string;
  price: number;
  specialPrice: number | null;
  stock: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductColorVariant {
  id: string;
  productId: string;
  color: string;
  image: string | null;
  sizes: IProductSizeVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface IProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProductReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;

  brand: string | null;
  categoryId: string;
  category: IProductCategory;

  tags: string[];

  thumbnail: string;
  images: string[];
  videoUrl: string | null;

  model: string | null;
  material: string | null;

  price: number;
  specialPrice: number | null;
  discount: number | null;
  stock: number;

  weight: number | null;

  dimensions: {
    length: number;
    width: number;
    height: number;
  } | null;

  dangerousGoods: boolean;

  warrantyType: string | null;
  warrantyPeriod: string | null;

  highlights: string[];

  rating: number;
  reviewCount: number;

  viewCount: number;
  likeCount: number;

  isFeatured: boolean;
  isPublished: boolean;

  colorVariants: IProductColorVariant[];
  reviews: IProductReview[];

  createdAt: string;
  updatedAt: string;
}
