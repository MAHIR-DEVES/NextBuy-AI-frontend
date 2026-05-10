// src/components/layouts/admin/products/ProductsTable.tsx

'use client';

import Image from 'next/image';
import { Eye, Edit2, Trash2, Package, AlertCircle } from 'lucide-react';
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
    if (stock <= 0) return 'bg-red-100 text-red-700';
    if (stock <= 10) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Product
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Brand
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Featured
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-500">Loading products...</p>
                </div>
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <Package className="w-12 h-12 text-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      No products found
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
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
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
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
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        ID: {product.id?.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                </td>

                {/* Brand */}
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-700">
                    {product.brand || '—'}
                  </span>
                </td>

                {/* Category */}
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                    {product.category || 'Uncategorized'}
                  </span>
                </td>

                {/* Price */}
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-semibold text-gray-900">
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
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      Featured
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleView(product)}
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View product"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleUpdate(product)}
                      className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Edit product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
  );
};

export default ProductsTable;
