import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Category = () => {
  const categories = [
    {
      name: 'Other Projector Accessories',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Kitchen Fittings',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Womens Fashion',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Watches & Accessories',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Kitchen Items',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Fashion',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Accessories',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'More',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Other Projector Accessories',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Kitchen Fittings',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Womens Fashion',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Watches & Accessories',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Kitchen Items',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Fashion',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'Accessories',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
    {
      name: 'More',
      image:
        '/images/Sca9b307a0df741e8b032edc53ae94b00o.jpg_170x170q80.jpg_.avif',
    },
  ];

  return (
    <div className="w-full py-10 bg-white">
      <div className="container mx-auto px-4 md:px-0">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Categories
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold mt-3 sm:mt-0 group"
          >
            View more
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 ">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="text-center cursor-pointer group border  border-gray-200 py-5"
            >
              {/* Image */}
              <div className="w-16 h-16 mx-auto overflow-hidden  group-hover:scale-105 transition ">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>

              {/* Title */}
              <p className="text-xs mt-2 text-gray-600 group-hover:text-orange-500 transition">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
