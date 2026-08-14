'use client';

import BuyNow from '@/components/layouts/public/order/BuyNow';
import { useOrderStore } from '@/store/order.store';

const OrderNowPage = () => {
  const product = useOrderStore(state => state.selectedProduct);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-semibold text-gray-800">
          No product selected
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Please select a product first.
        </p>
      </div>
    );
  }

  return <BuyNow product={product} />;
};

export default OrderNowPage;
