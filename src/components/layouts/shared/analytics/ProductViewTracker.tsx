'use client';

import { useEffect, useRef } from 'react';
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
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!productId) return;

    // Prevent duplicate firing for the same component instance
    if (hasTracked.current) return;

    hasTracked.current = true;

    trackViewItem({
      productId,
      productName,
      price: Number(price),
    });
  }, [productId, productName, price]);

  return null;
};

export default ProductViewTracker;
