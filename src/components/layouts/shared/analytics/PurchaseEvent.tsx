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
    category?: string;
  }[];
}
const PurchaseEvent = ({
  transactionId,
  value,
  shipping,
  items,
}: PurchaseEventProps) => {
  useEffect(() => {
    if (!transactionId || !items?.length) return;
    trackPurchase({
      transactionId,
      value,
      shipping,
      items: items.map(item => ({
        item_id: item.productId,
        item_name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        item_category: item.category,
      })),
    });
  }, [transactionId, value, shipping, items]);
  return null;
};
export default PurchaseEvent;
