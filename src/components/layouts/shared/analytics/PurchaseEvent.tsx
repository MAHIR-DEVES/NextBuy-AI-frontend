'use client';

import { useEffect } from 'react';
import { trackPurchase } from './events';

interface PurchaseEventProps {
  transactionId: string;
  value: number;
  shipping: number;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

const PurchaseEvent = ({
  transactionId,
  value,
  shipping,
  items,
}: PurchaseEventProps) => {
  useEffect(() => {
    trackPurchase({
      transactionId,
      value,
      shipping,
      items: items.map(item => ({
        item_id: item.productId,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  }, [transactionId, value, shipping, items]);

  return null;
};

export default PurchaseEvent;
