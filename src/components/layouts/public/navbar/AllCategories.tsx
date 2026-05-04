'use client';
import React from 'react';
import { X } from 'lucide-react';

interface AllCategoriesProps {
  isFullscreenMenuOpen: boolean;
  setIsFullscreenMenuOpen: (value: boolean) => void;
}

const AllCategories = ({
  isFullscreenMenuOpen,
  setIsFullscreenMenuOpen,
}: AllCategoriesProps) => {
  // Category data structure
  const categories = [
    {
      name: 'Electronics',
      subcategories: [
        'Smartphones',
        'Laptops',
        'Audio',
        'Cameras',
        'Wearables',
        'Gaming',
      ],
    },
    {
      name: 'Fashion',
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Kids' Fashion",
        'Shoes',
        'Accessories',
        'Bags',
      ],
    },
    {
      name: 'Home & Garden',
      subcategories: [
        'Furniture',
        'Decor',
        'Kitchen & Dining',
        'Bedding',
        'Bath',
        'Garden Tools',
      ],
    },
    {
      name: 'Sports & Entertainment',
      subcategories: [
        'Fitness Equipment',
        'Outdoor Gear',
        'Toys & Hobbies',
        'Musical Instruments',
        'Sports Apparel',
      ],
    },
  ];

  // 👉 If not open → render nothing (important)
  if (!isFullscreenMenuOpen) return null;

  return (
    <div
      className="absolute left-0 right-0 top-full z-50 bg-white overflow-y-auto border-t shadow-2xl"
      onMouseLeave={() => setIsFullscreenMenuOpen(false)}
    >
      <div
        className="container mx-auto px-4 py-8 relative"
        onMouseEnter={() => setIsFullscreenMenuOpen(true)}
      >
        {/* Close button */}
        <button
          onClick={() => setIsFullscreenMenuOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Shop by Category
        </h2>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map(category => (
            <div key={category.name} className="space-y-3">
              <h3 className="text-lg font-semibold text-orange-600 border-b pb-2">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.subcategories.map(sub => (
                  <li key={sub}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-orange-500 hover:pl-2 transition-all duration-200 block"
                    >
                      {sub}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Featured Collections
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#" className="group">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg group-hover:shadow-md transition-shadow">
                <p className="font-medium text-gray-800">Electronics Deals</p>
                <p className="text-sm text-gray-500">Up to 70% off</p>
              </div>
            </a>

            <a href="#" className="group">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg group-hover:shadow-md transition-shadow">
                <p className="font-medium text-gray-800">Summer Fashion</p>
                <p className="text-sm text-gray-500">New arrivals</p>
              </div>
            </a>

            <a href="#" className="group">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg group-hover:shadow-md transition-shadow">
                <p className="font-medium text-gray-800">Home Essentials</p>
                <p className="text-sm text-gray-500">Best sellers</p>
              </div>
            </a>

            <a href="#" className="group">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg group-hover:shadow-md transition-shadow">
                <p className="font-medium text-gray-800">Top Brands</p>
                <p className="text-sm text-gray-500">Shop now</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
