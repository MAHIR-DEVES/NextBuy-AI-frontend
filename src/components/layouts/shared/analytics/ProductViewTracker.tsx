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
  category,
  brand,
}: ProductViewTrackerProps) => {
  useEffect(() => {
    console.log('🔥 ProductViewTracker mounted');
    trackViewItem({
      productId,
      productName,
      price,
      category,
      brand,
    });
  }, [productId, productName, price, category, brand]);

  return null;
};

export default ProductViewTracker;
