import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getProducts } from '@/services/product.service';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { IProduct } from '@/types/products.type';

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
            const originalPrice = product.price;
            const discount = product.discount || 0;

            const finalPrice = discount
              ? originalPrice - (originalPrice * discount) / 100
              : originalPrice;

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="min-w-0"
              >
                <div className="group h-full cursor-pointer overflow-hidden rounded-xs border border-gray-100 bg-white shadow-md transition-all duration-300 hover:border-primary-light">
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gray-100">
                    <AspectRatio
                      ratio={1.268115942}
                      className="overflow-hidden"
                    >
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        sizes="
                          (max-width: 640px) 50vw,
                          (max-width: 1024px) 33vw,
                          20vw
                        "
                        className="block size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </AspectRatio>

                    {/* Discount Badge */}
                    {product.discount && (
                      <div className="absolute right-1.5 top-1.5 rounded-full bg-chart-2 px-1.5 py-0.5 text-[10px] font-bold text-white sm:right-2 sm:top-2 sm:px-2 sm:py-1 sm:text-xs">
                        -{product.discount}%
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className=" p-2.5 sm:p-3 md:p-4">
                    {/* CATEGORY / BRAND */}
                    {(product.category?.name || product.brand) && (
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 line-clamp-1">
                        {product.category?.name || product.brand}
                      </p>
                    )}
                    {/* Title */}
                    <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-gray-800 sm:text-base md:text-lg">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="mb-1 line-clamp-1 text-xs text-gray-600 sm:text-sm">
                      {product.description}
                    </p>

                    {/* RATING & STOCK */}
                    <div className="flex items-center justify-between text-xs py-2">
                      {/* GOLD FILLED STAR */}
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-gray-800 dark:text-gray-200">
                          {product.rating > 0
                            ? product.rating.toFixed(1)
                            : '5.0'}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          ({product.reviewCount || 1})
                        </span>
                      </div>

                      {/* STOCK STATUS */}
                      <span
                        className={`text-[11px] font-semibold ${
                          product.stock > 0
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-500'
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : 'Out of stock'}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-1 sm:mb-3">
                      <div className="flex min-w-0 flex-wrap items-baseline gap-1 sm:gap-2">
                        {/* Final Price */}
                        <span className="text-lg font-bold sm:text-xl md:text-2xl">
                          ৳{finalPrice.toFixed(2)}
                        </span>

                        {/* Original Price */}
                        {discount > 0 && (
                          <span className="text-[10px] text-gray-400 line-through sm:text-xs md:text-sm">
                            ৳{originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopDeal;
