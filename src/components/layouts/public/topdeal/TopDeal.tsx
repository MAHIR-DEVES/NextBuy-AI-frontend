import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getProducts } from '@/services/product.service';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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

const TopDeal = async () => {
  const data = await getProducts({
    isFeatured: true,
    limit: 10,
  });
  const isProducts: IProduct[] = data?.data?.data || [];

  return (
    <div className="w-full pb-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto  md:px-0">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Top Deals
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold mt-3 sm:mt-0 group"
          >
            View more
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 ">
          {isProducts.map(product => (
            <Link key={product.id} href={`/products/${product.id}`}>
              {' '}
              <div className="group bg-white rounded-xs shadow-md  overflow-hidden cursor-pointer border border-gray-100 hover:border-orange-200">
                {/* Product Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <AspectRatio ratio={1.268115942} className="overflow-hidden">
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      fill
                      className="block size-full object-cover object-center"
                    />
                  </AspectRatio>
                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700 ml-1">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">• 2k+ orders</span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-orange-500">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product?.discount.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeal;
