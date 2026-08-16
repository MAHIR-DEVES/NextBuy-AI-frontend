'use client';

import { useEffect, useRef } from 'react';

interface MetaInitiateCheckoutProps {
  value: number;
  numItems: number;
  contentIds: string[];
}

const MetaInitiateCheckout = ({
  value,
  numItems,
  contentIds,
}: MetaInitiateCheckoutProps) => {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;

    if (typeof window === 'undefined' || !window.fbq) {
      return;
    }

    tracked.current = true;

    window.fbq('track', 'InitiateCheckout', {
      content_ids: contentIds,
      content_type: 'product',
      value: Number(value),
      currency: 'BDT',
      num_items: numItems,
    });
  }, [value, numItems, contentIds]);

  return null;
};

export default MetaInitiateCheckout;
