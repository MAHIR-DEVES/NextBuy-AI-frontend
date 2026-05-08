'use client';

import { createOrder } from '@/services/orders.service';
import { useCartStore } from '@/store/cart.store';
import { CartItem } from '@/types/cart.type';
import React, { useState } from 'react';

const CheckoutForm = ({
  subtotal,
  items,
}: {
  subtotal: number;
  items: CartItem[];
}) => {
  const [insideDhaka, setInsideDhaka] = useState(true);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const { reset, fetchCart } = useCartStore.getState();

  const shippingFee = insideDhaka ? 60 : 120;

  // PLACE ORDER
  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await createOrder({
        items,
        name,
        phone,
        address,
        isInsideDhaka: insideDhaka,
      });

      console.log('Order Success:', res);

      alert('Order placed successfully!');
      // state update
      reset();
      fetchCart();
      // reset form
      setName('');
      setPhone('');
      setAddress('');
    } catch (err) {
      console.log(err);
      alert('Order failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-xs p-6">
      <h2 className="text-2xl font-semibold mb-6">Checkout Information</h2>

      <form onSubmit={handleOrder} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Full Name</label>

          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 text-sm font-medium">Phone Number</label>

          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full border rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="01XXXXXXXXX"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-2 text-sm font-medium">Address</label>

          <textarea
            rows={4}
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full border rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your address"
            required
          />
        </div>

        {/* Shipping */}
        <div>
          <label className="block mb-3 text-sm font-medium">
            Shipping Area
          </label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={insideDhaka}
                onChange={() => setInsideDhaka(true)}
              />
              Inside Dhaka
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={!insideDhaka}
                onChange={() => setInsideDhaka(false)}
              />
              Outside Dhaka
            </label>
          </div>
        </div>

        {/* Summary */}
        <div className="border-t pt-5 space-y-2">
          <div className="flex justify-between">
            <span>Items</span>
            <span>${subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shippingFee}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-orange-500">${subtotal + shippingFee}</span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-md disabled:opacity-50"
        >
          {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
