'use client';

import React, { useState } from 'react';
import { HeartIcon, Loader2, Minus, Plus, Trash2 } from 'lucide-react';

import { useCartStore } from '@/store/cart.store';
import CheckoutForm from '@/components/layouts/public/cart/CheckoutForm';
import Image from 'next/image';

const CartPage = () => {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // Zustand cart store
  const items = useCartStore(state => state.items);
  const increase = useCartStore(state => state.increase);
  const decrease = useCartStore(state => state.decrease);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  // Increase quantity
  const handleIncrease = async (productId: string) => {
    try {
      setUpdatingId(productId);

      increase(productId);
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Decrease quantity
  const handleDecrease = async (productId: string, currentQty: number) => {
    if (currentQty <= 1) return;

    try {
      setUpdatingId(productId);

      decrease(productId);
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete item
  const handleDelete = async (productId: string) => {
    try {
      setUpdatingId(productId);

      removeFromCart(productId);
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Subtotal
  const subtotal = items.reduce(
    (acc, item) =>
      acc + (item.product.specialPrice ?? item.product.price) * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}

        {!showCheckout && (
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-xs overflow-hidden">
              {/* Header */}
              <div className="p-4 flex items-center justify-between border-b">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium">
                    SELECT ITEMS ({items.length} ITEMS)
                  </p>
                </div>
              </div>

              {/* Products */}
              {items.length === 0 ? (
                /* EMPTY STATE */
                <div className="p-10 text-center">
                  <h2 className="text-2xl font-semibold text-gray-700">
                    Your cart is empty
                  </h2>
                </div>
              ) : (
                <div>
                  {items.map((item, index) => {
                    const productPrice =
                      item.product.specialPrice ?? item.product.price;

                    return (
                      <div
                        key={item.product.id}
                        className={`p-4 ${
                          index !== items.length - 1 ? 'border-b' : ''
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          {/* LEFT */}
                          <div className="flex gap-3 flex-1 min-w-0">
                            {/* Image */}
                            <div className="w-24 h-24 sm:w-28 sm:h-28 border rounded-lg overflow-hidden shrink-0">
                              <Image
                                src={item.product.thumbnail}
                                alt={item.product.name}
                                width={112}
                                height={112}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Info + All Actions */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div>
                                <h2 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 line-clamp-2">
                                  {item.product.name}
                                </h2>

                                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                  {item.product.brand}
                                </p>
                              </div>

                              {/* Bottom Row */}
                              <div className="flex items-center justify-between flex-wrap gap-3 mt-4">
                                {/* Price */}
                                <div className="flex items-center gap-2">
                                  <span className="text-title text-lg sm:text-xl font-semibold">
                                    ${productPrice}
                                  </span>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center gap-2">
                                  <button
                                    disabled={updatingId === item.product.id}
                                    onClick={() =>
                                      handleDecrease(
                                        item.product.id,
                                        item.quantity,
                                      )
                                    }
                                    className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-100 transition"
                                  >
                                    <Minus size={14} />
                                  </button>

                                  <span className="font-medium min-w-[20px] text-center flex justify-center">
                                    {updatingId === item.product.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      item.quantity
                                    )}
                                  </span>

                                  <button
                                    disabled={updatingId === item.product.id}
                                    onClick={() =>
                                      handleIncrease(item.product.id)
                                    }
                                    className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-100 transition"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3">
                                  <button className="text-gray-400 hover:text-pink-500 transition">
                                    <HeartIcon size={18} />
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleDelete(item.product.id)
                                    }
                                    disabled={updatingId === item.product.id}
                                    className="text-gray-400 hover:text-red-500 transition disabled:opacity-50"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHECKOUT FORM */}
        {showCheckout && (
          <div className="lg:col-span-2">
            <CheckoutForm subtotal={subtotal} items={items} />
          </div>
        )}

        {/* RIGHT SIDE */}
        <div className="bg-white border rounded-xs p-5 h-fit sticky top-24">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-5">
            {/* subtotal */}
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({items.length} items)</span>

              <span>$ {subtotal}</span>
            </div>

            {/* shipping */}
            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee</span>

              <span>$ 0</span>
            </div>

            {/* voucher */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Voucher Code"
                className="flex-1 border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              />

              <button className="bg-chart-2 hover:bg-chart-1 cursor-pointer text-white px-5 rounded transition">
                APPLY
              </button>
            </div>

            {/* total */}
            <div className="flex justify-between pt-5 border-t text-lg font-semibold">
              <span>Total</span>

              <span className="text-title">$ {subtotal}</span>
            </div>

            {/* button */}
            {!showCheckout && (
              <button
                onClick={() => setShowCheckout(true)}
                disabled={items.length === 0}
                className="w-full bg-button hover:bg-button-hover transition text-white py-3 rounded-md font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                PROCEED TO CHECKOUT ({items.length})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
