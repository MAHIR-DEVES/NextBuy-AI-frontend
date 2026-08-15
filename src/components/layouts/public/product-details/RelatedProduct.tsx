import { ProductCard1 } from '@/components/product-card1';
import { getProducts } from '@/services/product.service';
import { IProduct } from '@/types/products.type';
import React from 'react';

interface RelatedProductProps {
  categoryId: string;
}

const RelatedProduct = async ({ categoryId }: RelatedProductProps) => {
  const response = await getProducts({
    categoryId: categoryId,
    limit: 6,
  });

  const products = response?.data?.data || [];

  return (
    <div className="w-full pb-10 bg-white mt-3 md:mt-5">
      <div className="container mx-auto md:px-0">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {products.map((product: IProduct) => (
            <ProductCard1 key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
