'use client';

import Image from 'next/image';
import { Eye, Edit2, Trash2, Package, CheckCircle } from 'lucide-react';

import { IProduct } from '@/types/products.type';
import LoadingSpinner from '../shared/dashboard/LoadingSpinner';
import Link from 'next/link';

type Props = {
  products: IProduct[];
  loading: boolean;
  handleDelete: (id: string) => void;
  handleView: (product: IProduct) => void;
  handleUpdate: (product: IProduct) => void;
};

const ProductsTable = ({
  products,
  loading,
  handleDelete,
  handleView,
  handleUpdate,
}: Props) => {
  // =========================
  // STOCK BADGE
  // =========================

  const getStockBadgeClass = (stock: number) => {
    if (stock <= 0) {
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
    }

    if (stock <= 10) {
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
    }

    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
  };

  // =========================
  // PRICE FORMAT
  // =========================

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // =========================
  // PRODUCT CATEGORY
  // =========================

  const getCategoryName = (product: IProduct) => {
    if (typeof product.category === 'object' && product.category) {
      return product.category.name;
    }

    if (typeof product.category === 'string') {
      return product.category;
    }

    return 'Uncategorized';
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner message="products" />
      </div>
    );
  }

  // =========================
  // EMPTY STATE
  // =========================

  if (products.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <Package className="w-7 h-7 text-gray-400 dark:text-gray-600" />
        </div>

        <p className="text-sm font-medium text-gray-900 dark:text-white">
          No products found
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* =====================================================
          MOBILE VIEW
      ====================================================== */}

      <div className="block md:hidden p-3 space-y-3">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4"
          >
            {/* Product Header */}

            <div className="flex items-start gap-3">
              {/* Image */}

              <div className="relative w-16 h-16 shrink-0">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Package className="w-7 h-7 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Info */}

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ID: {product.id.slice(0, 8)}...
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {product.brand || 'No brand'}
                  </span>

                  <span className="text-gray-300">•</span>

                  <span className="inline-flex px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300">
                    {getCategoryName(product)}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Details */}

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {/* Price */}

                <div>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    Price
                  </p>

                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </p>
                </div>

                {/* Stock */}

                <div>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    Stock
                  </p>

                  <span
                    className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${getStockBadgeClass(
                      product.stock,
                    )}`}
                  >
                    {product.stock <= 0
                      ? 'Out of Stock'
                      : `${product.stock} units`}
                  </span>
                </div>

                {/* Featured */}

                <div>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    Status
                  </p>

                  {product.isFeatured ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Featured
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Regular</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => handleView(product)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                View
              </button>

              <button
                type="button"
                onClick={() => handleUpdate(product)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Update
              </button>

              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          DESKTOP TABLE
      ====================================================== */}

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[900px]">
          {/* Table Header */}

          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/70">
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Product
              </th>

              <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Brand
              </th>

              <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>

              <th className="px-4 py-3.5 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Price
              </th>

              <th className="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Stock
              </th>

              <th className="px-4 py-3.5 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>

              <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}

          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`
                  border-b border-gray-100 dark:border-gray-800
                  transition-colors
                  hover:bg-gray-50 dark:hover:bg-gray-800/40
                  ${
                    index % 2 === 0
                      ? 'bg-white dark:bg-gray-900'
                      : 'bg-gray-50/40 dark:bg-gray-900/50'
                  }
                `}
              >
                {/* Product */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 shrink-0">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          fill
                          sizes="44px"
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                        {product.name}
                      </p>

                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        ID: {product.id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                </td>

                {/* Brand */}

                <td className="px-4 py-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {product.brand || '—'}
                  </span>
                </td>

                {/* Category */}

                <td className="px-4 py-4">
                  <span className="inline-flex px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300">
                    {getCategoryName(product)}
                  </span>
                </td>

                {/* Price */}

                <td className="px-4 py-4 text-right">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatPrice(product.price)}
                    </p>

                    {product.specialPrice && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                        Sale: {formatPrice(product.specialPrice)}
                      </p>
                    )}
                  </div>
                </td>

                {/* Stock */}

                <td className="px-4 py-4 text-center">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStockBadgeClass(
                      product.stock,
                    )}`}
                  >
                    {product.stock <= 0
                      ? 'Out of Stock'
                      : `${product.stock} units`}
                  </span>
                </td>

                {/* Status */}

                <td className="px-4 py-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    {product.isFeatured ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400" />
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Regular</span>
                    )}

                    <span
                      className={`text-[10px] ${
                        product.isPublished
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-400'
                      }`}
                    >
                      {product.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </td>

                {/* Actions */}

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    {/* View */}

                    <button
                      type="button"
                      onClick={() => handleView(product)}
                      title="View product"
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Update */}

                    <Link href={`/admin/update-product?slug=${product.slug}`}>
                      <button
                        type="button"
                        title="Update product"
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </Link>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      title="Delete product"
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
