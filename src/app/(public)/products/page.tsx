'use client';
import React, { useState } from 'react';
import {
  SlidersHorizontal,
  ChevronDown,
  Filter,
  X,
  ChevronRight,
} from 'lucide-react';
import { ProductCard1 } from '@/components/product-card1';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Yawell Premium Speaker',
    image: {
      src: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
      alt: 'Yawell Speaker',
    },
    link: '#',
    description: 'High-quality portable speaker with deep bass sound.',
    price: {
      regular: 493.15,
      sale: 463.18,
      currency: 'USD',
    },
    badge: {
      text: 'Hot Deal',
      backgroundColor: 'oklch(50.5% 0.213 27.518)',
    },
    rating: 4.84,
    moq: 200,
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    image: {
      src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      alt: 'Smart Watch',
    },
    link: '#',
    description: 'Track your fitness and notifications in real-time.',
    price: {
      regular: 145.05,
      sale: 116.04,
      currency: 'USD',
    },
    badge: {
      text: 'Best Seller',
      backgroundColor: 'oklch(55% 0.2 220)',
    },
    rating: 4.7,
    moq: 2,
  },
  {
    id: 3,
    name: 'Wireless Earbuds X',
    image: {
      src: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=300&h=300&fit=crop',
      alt: 'Earbuds',
    },
    link: '#',
    description: 'Noise cancelling earbuds with crystal clear sound.',
    price: {
      regular: 110.0,
      sale: 88.0,
      currency: 'USD',
    },
    badge: {
      text: 'New',
      backgroundColor: 'oklch(65% 0.25 140)',
    },
    rating: 4.9,
    moq: 1,
  },
  {
    id: 4,
    name: 'Smart Home Speaker',
    image: {
      src: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
      alt: 'Smart Speaker',
    },
    link: '#',
    description: 'AI-powered smart speaker for home automation.',
    price: {
      regular: 1271.56,
      sale: 1017.25,
      currency: 'USD',
    },
    badge: {
      text: 'Limited',
      backgroundColor: 'oklch(60% 0.2 60)',
    },
    rating: 4.6,
    moq: 5,
  },
  {
    id: 5,
    name: 'Fitness Tracker Band',
    image: {
      src: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=300&h=300&fit=crop',
      alt: 'Fitness Tracker',
    },
    link: '#',
    description: 'Track your steps, sleep and health metrics easily.',
    price: {
      regular: 725.23,
      sale: 580.18,
      currency: 'USD',
    },
    badge: {
      text: 'Discount',
      backgroundColor: 'oklch(58% 0.22 30)',
    },
    rating: 4.5,
    moq: 10,
  },
  {
    id: 6,
    name: 'Fitness Tracker Band',
    image: {
      src: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
      alt: 'Fitness Tracker',
    },
    link: '#',
    description: 'Track your steps, sleep and health metrics easily.',
    price: {
      regular: 725.23,
      sale: 580.18,
      currency: 'USD',
    },
    badge: {
      text: 'Discount',
      backgroundColor: 'oklch(58% 0.22 30)',
    },
    rating: 4.5,
    moq: 10,
  },
];

const ProductListing = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filters = {
    price: [
      { value: 'all', label: 'All Prices' },
      { value: 'under50', label: 'Under $50' },
      { value: '50to100', label: '$50 - $100' },
      { value: '100to200', label: '$100 - $200' },
      { value: 'over200', label: 'Over $200' },
    ],
    rating: [
      { value: 'all', label: 'All Ratings' },
      { value: '4', label: '4★ & above' },
      { value: '3', label: '3★ & above' },
      { value: '2', label: '2★ & above' },
    ],
    brands: ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Logitech'],
    categories: [
      'Electronics',
      'Audio',
      'Wearables',
      'Computers',
      'Accessories',
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="#" className="hover:text-orange-500">
            Home
          </a>
          <ChevronRight className="h-3 w-3" />
          <a href="#" className="hover:text-orange-500">
            Products
          </a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-800 font-medium">All Products</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          {/* LEFT SIDE - FILTERS (Desktop) */}
          <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
            <div className="bg-white rounded-xs shadow-sm p-5 sticky top-4">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  Filters
                </h2>
                <button className="text-sm text-orange-500 hover:text-orange-600">
                  Clear All
                </button>
              </div>

              {/* Price Filter */}
              <div className="mb-6 border-b border-gray-100 pb-5">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-between cursor-pointer">
                  Price Range
                  <ChevronDown className="h-4 w-4" />
                </h3>
                <div className="space-y-2">
                  {filters.price.map(price => (
                    <label
                      key={price.value}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-orange-500"
                    >
                      <input
                        type="radio"
                        name="price"
                        value={price.value}
                        checked={selectedPrice === price.value}
                        onChange={e => setSelectedPrice(e.target.value)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      {price.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6 border-b border-gray-100 pb-5">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Customer Rating
                </h3>
                <div className="space-y-2">
                  {filters.rating.map(rating => (
                    <label
                      key={rating.value}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-orange-500"
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={rating.value}
                        checked={selectedRating === rating.value}
                        onChange={e => setSelectedRating(e.target.value)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      {rating.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories Filter */}
              <div className="mb-6 border-b border-gray-100 pb-5">
                <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
                <div className="space-y-2">
                  {filters.categories.map(category => (
                    <label
                      key={category}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-orange-500"
                    >
                      <input
                        type="checkbox"
                        className="rounded text-orange-500 focus:ring-orange-500"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Brands</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filters.brands.map(brand => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-orange-500"
                    >
                      <input
                        type="checkbox"
                        className="rounded text-orange-500 focus:ring-orange-500"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              {/* Apply Filters Button */}
              <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - PRODUCTS */}
          <div className="flex-1">
            {/* Sort and Filter Header */}
            <div className="bg-white rounded-xs shadow-sm p-4 mb-3 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600 text-sm">
                  Showing{' '}
                  <span className="font-semibold text-gray-800">
                    {products.length}
                  </span>{' '}
                  products
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort By */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-200 rounded-xs px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2">
                {products.map(product => (
                  <ProductCard1 key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xs shadow-sm p-12 text-center">
                <p className="text-gray-500">No products found</p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 rounded-lg bg-orange-500 text-white">
                1
              </button>
              <button className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors">
                2
              </button>
              <button className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors">
                3
              </button>
              <button className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5">
                {/* Mobile filter content - same as desktop */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    {filters.price.map(price => (
                      <label
                        key={price.value}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <input
                          type="radio"
                          name="price-mobile"
                          className="text-orange-500"
                        />
                        {price.label}
                      </label>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
