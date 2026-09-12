'use client';

import { useState } from 'react';
import { Heart, Loader2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { addToCart } from '@/services/cart.service';
import { createWishlist } from '@/services/wishlist.service';
import { useCartStore } from '@/store/cart.store';
import { IProduct } from '@/types/products.type';
import { getUser } from '@/utils/auth';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useOrderStore } from '@/store/order.store';
import { trackAddToCart } from '../../shared/analytics/events';
import { useProductStore } from '@/store/product.store';

type Props = {
  productId: string;
  product: IProduct;
};

const ProductActions = ({ productId, product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const user = getUser();

  const router = useRouter();
  const pathname = usePathname();

  const increase = useCartStore(state => state.increase);

  // LOGIN CHECK
  const handleRequireLogin = () => {
    if (!user) {
      router.push(`/login?redirect=${pathname}`);
      return false;
    }

    return true;
  };

  const setSelectedProduct = useOrderStore(state => state.setSelectedProduct);
  const selectedSize = useOrderStore(state => state.selectedSize);
  const selectedColor = useProductStore(state => state.selectedColor);

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
    if (!handleRequireLogin()) return;
    try {
      setLoading(true);

      await addToCart(productId, quantity);

      trackAddToCart({
        productId: product.id,
        productName: product.name,
        price: Number(product.specialPrice ?? product.price),
        quantity,
        category: product.category?.name || '',
        brand: product.brand || '',
        variant: selectedSize
          ? `${selectedSize}${product.colorVariants?.length ? ` ${selectedSize}` : ''}`
          : '',
        size: selectedSize || '',
        color: '',
      });

      increase(quantity);
      toast.success('Added to cart!');
    } catch (error) {
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

      setWishlistLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to add wishlist';
      toast.error(message);

      setWishlistLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity */}
      {/* <div>
        <span className="text-sm text-gray-600 block mb-2">Quantity</span>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="w-12 text-center font-semibold text-lg">
            {quantity}
          </span>

          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div> */}

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
