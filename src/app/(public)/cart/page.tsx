'use client';

import React, { useEffect, useState } from 'react';
import { HeartIcon, Loader2, Minus, Plus, Trash2 } from 'lucide-react';

import {
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from '@/services/cart.service';
import { useCartStore } from '@/store/cart.store';
import CheckoutForm from '@/components/layouts/public/cart/CheckoutForm';
import { CartItem } from '@/types/cart.type';

const CartPage = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  console.log(items);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const decrease = useCartStore(state => state.decrease);

  // fetch cart
  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await getCartItems();

      setItems(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // increase quantity
  const handleIncrease = async (cartId: string, currentQty: number) => {
    try {
      setUpdatingId(cartId);

      await updateCartItem(cartId, currentQty + 1);

      setItems(prev =>
        prev.map(item =>
          item.id === cartId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // decrease quantity
  const handleDecrease = async (cartId: string, currentQty: number) => {
    if (currentQty <= 1) return;

    try {
      setUpdatingId(cartId);

      await updateCartItem(cartId, currentQty - 1);

      setItems(prev =>
        prev.map(item =>
          item.id === cartId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        ),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // delete item
  const handleDelete = async (cartId: string) => {
    try {
      setUpdatingId(cartId);

      // find item before delete
      const deletedItem = items.find(item => item.id === cartId);

      await deleteCartItem(cartId);

      // remove from ui
      setItems(prev => prev.filter(item => item.id !== cartId));

      // update zustand count
      if (deletedItem) {
        decrease(deletedItem.quantity);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // subtotal
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
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
              {loading ? (
                <>
                  <div>
                    {[1, 2].map((_, index) => (
                      <div key={index} className="p-4 border-b animate-pulse">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          {/* LEFT */}
                          <div className="flex gap-4 flex-1">
                            {/* Image skeleton */}
                            <div className="w-28 h-28 bg-gray-200 rounded flex-shrink-0" />

                            {/* Info skeleton */}
                            <div className="space-y-3 w-full">
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>

                          {/* Price skeleton */}
                          <div className="flex items-center gap-3">
                            <div className="h-6 w-16 bg-gray-200 rounded"></div>
                            <div className="h-5 w-10 bg-gray-200 rounded"></div>
                          </div>

                          {/* Actions skeleton */}
                          <div className="flex items-center gap-4">
                            <div className="w-6 h-6 bg-gray-200 rounded"></div>
                            <div className="w-6 h-6 bg-gray-200 rounded"></div>
                          </div>

                          {/* Quantity skeleton */}
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-200 rounded"></div>
                            <div className="w-6 h-4 bg-gray-200 rounded"></div>
                            <div className="w-9 h-9 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : items.length === 0 ? (
                /* EMPTY STATE (only after loading) */
                <div className="p-10 text-center">
                  <h2 className="text-2xl font-semibold text-gray-700">
                    Your cart is empty
                  </h2>
                </div>
              ) : (
                <>
                  <div>
                    {items.map((item, index) => (
                      <div
                        key={item.id}
                        className={`p-4 ${
                          index !== items.length - 1 ? 'border-b' : ''
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          {/* LEFT */}
                          <div className="flex gap-3 flex-1 min-w-0">
                            {/* Image */}
                            <div className="w-24 h-24 sm:w-28 sm:h-28 border rounded-lg overflow-hidden shrink-0">
                              <img
                                src={item.product.thumbnail}
                                alt={item.product.name}
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
                                  <span className="text-orange-500 text-lg sm:text-xl font-semibold">
                                    ${item.product.price}
                                  </span>

                                  {item.product.discount > 0 && (
                                    <span className="bg-orange-100 text-orange-500 text-[10px] sm:text-xs px-2 py-1 rounded hidden md:block">
                                      -{item.product.discount}%
                                    </span>
                                  )}
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center gap-2">
                                  <button
                                    disabled={updatingId === item.id}
                                    onClick={() =>
                                      handleDecrease(item.id, item.quantity)
                                    }
                                    className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-100 transition"
                                  >
                                    <Minus size={14} />
                                  </button>

                                  <span className="font-medium min-w-[20px] text-center">
                                    {updatingId === item.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      item.quantity
                                    )}
                                  </span>

                                  <button
                                    disabled={updatingId === item.id}
                                    onClick={() =>
                                      handleIncrease(item.id, item.quantity)
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
                                    onClick={() => handleDelete(item.id)}
                                    className="text-gray-400 hover:text-red-500 transition"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
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

              <button className="bg-sky-500 hover:bg-sky-600 text-white px-5 rounded transition">
                APPLY
              </button>
            </div>

            {/* total */}
            <div className="flex justify-between pt-5 border-t text-lg font-semibold">
              <span>Total</span>

              <span className="text-orange-500">$ {subtotal}</span>
            </div>
            {showCheckout ? (
              ''
            ) : (
              <>
                {' '}
                {/* button */}
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-md font-medium"
                >
                  PROCEED TO CHECKOUT ({items.length})
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
