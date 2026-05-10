'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { addToCart } from '@/services/cart.service';
import { useCartStore } from '@/store/cart.store';
import { IProduct } from '@/types/products.type';
import BuyNowModal from '../modals/BuyNowModal';
import { getUser } from '@/utils/auth';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  productId: string;
  product: IProduct;
};

const ProductActions = ({ productId, product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
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

  const handleAddToCart = async () => {
    if (!handleRequireLogin()) return;
    try {
      setLoading(true);

      const res = await addToCart(productId, quantity);
      increase(quantity);
      console.log(res);

      alert('Added to cart!');
    } catch (error) {
      console.log(error);
      alert('Failed to add to cart');
    } finally {
      setLoading(false);
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
            className="w-8 h-8 border rounded-lg flex items-center justify-center"
          >
            <Minus className="h-3 w-3" />
          </button>

          <span className="w-12 text-center font-semibold">{quantity}</span>

          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-8 h-8 border rounded-lg flex items-center justify-center"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setOpen(true)}
          disabled={loading}
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          Buy Now
        </button>

        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="flex-1 border-2 border-orange-500 text-orange-500 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4" />
          {loading ? 'Adding...' : 'Add to Cart'}
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
