'use client';

import { useState } from 'react';
import { Heart, Loader2, Minus, Plus, ShoppingCart } from 'lucide-react';

import { addToCart } from '@/services/cart.service';
import { createWishlist } from '@/services/wishlist.service';

import { useCartStore } from '@/store/cart.store';
import { IProduct } from '@/types/products.type';

import BuyNowModal from '../modals/BuyNowModal';

import { getUser } from '@/utils/auth';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Props = {
  productId: string;
  product: IProduct;
};

const ProductActions = ({ productId, product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

  // ADD TO CART
  const handleAddToCart = async () => {
    if (!handleRequireLogin()) return;

    try {
      setLoading(true);

      // await addToCart(productId, quantity);

      increase(quantity);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Products Add Failed!');
    } finally {
      setLoading(false);
    }
  };

  // BUY NOW
  const handleOrderBtn = () => {
    if (!handleRequireLogin()) return;

    setOpen(true);
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
      <div>
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
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        {/* Buy Now */}
        <button
          onClick={handleOrderBtn}
          disabled={loading || wishlistLoading}
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          Buy Now
        </button>

        {/* Add To Cart */}
        <button
          onClick={handleAddToCart}
          disabled={loading || wishlistLoading}
          className="flex-1 border-2 border-orange-500 text-orange-500 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}

          {loading ? 'Adding...' : 'Add to Cart'}
        </button>

        {/* Wishlist */}
        <button
          onClick={handleAddWishlist}
          disabled={wishlistLoading || loading}
          className="w-14 border-2 border-pink-500 text-pink-500 rounded-lg flex items-center justify-center hover:bg-pink-50 transition disabled:opacity-50"
        >
          {wishlistLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Heart className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* MODAL */}
      <BuyNowModal
        open={open}
        onClose={() => setOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductActions;
