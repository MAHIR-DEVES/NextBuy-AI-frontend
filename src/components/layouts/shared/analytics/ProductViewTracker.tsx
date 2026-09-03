'use client';

import { useEffect } from 'react';
import { trackViewItem } from './events';

interface ProductViewTrackerProps {
  productId: string;
  productName: string;
  price: number;
  category?: string;
  brand?: string;
}

const ProductViewTracker = ({
  productId,
  productName,
  price,
}: ProductViewTrackerProps) => {
  useEffect(() => {
    if (!productId) return;

    trackViewItem({
      productId,
      productName,
      price,
    });
  }, [productId, productName, price]);

  return null;
};

export default ProductViewTracker;
