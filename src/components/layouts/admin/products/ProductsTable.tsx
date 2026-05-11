// src/components/layouts/admin/products/ProductsTable.tsx

'use client';

import Image from 'next/image';
import {
  Eye,
  Edit2,
  Trash2,
  Package,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { IProduct } from '@/types/products.type';

type Props = {
  products: IProduct[];
  loading: boolean;
  handleDelete: (id: string) => void;
  handleView: (p: IProduct) => void;
  handleUpdate: (p: IProduct) => void;
};

const ProductsTable = ({
  products,
  loading,
  handleDelete,
  handleView,
  handleUpdate,
}: Props) => {
  const getStockBadgeClass = (stock: number) => {
    if (stock <= 0)
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
    if (stock <= 10)
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="w-full">
      {/* Mobile Card View - Visible only on mobile */}
      <div className="block md:hidden space-y-3">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-gray-300 dark:border-gray-700 border-t-gray-900 dark:border-t-gray-400 rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading products...
              </p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <Package className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              No products found
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          products.map(product => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4"
            >
              {/* Product Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-16 h-16 relative flex-shrink-0">
                  {product.thumbnail ? (
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    ID: {product.id?.slice(0, 8)}...
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {product.brand || 'No brand'}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="inline-flex px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md">
                      {product.category || 'Uncategorized'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Details - ONE LINE (Price, Stock, Featured) */}
              <div className="flex flex-wrap items-center gap-3 py-2 border-t border-b border-gray-100 dark:border-gray-800">
                {/* Price */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Price:
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <div className="w-px h-3 bg-gray-200 dark:bg-gray-700"></div>

                {/* Stock */}
                <span
                  className={`text-xs font-medium ${getStockBadgeClass(product.stock)}`}
                >
                  {product.stock <= 0
                    ? 'Out of Stock'
                    : `${product.stock} in stock`}
                </span>

                {product.isFeatured && (
                  <>
                    <div className="w-px h-3 bg-gray-200 dark:bg-gray-700"></div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <CheckCircle size={12} />
                      Featured
                    </span>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleView(product)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleUpdate(product)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 border-2 border-gray-300 dark:border-gray-700 border-t-gray-900 dark:border-t-gray-400 rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Loading products...
                    </p>
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Package className="w-12 h-12 text-gray-300 dark:text-gray-700" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        No products found
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                    index % 2 === 0
                      ? 'bg-white dark:bg-gray-900'
                      : 'bg-gray-50/30 dark:bg-gray-800/30'
                  }`}
                >
                  {/* Product Info */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative flex-shrink-0">
                        {product.thumbnail ? (
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="rounded-lg object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          ID: {product.id?.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Brand */}
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {product.brand || '—'}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md">
                      {product.category || 'Uncategorized'}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatPrice(product.price)}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStockBadgeClass(
                        product.stock,
                      )}`}
                    >
                      {product.stock <= 0
                        ? 'Out of Stock'
                        : `${product.stock} units`}
                    </span>
                  </td>

                  {/* Featured */}
                  <td className="px-4 py-3 text-center">
                    {product.isFeatured ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full"></span>
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-gray-600">
                        —
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleView(product)}
                        className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="View product"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleUpdate(product)}
                        className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
