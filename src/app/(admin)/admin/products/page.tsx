// src/app/dashboard/products/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { deleteProduct, getProducts } from '@/services/product.service';
import { Plus, Search, Filter, X, ChevronDown } from 'lucide-react';
import { IProduct } from '@/types/products.type';
import ProductModal from '@/components/layouts/admin/products/ProductModal';
import ProductView from '@/components/layouts/admin/products/ProductView';
import ProductUpdateForm from '@/components/layouts/admin/products/ProductUpdateForm';
import ProductCreateForm from '@/components/layouts/admin/products/ProductCreateForm';
import ProductsTable from '@/components/layouts/admin/products/ProductsTable';

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // =========================
  // FETCH PRODUCTS (MAIN API)
  // =========================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts({
        page: 1,
        limit: 10,
        search,
        category,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        sortBy: 'price',
        sortOrder: 'asc',
      });

      setProducts(data?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, minPrice, maxPrice]);

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
  };

  // Check if any filter is active
  const hasActiveFilters = search || category || minPrice || maxPrice;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER SECTION */}
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

            <button
              onClick={() => setOpenCreate(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-gray-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* SEARCH AND FILTER SECTION */}
        <div className="bg-white dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              )}
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="Filter by category"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      placeholder="$0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      value={minPrice}
                      onChange={e => setMinPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      placeholder="$9999"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      value={maxPrice}
                      onChange={e => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
            {hasActiveFilters && ' (filtered)'}
          </p>
        </div>

        {/* PRODUCTS TABLE */}
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
              setOpenUpdate(true);
            }}
          />
        </div>

        {/* MODALS */}
        <ProductModal
          isOpen={openView}
          onClose={() => setOpenView(false)}
          title="Product Details"
        >
          <ProductView product={selectedProduct} />
        </ProductModal>

        <ProductModal
          isOpen={openUpdate}
          onClose={() => setOpenUpdate(false)}
          title="Update Product"
        >
          <ProductUpdateForm
            product={selectedProduct}
            refetch={fetchProducts}
            closeModal={() => setOpenUpdate(false)}
          />
        </ProductModal>

        <ProductModal
          isOpen={openCreate}
          onClose={() => setOpenCreate(false)}
          title="Create Product"
        >
          <ProductCreateForm
            refetch={fetchProducts}
            closeModal={() => setOpenCreate(false)}
          />
        </ProductModal>
      </div>
    </div>
  );
};

export default ProductsPage;
