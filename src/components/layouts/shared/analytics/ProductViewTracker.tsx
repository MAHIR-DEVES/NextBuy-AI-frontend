'use client';

import { useEffect } from 'react';
import { trackViewItem } from './events';

interface ProductViewTrackerProps {
  productId: string;
  productName: string;
  price: number;
  category?: string;
}

const ProductViewTracker = ({
  productId,
  productName,
  price,
  category,
}: ProductViewTrackerProps) => {
  useEffect(() => {
    trackViewItem({
      productId,
      productName,
      price,
      category,
    });
  }, [productId, productName, price, category]);

  return null;
};

export default ProductViewTracker;
