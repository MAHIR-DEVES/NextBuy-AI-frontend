/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Heart, Loader2, ShoppingCart } from 'lucide-react';
import { createWishlist } from '@/services/wishlist.service';
import { useCartStore } from '@/store/cart.store';
import { IProduct } from '@/types/products.type';
import { getUser } from '@/utils/auth';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useOrderStore } from '@/store/order.store';
import { useProductStore } from '@/store/product.store';

type Props = {
  productId: string;
  product: IProduct;
};

const ProductActions = ({ productId, product }: Props) => {
  const [quantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const user = getUser();

  const router = useRouter();
  const pathname = usePathname();

  // Zustand Cart Store
  const addToCart = useCartStore(state => state.addToCart);
  const selectedColor = useProductStore(state => state.selectedColor);
  const selectedSize = useOrderStore(state => state.selectedSize);
  console.log(selectedColor, selectedSize);

  // Zustand Order Store
  const setSelectedProduct = useOrderStore(state => state.setSelectedProduct);

  // LOGIN CHECK
  const handleRequireLogin = () => {
    if (!user) {
      router.push(`/login?redirect=${pathname}`);
      return false;
    }

    return true;
  };

  // BUY NOW
  const handleBuyNow = () => {
    // if (product.colorVariants?.length > 0 && !selectedColor) {
    //   toast.error('দয়া করে একটি কালার নির্বাচন করুন।');
    //   return;
    // }
    if (product.colorVariants?.length > 0 && !selectedSize) {
      toast.error('দয়া করে একটি সাইজ নির্বাচন করুন।');
      return;
    }
    setSelectedProduct(product);

    router.push('/order-now');
  };

  // ADD TO CART
  const handleAddToCart = async () => {
    try {
      // if (product.colorVariants?.length > 0 && !selectedColor) {
      //   toast.error('দয়া করে একটি কালার নির্বাচন করুন।');
      //   return;
      // }
      if (product.colorVariants?.length > 0 && !selectedSize) {
        toast.error('দয়া করে একটি সাইজ নির্বাচন করুন।');
        return;
      }
      setLoading(true);

      addToCart(product, quantity, selectedSize || null, selectedColor || null);

      toast.success('Added to cart!');
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Products Add Failed!');
    } finally {
      setLoading(false);
    }
  };

  // ADD TO WISHLIST
  const handleAddWishlist = async () => {
    if (!handleRequireLogin()) return;

    try {
      setWishlistLoading(true);

      await createWishlist({
        productId,
      });

      toast.success('Added to wishlist!');
    } catch (error: any) {
      const message = error?.response?.data?.error || 'Failed to add wishlist';

      toast.error(message);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Buttons */}
      <div className="flex gap-2 sm:gap-3">
        {/* Add To Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={loading || wishlistLoading}
          className="
            flex-1
            border-2
            border-primary-light
            text-title
            py-2.5
            sm:py-3
            rounded-sm
            text-xs
            sm:text-sm
            font-semibold
            hover:bg-button-hover-1
            transition-colors
            flex
            items-center
            justify-center
            gap-1.5
            sm:gap-2
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
          ) : (
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          )}

          {loading ? 'Adding...' : 'Add to Cart'}
        </button>

        {/* Buy Now */}
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={loading || wishlistLoading}
          className="
            flex-1
            bg-button
            text-button-text
            py-2.5
            sm:py-3
            rounded-sm
            text-xs
            sm:text-sm
            font-semibold
            hover:bg-button-hover
            transition-colors
            disabled:opacity-50
            disabled:cursor-not-allowed
            cursor-pointer
          "
        >
          অর্ডার করুন
        </button>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleAddWishlist}
          disabled={wishlistLoading || loading}
          aria-label="Add to wishlist"
          className="
            w-11
            sm:w-14
            border-2
            border-primary-light
            text-title
            rounded-sm
            flex
            items-center
            justify-center
            hover:bg-button-hover-1
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {wishlistLoading ? (
            <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
          ) : (
            <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
