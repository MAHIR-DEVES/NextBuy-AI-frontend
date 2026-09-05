import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CategoryProps {
  name: string;
  image: string;
}

const Category = () => {
  const categories: CategoryProps[] = [
    {
      name: 'Shoes',
      image: '/images/category/Gray Modern.png',
    },
    {
      name: 'Formal Shoes',
      image: '/images/category/formal-shoes.png',
    },
    {
      name: 'Earphone',
      image: '/images/category/Earphone.png',
    },
    {
      name: 'Headphone',
      image: '/images/category/Headphone.png',
    },
    {
      name: 'Bag',
      image: '/images/category/bag.png',
    },
    {
      name: 'Smart Watch',
      image: '/images/category/smart watch.png',
    },
    {
      name: 'Shoes',
      image: '/images/category2.png',
    },
    {
      name: 'Shoes',
      image: '/images/category1.png',
    },
  ];

  return (
    <div className="w-full bg-white py-10">
      <div className="container mx-auto md:px-0">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
          <h2 className="text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl">
            Categories
          </h2>

          <Link
            href="/products"
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-title transition-colors hover:text-hover-text sm:text-base"
          >
            <span>View more</span>

            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
          </Link>
        </div>

        {/* Category Wrapper */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-orange-400 md:overflow-visible">
          {/* ================= MOBILE ================= */}
          <div className="grid auto-cols-[25%] grid-flow-col grid-rows-2 md:hidden">
            {categories.map((cat, idx) => (
              <div
                key={`${cat.name}-${idx}`}
                className="group cursor-pointer border border-gray-200 py-4 text-center"
              >
                <div className="mx-auto flex h-16 w-20 items-center justify-center transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={100}
                    height={100}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:grid md:grid-cols-8">
            {categories.map((cat, idx) => (
              <div
                key={`${cat.name}-${idx}`}
                className="group cursor-pointer border border-gray-200 py-3 text-center"
              >
                <div className="mx-auto flex h-20 w-32 items-center justify-center transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={200}
                    height={200}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
