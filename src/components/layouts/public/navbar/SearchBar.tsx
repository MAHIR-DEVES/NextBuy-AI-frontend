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
import React, { useEffect, useRef, useState } from 'react';
import { getProducts } from '@/services/product.service';
import { IProduct } from '@/types/products.type';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const popularSearches = [
  'Shoes',
  'Apple',
  'Nike',
  'Samsung',
  'Headphones',
  'Laptop',
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

  // Close dropdown
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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ✅ API Call with useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery.trim()) {
        setProducts([]);
        return;
      }

      try {
        setLoading(true);

        const data = await getProducts({
          search: searchQuery,
          limit: 10,
        });

        setProducts(data?.data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // debounce
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

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
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              className="flex-1 h-11 text-sm border-r-0 rounded-l-xl rounded-r-none focus:ring-2 focus:ring-orange-500/20 pr-10"
            />

            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
            className="h-11 rounded-r-xl rounded-l-none px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 md:mx-4 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
          {/* Popular Searches */}
          {!searchQuery && !loading && products.length === 0 && (
            <div className="p-4">
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
                    onClick={() => {
                      setSearchQuery(term);
                      setIsOpen(true);
                    }}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-orange-100 rounded-full text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-orange-500 border-t-transparent"></div>

              <p className="text-sm text-gray-500 mt-2">
                Searching products...
              </p>
            </div>
          )}

          {/* No Result */}
          {!loading && searchQuery && products.length === 0 && (
            <div className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />

              <p className="text-gray-500 font-medium">No products found</p>
            </div>
          )}

          {/* Products */}
          {!loading && products.length > 0 && (
            <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-50">
              {products.map(product => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div
                    onClick={() => {
                      setProducts([]);
                      setSearchQuery('');
                      setIsOpen(false);
                    }}
                    className="group p-3 hover:bg-orange-50 transition-all"
                  >
                    <div className="flex gap-3">
                      <div className="relative w-14 h-14 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={product.thumbnail}
                          fill
                          alt={product.name}
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-sm text-gray-800 line-clamp-2">
                            {product.name}
                          </p>

                          <span className="text-orange-500 font-bold text-sm">
                            ${product.price?.toFixed(2)}
                          </span>
                        </div>

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
                            <span className="text-xs text-green-600">
                              In Stock
                            </span>
                          ) : (
                            <span className="text-xs text-red-500">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Footer */}
          {!loading && products.length > 0 && (
            <div className="p-3 border-t border-gray-100">
              <button
                onClick={() => {
                  router.push(`/products?search=${searchQuery}`);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 text-orange-600 font-semibold text-sm"
              >
                View all results
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
