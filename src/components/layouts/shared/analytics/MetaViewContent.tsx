'use client';

import { useEffect, useRef } from 'react';

interface MetaViewContentProps {
  productId: string;
  productName: string;
  price: number;
  categoryName?: string;
}

const MetaViewContent = ({
  productId,
  productName,
  price,
  categoryName,
}: MetaViewContentProps) => {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;

    if (typeof window === 'undefined' || !window.fbq) {
      return;
    }

    tracked.current = true;

    window.fbq('track', 'ViewContent', {
      content_ids: [productId],
      content_name: productName,
      content_type: 'product',
      content_category: categoryName || 'Product',
      value: Number(price),
      currency: 'BDT',
      num_items: 1,
    });
  }, [productId, productName, price, categoryName]);

  return null;
};

export default MetaViewContent;
