import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Category = () => {
  const categories = [
    {
      name: 'Shoes ',
      image: '/images/category1.png',
    },
    {
      name: 'Shoes',
      image: '/images/category2.png',
    },
    {
      name: 'Shoes',
      image: '/images/category3.png',
    },
    {
      name: 'Shoes ',
      image: '/images/category4.png',
    },
    {
      name: 'Shoes',
      image: '/images/category5.png',
    },
    {
      name: 'Shoes',
      image: '/images/category3.png',
    },
    {
      name: 'Shoes',
      image: '/images/category2.png',
    },
    {
      name: 'Shoes',
      image: '/images/category1.png',
    },
    {
      name: 'Shoes',
      image: '/images/category4.png',
    },
    {
      name: 'Shoes',
      image: '/images/category3.png',
    },
    {
      name: 'Shoes',
      image: '/images/category2.png',
    },
    {
      name: 'Shoes',
      image: '/images/category1.png',
    },
    {
      name: 'Shoes',
      image: '/images/category4.png',
    },
    {
      name: 'Shoes',
      image: '/images/category3.png',
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
    <div className="w-full py-10 bg-white">
      <div className="container mx-auto  md:px-0">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Categories
            </h2>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold mt-3 sm:mt-0 group"
            href="/products"
          >
            View more
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto md:overflow-visible scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100">
          {/* Mobile (scroll + 2 rows) */}
          <div className="grid grid-rows-2 grid-flow-col auto-cols-[25%] md:hidden">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="text-center cursor-pointer group border border-gray-200 py-5"
              >
                <div className="w-16 h-16 mx-auto overflow-hidden group-hover:scale-105 transition">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover "
                  />
                </div>

                <p className="text-xs mt-2 text-gray-600 group-hover:text-orange-500 transition">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop (2 rows grid) */}
          <div className="hidden md:grid grid-cols-8 gap-0">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="text-center cursor-pointer group border border-gray-200 py-5"
              >
                <div className="w-16 h-16 mx-auto overflow-hidden group-hover:scale-105 transition">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={200}
                    height={200}
                    className="w-16 h-16 object-cover "
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
