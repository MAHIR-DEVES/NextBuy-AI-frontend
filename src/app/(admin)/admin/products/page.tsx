'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { deleteProduct, getProducts } from '@/services/product.service';
import {
  Plus,
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { IProduct } from '@/types/products.type';
import ProductModal from '@/components/layouts/admin/products/ProductModal';
import ProductView from '@/components/layouts/admin/products/ProductView';
import ProductsTable from '@/components/layouts/admin/products/ProductsTable';
import Link from 'next/link';

interface ProductMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const [showFilters, setShowFilters] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const [openView, setOpenView] = useState(false);

  // =========================
  // FILTER STATES
  // =========================

  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // =========================
  // PAGINATION
  // =========================

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [meta, setMeta] = useState<ProductMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getProducts({
        page,
        limit,
        search: search.trim() || undefined,
        categoryId: categoryId.trim() || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });

      const productData = response?.data?.data || [];
      const productMeta = response?.data?.meta;

      setProducts(productData);
      setMeta(
        productMeta || {
          total: 0,
          page,
          limit,
          totalPages: 1,
        },
      );
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, categoryId, minPrice, maxPrice]);

  // =========================
  // FETCH ON FILTER / PAGE
  // =========================

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this product?',
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await deleteProduct(id);

      if (res.success) {
        await fetchProducts();
      }
    } catch (error) {
      console.error('Delete product error:', error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CLEAR FILTERS
  // =========================

  const clearFilters = () => {
    setSearch('');
    setCategoryId('');
    setMinPrice('');
    setMaxPrice('');
    setPage(1);
  };

  // =========================
  // FILTER CHANGE HANDLERS
  // =========================

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setPage(1);
  };

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    setPage(1);
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    setPage(1);
  };

  // =========================
  // PAGINATION
  // =========================

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < meta.totalPages) {
      setPage(prev => prev + 1);
    }
  };

  // =========================
  // ACTIVE FILTER
  // =========================

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(categoryId) ||
    Boolean(minPrice) ||
    Boolean(maxPrice);

  // =========================
  // RESULT RANGE
  // =========================

  const startItem = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;

  const endItem = Math.min(meta.page * meta.limit, meta.total);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Products
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage your product inventory, pricing, and availability
              </p>
            </div>

            <Link href="/admin/create-product">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </Link>
          </div>
        </div>

        {/* =========================
            SEARCH & FILTER
        ========================= */}

        <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Search */}

              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />

                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  value={search}
                  onChange={e => handleSearchChange(e.target.value)}
                />
              </div>

              {/* Filter Button */}

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Clear */}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              )}
            </div>

            {/* =========================
                EXPANDED FILTERS
            ========================= */}

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Category */}

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>

                    <input
                      type="text"
                      placeholder="Filter by category ID"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      value={categoryId}
                      onChange={e => handleCategoryChange(e.target.value)}
                    />
                  </div>

                  {/* Min Price */}

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Min Price
                    </label>

                    <input
                      type="number"
                      placeholder="$0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      value={minPrice}
                      onChange={e => handleMinPriceChange(e.target.value)}
                    />
                  </div>

                  {/* Max Price */}

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Max Price
                    </label>

                    <input
                      type="number"
                      placeholder="$9999"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      value={maxPrice}
                      onChange={e => handleMaxPriceChange(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================
            RESULTS COUNT
        ========================= */}

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {loading ? (
              'Loading products...'
            ) : (
              <>
                Showing{' '}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {startItem}-{endItem}
                </span>{' '}
                of{' '}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {meta.total}
                </span>{' '}
                product{meta.total !== 1 ? 's' : ''}
                {hasActiveFilters && ' (filtered)'}
              </>
            )}
          </p>
        </div>

        {/* =========================
            PRODUCTS TABLE
        ========================= */}

        <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <ProductsTable
            products={products}
            loading={loading}
            handleDelete={handleDelete}
            handleView={product => {
              setSelectedProduct(product);
              setOpenView(true);
            }}
            handleUpdate={product => {
              setSelectedProduct(product);
            }}
          />
        </div>

        {/* =========================
            PAGINATION
        ========================= */}

        {!loading && meta.totalPages > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Pagination Info */}

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Page{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {meta.page}
              </span>{' '}
              of{' '}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {meta.totalPages}
              </span>
            </p>

            {/* Pagination Buttons */}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="hidden sm:flex items-center gap-1">
                {Array.from(
                  { length: meta.totalPages },
                  (_, index) => index + 1,
                )
                  .filter(pageNumber => {
                    if (meta.totalPages <= 5) return true;

                    return (
                      pageNumber === 1 ||
                      pageNumber === meta.totalPages ||
                      Math.abs(pageNumber - page) <= 1
                    );
                  })
                  .map(pageNumber => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`min-w-9 h-9 px-2 rounded-lg text-sm font-medium transition-colors ${
                        pageNumber === page
                          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
              </div>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={page >= meta.totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================
            PRODUCT VIEW MODAL
        ========================= */}

        <ProductModal
          isOpen={openView}
          onClose={() => {
            setOpenView(false);
            setSelectedProduct(null);
          }}
          title="Product Details"
        >
          <ProductView product={selectedProduct} />
        </ProductModal>
      </div>
    </div>
  );
};

export default ProductsPage;
