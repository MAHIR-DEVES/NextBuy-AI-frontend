import { ProductCard1 } from '@/components/product-card1';
import { getProducts } from '@/services/product.service';
import React from 'react';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  images: string[];
  thumbnail: string;
  brand: string;
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  slug: string;
}

const Products = async () => {
  const data = await getProducts();
  const products: IProduct[] = data?.data?.data || [];

  // 🔥 mapping layer (MAIN FIX)
  const formattedProducts = products.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,

    link: `/products/${p.slug}`, // ✅ fix

    image: {
      src: p.thumbnail,
      alt: p.name,
    },

    price: {
      regular: p.price,
      sale: p.discount ? p.price - (p.price * p.discount) / 100 : undefined,
      currency: 'USD',
    },

    badge: p.discount
      ? {
          text: `${p.discount}% OFF`,
          backgroundColor: 'oklch(58% 0.22 30)',
        }
      : undefined,
  }));

  return (
    <div className="w-full pb-10 bg-white">
      <div className="container mx-auto md:px-0">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Just For You
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {formattedProducts.map(product => (
            <ProductCard1 key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
