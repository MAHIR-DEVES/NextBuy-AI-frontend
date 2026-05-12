/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Loader2,
  ShoppingCart,
  Trash2,
  Package,
  AlertCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { deleteWishlist, getMyWishlist } from '@/services/wishlist.service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type WishlistItem = {
  id: string;
  productId: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    slug: string;
    thumbnail: string;
    brand: string;
    category: string;
    price: number;
    discount: number;
    stock: number;
  };
};

// Skeleton Row Component for Desktop - Moved outside
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-5">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </td>
    <td className="px-6 py-5">
      <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
    </td>
    <td className="px-6 py-5">
      <div className="h-6 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
    </td>
    <td className="px-6 py-5">
      <div className="space-y-2">
        <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </td>
    <td className="px-6 py-5">
      <div className="h-6 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
    </td>
    <td className="px-6 py-5">
      <div className="flex items-center justify-center gap-2">
        <div className="h-9 w-9 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-9 w-9 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </td>
  </tr>
);

// Skeleton Card Component for Mobile - Moved outside
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
    <div className="relative aspect-square w-full bg-gray-200 dark:bg-gray-700"></div>
    <div className="p-5 space-y-3">
      <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-7 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-6 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="flex gap-3 pt-2">
        <div className="flex-1 h-11 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
        <div className="w-11 h-11 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  </div>
);

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // FETCH WISHLIST
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await getMyWishlist();
        setWishlist(res.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // DELETE WISHLIST
  const handleDeleteWishlist = async (wishlistId: string) => {
    try {
      setDeleteLoading(wishlistId);
      await deleteWishlist(wishlistId);
      setWishlist(prev => prev.filter(item => item.id !== wishlistId));
      toast.success('Successfully Remove Product From Wishlist !');
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Failed to remove wishlist';
      toast.error(message);
    } finally {
      setDeleteLoading(null);
    }
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className=" px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Header Section - Always visible */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <Heart className="h-6 w-6 sm:h-7 sm:w-7 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  Wishlist
                </h1>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-0.5">
                  {loading
                    ? 'Loading...'
                    : `${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'} saved`}
                </p>
              </div>
            </div>

            {!loading && wishlist.length > 0 && (
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                Browse More Products
              </Link>
            )}
          </div>
        </div>

        {/* Content Section - Loading shows skeletons, Empty shows empty state, Data shows wishlist */}
        {!loading && wishlist.length === 0 ? (
          // Empty State
          <div className="bg-white dark:bg-gray-800 rounded-xs shadow-sm border border-gray-200 dark:border-gray-700 py-16 sm:py-20 px-4">
            <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-5">
                <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Discover products you love and save them here for easy access
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-6 sm:px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="h-4 w-4" />
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="bg-white dark:bg-gray-800 rounded-xs shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Product
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Brand
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Category
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Price
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Stock
                        </th>
                        <th className="text-center px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {loading ? (
                        // Show 3 skeleton rows while loading
                        <>
                          <SkeletonRow />
                          <SkeletonRow />
                          <SkeletonRow />
                        </>
                      ) : (
                        // Show actual wishlist items
                        wishlist.map(item => {
                          const discountedPrice = calculateDiscountedPrice(
                            item.product.price,
                            item.product.discount,
                          );
                          const isOutOfStock = item.product.stock === 0;

                          return (
                            <tr
                              key={item.id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                            >
                              {/* PRODUCT */}
                              <td className="px-6 py-5">
                                <Link
                                  href={`/products/${item.product.slug}`}
                                  className="flex items-center gap-4"
                                >
                                  <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                                    <Image
                                      src={item.product.thumbnail}
                                      alt={item.product.name}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                                      {item.product.name}
                                    </h3>
                                    {item.product.discount > 0 && (
                                      <p className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 mt-1">
                                        <span className="bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                                          {item.product.discount}% OFF
                                        </span>
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              </td>

                              {/* BRAND */}
                              <td className="px-6 py-5">
                                <span className="text-gray-700 dark:text-gray-300">
                                  {item.product.brand}
                                </span>
                              </td>

                              {/* CATEGORY */}
                              <td className="px-6 py-5">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                  {item.product.category}
                                </span>
                              </td>

                              {/* PRICE */}
                              <td className="px-6 py-5">
                                <div className="flex flex-col">
                                  <span className="font-bold text-orange-500 dark:text-orange-400 text-lg">
                                    ${discountedPrice.toFixed(2)}
                                  </span>
                                  {item.product.discount > 0 && (
                                    <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                                      ${item.product.price.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* STOCK */}
                              <td className="px-6 py-5">
                                {!isOutOfStock ? (
                                  <span className="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-medium">
                                    <Package className="w-3 h-3" />
                                    In Stock
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2.5 py-1 rounded-full text-xs font-medium">
                                    <AlertCircle className="w-3 h-3" />
                                    Out of Stock
                                  </span>
                                )}
                              </td>

                              {/* ACTIONS */}
                              <td className="px-6 py-5">
                                <div className="flex items-center justify-center gap-2">
                                  {/* ADD TO CART */}
                                  <Link href={`/products/${item.productId}`}>
                                    {' '}
                                    <button
                                      className={`h-9 w-9 rounded-lg transition-all duration-200 flex items-center justify-center ${
                                        isOutOfStock
                                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                          : 'bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white shadow-sm hover:shadow'
                                      }`}
                                      title="Add to cart"
                                    >
                                      <ShoppingCart className="h-4 w-4" />
                                    </button>
                                  </Link>

                                  {/* DELETE */}
                                  <button
                                    onClick={() =>
                                      handleDeleteWishlist(item.id)
                                    }
                                    disabled={deleteLoading === item.id}
                                    className="h-9 w-9 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-500 dark:text-red-400 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                                    title="Remove from wishlist"
                                  >
                                    {deleteLoading === item.id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {loading ? (
                // Show 3 skeleton cards while loading
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                // Show actual wishlist items
                wishlist.map(item => {
                  const discountedPrice = calculateDiscountedPrice(
                    item.product.price,
                    item.product.discount,
                  );
                  const isOutOfStock = item.product.stock === 0;

                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-gray-800 rounded-xs shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300"
                    >
                      <Link href={`/products/${item.product.slug}`}>
                        <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-700">
                          <Image
                            src={item.product.thumbnail}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                          {item.product.discount > 0 && (
                            <div className="absolute top-3 left-3">
                              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                                {item.product.discount}% OFF
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="p-5">
                        {/* Product Info */}
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1 line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>

                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 mb-3">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.product.brand}
                          </span>
                          <span className="text-gray-300 dark:text-gray-600">
                            •
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            {item.product.category}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          {item.product.discount > 0 && (
                            <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                              ${item.product.price.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Stock Status */}
                        <div className="mb-4">
                          {!isOutOfStock ? (
                            <span className="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-lg text-xs font-medium">
                              <Package className="w-3 h-3" />
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2.5 py-1 rounded-lg text-xs font-medium">
                              <AlertCircle className="w-3 h-3" />
                              Out of Stock
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          {/* BUY NOW */}
                          <button
                            onClick={() =>
                              router.push(`/products/${item.product.slug}`)
                            }
                            className={`flex-1 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                              isOutOfStock
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                : 'bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white shadow-sm'
                            }`}
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Buy Now
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDeleteWishlist(item.id)}
                            disabled={deleteLoading === item.id}
                            className="px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-500 dark:text-red-400 transition-all duration-200 flex items-center justify-center"
                          >
                            {deleteLoading === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
