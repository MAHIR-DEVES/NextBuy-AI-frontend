import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getProducts } from '@/services/product.service';
import { IProduct } from '@/types/products.type';
import { ProductCard1 } from '@/components/product-card1';

const TopDeal = async () => {
  const data = await getProducts({
    isFeatured: true,
    limit: 10,
  });

  const isProducts: IProduct[] = data?.data?.data || [];

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 pb-8 sm:pb-10">
      <div className="container mx-auto sm:px-4 md:px-5 lg:px-0">
        {/* Header Section */}
        <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6 md:mb-8">
          <h2 className="text-lg font-bold text-gray-800 sm:text-xl md:text-2xl lg:text-3xl">
            Top Deals
          </h2>

          <Link
            href="/products"
            className="group inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold text-title transition-colors hover:text-hover-text sm:gap-1 sm:text-sm md:text-base"
          >
            <span>View more</span>

            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:gap-4 xl:grid-cols-5">
          {isProducts.slice(0, 5).map(product => {
            return (
              <ProductCard1
                key={product.id}
                product={product}
                isFeatured={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopDeal;
