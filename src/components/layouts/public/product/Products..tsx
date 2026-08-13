import { ProductCard1 } from '@/components/product-card1';
import { getProducts } from '@/services/product.service';
import { IProduct } from '@/types/products.type';
import React from 'react';

const Products = async () => {
  const response = await getProducts();

  const products = response?.data?.data || [];

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
          {products.map((product: IProduct) => (
            <ProductCard1 key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
