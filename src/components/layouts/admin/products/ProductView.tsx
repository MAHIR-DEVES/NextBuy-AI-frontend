// src/components/modules/products/ProductView.tsx

import Image from 'next/image';
import {
  Package,
  Tag,
  DollarSign,
  Box,
  Star,
  Award,
  CheckCircle,
  XCircle,
  ShoppingBag,
  Info,
  AlertCircle,
} from 'lucide-react';
import { IProduct } from '@/types/products.type';

const ProductView = ({ product }: { product: IProduct | null }) => {
  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const calculateDiscountedPrice = (
    price: number,
    discount: number | undefined,
  ) => {
    if (!discount || discount <= 0) return null;
    return price - (price * discount) / 100;
  };

  const getStockStatus = (stock: number) => {
    if (stock <= 0) {
      return {
        text: 'Out of Stock',
        color: 'text-red-600 dark:text-red-400',
        bg: 'bg-red-100 dark:bg-red-900/30',
        icon: XCircle,
      };
    }
    if (stock <= 10) {
      return {
        text: 'Low Stock',
        color: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        icon: AlertCircle,
      };
    }
    return {
      text: 'In Stock',
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30',
      icon: CheckCircle,
    };
  };

  const stockStatus = getStockStatus(product.stock);
  const StockIcon = stockStatus.icon;
  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discount,
  );
  const hasDiscount = product.discount && product.discount > 0;

  return (
    <div className="space-y-6">
      {/* Product Image Section */}
      <div className="flex justify-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.name}
                width={250}
                height={250}
                className="rounded-xl object-cover w-64 h-64"
              />
            ) : (
              <div className="w-64 h-64 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Package className="w-20 h-20 text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Title & Description */}
      <div className="text-center border-b border-gray-100 dark:border-gray-800 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h2>
        <div className="flex items-center justify-center gap-3 mb-3">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {product.rating || '4.5'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({product.reviewCount || 0} reviews)
            </span>
          </div>
          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <Award className="w-3 h-3 text-orange-600 dark:text-orange-400" />
              <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                Featured
              </span>
            </div>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
          {product.description || 'No description available for this product.'}
        </p>
      </div>

      {/* Product Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
            <Tag className="w-4 h-4 text-orange-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Brand</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {product.brand || 'N/A'}
            </p>
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
            <Box className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {product.category || 'Uncategorized'}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
            <DollarSign className="w-4 h-4 text-green-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
            <div className="flex items-center gap-2 flex-wrap">
              {hasDiscount ? (
                <>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    {formatPrice(discountedPrice!)}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </p>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    -{product.discount}%
                  </span>
                </>
              ) : (
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className={`p-2 bg-white dark:bg-gray-700 rounded-lg`}>
            <ShoppingBag className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Stock Status
            </p>
            <div className="flex items-center gap-1">
              <StockIcon className={`w-4 h-4 ${stockStatus.color}`} />
              <p className={`text-sm font-medium ${stockStatus.color}`}>
                {stockStatus.text}
              </p>
              {product.stock > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  ({product.stock} units)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-orange-500" />
          Product Information
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-1">
            <span className="text-gray-500 dark:text-gray-400">Product ID</span>
            <span className="text-gray-900 dark:text-white font-mono text-xs">
              {product.id?.slice(0, 12)}...
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-500 dark:text-gray-400">Slug</span>
            <span className="text-gray-900 dark:text-white text-xs">
              {product.slug || 'N/A'}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-500 dark:text-gray-400">Created</span>
            <span className="text-gray-900 dark:text-white text-xs">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Stock Progress Bar (if in stock and stock <= 50) */}
      {product.stock > 0 && product.stock <= 50 && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">
              Stock Level
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              {product.stock} units left
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(product.stock / 100) * 100}%` }}
            />
          </div>
          {product.stock <= 10 && (
            <p className="text-xs text-yellow-600 dark:text-yellow-400 text-center">
              ⚠️ Low stock! Order soon.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductView;
