'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Star,
  X,
  TrendingUp,
  Clock,
  Package,
  ChevronRight,
} from 'lucide-react';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { getProducts } from '@/services/product.service';
import { IProduct } from '@/types/products.type';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ✅ Debounce function
function debounce(func: Function, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// Popular searches
const popularSearches = [
  'iphone',
  'Smartphone',
  'Laptop',
  'Headphones',
  'Smart Watch',
  'Gaming Mouse',
  'Keyboard',
  'Monitor',
  'Speaker',
];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }

      try {
        setLoading(true);
        const data = await getProducts({
          search: query,
          limit: 10,
        });
        setProducts(data?.data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [],
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
    setIsOpen(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setProducts([]);
    setIsOpen(false);
  };

  return (
    <div className="w-full relative" ref={searchRef}>
      {/* Search Box */}
      <div className="flex-1 w-full mx-0 md:mx-4">
        <div className="relative flex w-full items-stretch group">
          <div className="relative flex-1">
            <Input
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={e => {
                const value = e.target.value;
                setSearchQuery(value);
                debouncedSearch(value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              className="flex-1 h-12 text-sm border-r-0 rounded-l-xl rounded-r-none focus:ring-2 focus:ring-orange-500/20 pr-10"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Button
            onClick={() => {
              if (searchQuery) {
                router.push(`/products?search=${searchQuery}`);
                setIsOpen(false);
              }
            }}
            className="h-12 rounded-r-xl rounded-l-none px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 md:mx-4 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-[500px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header with recent searches */}
          {!searchQuery && !loading && products.length === 0 && (
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-gray-700">
                  Popular Searches
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(term)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-600 rounded-full text-sm transition-all duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-orange-500 border-t-transparent"></div>
              <p className="text-sm text-gray-500 mt-2">
                Searching products...
              </p>
            </div>
          )}

          {/* No Results */}
          {!loading && searchQuery && products.length === 0 && (
            <div className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No products found</p>
              <p className="text-sm text-gray-400 mt-1">
                Try searching with different keywords
              </p>
              <button
                onClick={() => {
                  router.push(`/products?search=${searchQuery}`);
                  setIsOpen(false);
                }}
                className="mt-4 text-orange-500 text-sm font-semibold hover:underline"
              >
                Browse all products →
              </button>
            </div>
          )}

          {/* Results */}
          {!loading && products.length > 0 && (
            <>
              {/* Results Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5 text-orange-500" />
                  <span className="text-xs text-gray-500">
                    Found {products.length} product
                    {products.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <button
                  onClick={clearSearch}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>

              {/* Products List */}
              <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-50">
                {products.map(product => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div
                      onClick={() => {
                        setProducts([]);
                        setSearchQuery('');
                        setIsOpen(false);
                      }}
                      className="group p-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex gap-3">
                        {/* Product Image */}
                        <div className="relative w-14 h-14 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={product.thumbnail}
                            fill
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          {product.discount && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                              -{product.discount}%
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-semibold text-sm text-gray-800 group-hover:text-orange-500 transition-colors line-clamp-2">
                              {product.name}
                            </p>
                            <div className="text-right flex-shrink-0">
                              <span className="text-orange-500 font-bold text-sm">
                                ${product.price?.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Rating & Stock */}
                          <div className="flex items-center gap-3 mt-1.5">
                            {product.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                                <span className="text-xs font-medium text-gray-700">
                                  {product.rating}
                                </span>
                              </div>
                            )}
                            {product.stock && product.stock > 0 ? (
                              <span className="text-xs text-green-600 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                In Stock
                              </span>
                            ) : (
                              <span className="text-xs text-red-500 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                Out of Stock
                              </span>
                            )}
                            {product.brand && (
                              <span className="text-xs text-gray-400">
                                {product.brand}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All Footer */}
              <div className="sticky bottom-0 bg-gray-50/95 backdrop-blur-sm px-4 py-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    router.push(`/products?search=${searchQuery}`);
                    setIsOpen(false);
                    setProducts([]);
                  }}
                  className="w-full flex items-center justify-center gap-2 text-orange-600 font-semibold text-sm hover:gap-3 transition-all duration-300"
                >
                  View all results
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
