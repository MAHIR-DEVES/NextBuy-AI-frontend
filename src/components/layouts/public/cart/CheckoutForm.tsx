'use client';

import { createOrder } from '@/services/orders.service';
import { CartItem, useCartStore } from '@/store/cart.store';

import React, { useState } from 'react';
import { Loader2, MapPin, ShoppingBag, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type CheckoutFormProps = {
  subtotal: number;
  items: CartItem[];
};

const CheckoutForm = ({ subtotal, items }: CheckoutFormProps) => {
  const [insideDhaka, setInsideDhaka] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [thana, setThana] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  const { clearCart } = useCartStore.getState();

  // Shipping fee match in Backend
  const shippingFee = insideDhaka ? 90 : 130;
  const total = subtotal + shippingFee;

  // validation for  fields
  const validateForm = () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedDistrict = district.trim();
    const trimmedThana = thana.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName) {
      toast.warning('আপনার নাম লিখুন।');
      return false;
    }

    if (!trimmedPhone) {
      toast.warning('আপনার ফোন নম্বর লিখুন।');
      return false;
    }

    if (!/^01\d{9}$/.test(trimmedPhone)) {
      toast.warning('ফোন নম্বর অবশ্যই ১১ সংখ্যার হতে হবে।');
      return false;
    }

    if (!trimmedDistrict) {
      toast.warning('জেলা লিখুন।');
      return false;
    }

    if (!trimmedThana) {
      toast.warning('থানা লিখুন।');
      return false;
    }

    if (!trimmedAddress) {
      toast.warning('সম্পূর্ণ ঠিকানা লিখুন।');
      return false;
    }

    return true;
  };

  // ==============================
  // PLACE ORDER
  // ==============================

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!items || items.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    try {
      setLoading(true);

      const orderItems = items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: Number(item.product.specialPrice ?? item.product.price),
        quantity: item.quantity,
        size: item.size || null,
        color: item.color || null,
      }));

      const res = await createOrder({
        name,
        phone,
        district,
        thana,
        address,
        note: note || undefined,
        isInsideDhaka: insideDhaka,
        items: orderItems,
      });

      if (res?.data?.success) {
        toast.success('অর্ডার সফলভাবে সম্পন্ন হয়েছে!');
      }

      // order form backend response
      const orderId = res?.data?.id;

      if (orderId) {
        router.push(`/thank-you?orderId=${orderId}`);
      } else {
        toast.error('Order ID পাওয়া যায়নি।');
      }

      clearCart();

      setName('');
      setPhone('');
      setDistrict('');
      setThana('');
      setAddress('');
      setNote('');
      setInsideDhaka(true);
    } catch (error) {
      console.error('Order failed:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden border rounded-xs bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 px-3 py-5 sm:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-pink-50">
            <ShoppingBag className="h-5 w-5 text-pink-700" />
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
              Checkout Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter your delivery details to place your order.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleOrder} className="space-y-7 p-2.5 sm:p-7">
        {/* Customer Information */}
        <section>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900">
              Customer Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Please provide your contact information.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your full name"
                disabled={loading}
                className="h-11 w-full rounded-sm border border-gray-300 bg-white px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-pink-800 focus:ring-2 focus:ring-pink-800/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-70"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                disabled={loading}
                className="h-11 w-full rounded-sm border border-gray-300 bg-white px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-pink-800 focus:ring-2 focus:ring-pink-800/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-70"
              />
            </div>
          </div>
        </section>

        {/* Delivery Information */}
        <section className="border-t border-gray-200 pt-7">
          <div className="mb-4 flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-pink-50">
              <MapPin className="h-4 w-4 text-pink-700" />
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Delivery Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Where should we deliver your order?
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* District + Thana */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* District */}
              <div>
                <label
                  htmlFor="district"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  District
                </label>

                <input
                  id="district"
                  type="text"
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  placeholder="Enter your district"
                  disabled={loading}
                  className="h-11 w-full rounded-sm border border-gray-300 bg-white px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-pink-800 focus:ring-2 focus:ring-pink-800/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-70"
                />
              </div>

              {/* Thana */}
              <div>
                <label
                  htmlFor="thana"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Thana
                </label>

                <input
                  id="thana"
                  type="text"
                  value={thana}
                  onChange={e => setThana(e.target.value)}
                  placeholder="Enter your thana"
                  disabled={loading}
                  className="h-11 w-full rounded-sm border border-gray-300 bg-white px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-pink-800 focus:ring-2 focus:ring-pink-800/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-70"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Full Delivery Address
              </label>

              <textarea
                id="address"
                rows={4}
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="House/Road, area, landmark..."
                disabled={loading}
                className="w-full resize-none rounded-sm border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-pink-800 focus:ring-2 focus:ring-pink-800/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-70"
              />
            </div>
          </div>
        </section>

        {/* Shipping Area */}
        <section className="border-t border-gray-200 pt-7">
          <div className="mb-4 flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-pink-50">
              <Truck className="h-4 w-4 text-pink-700" />
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Shipping Area
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Select your delivery location.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Inside Dhaka */}
            <label
              className={`cursor-pointer rounded-sm border p-4 transition-all duration-200 ${
                insideDhaka
                  ? 'border-[#ad1a60] bg-[#fff0f5] shadow-sm'
                  : 'border-gray-200 bg-white hover:border-[#d8255d]/40 hover:bg-[#fff7f9]'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingArea"
                    checked={insideDhaka}
                    onChange={() => setInsideDhaka(true)}
                    disabled={loading}
                    className="h-4 w-4 accent-[#ad1a60]"
                  />

                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        insideDhaka ? 'text-[#ad1a60]' : 'text-gray-900'
                      }`}
                    >
                      Inside Dhaka
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Dhaka city delivery
                    </p>
                  </div>
                </div>

                <span
                  className={`text-sm font-semibold ${
                    insideDhaka ? 'text-[#ad1a60]' : 'text-gray-900'
                  }`}
                >
                  ৳90
                </span>
              </div>
            </label>

            {/* Outside Dhaka */}
            <label
              className={`cursor-pointer rounded-sm border p-4 transition-all duration-200 ${
                !insideDhaka
                  ? 'border-[#ad1a60] bg-[#fff0f5] shadow-sm'
                  : 'border-gray-200 bg-white hover:border-[#d8255d]/40 hover:bg-[#fff7f9]'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingArea"
                    checked={!insideDhaka}
                    onChange={() => setInsideDhaka(false)}
                    disabled={loading}
                    className="h-4 w-4 accent-[#ad1a60]"
                  />

                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        !insideDhaka ? 'text-[#ad1a60]' : 'text-gray-900'
                      }`}
                    >
                      Outside Dhaka
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Nationwide delivery
                    </p>
                  </div>
                </div>

                <span
                  className={`text-sm font-semibold ${
                    !insideDhaka ? 'text-[#ad1a60]' : 'text-gray-900'
                  }`}
                >
                  ৳130
                </span>
              </div>
            </label>
          </div>
        </section>

        {/* Order Note */}
        <section className="border-t border-gray-200 pt-7">
          <label
            htmlFor="note"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Order Note{' '}
            <span className="font-normal text-gray-400">(Optional)</span>
          </label>

          <textarea
            id="note"
            rows={3}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Any special instruction for your order?"
            disabled={loading}
            className="w-full resize-none rounded-sm border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-pink-800 focus:ring-2 focus:ring-pink-800/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-70"
          />
        </section>

        {/* Order Summary */}
        <section className="rounded-sm border border-gray-200 bg-gray-50 p-5">
          <h3 className="mb-4 text-base font-semibold text-gray-900">
            Order Summary
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>

              <span className="font-medium text-gray-900">
                ৳{subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Shipping</span>

              <span className="font-medium text-gray-900">
                ৳{shippingFee.toFixed(2)}
              </span>
            </div>

            <div className="my-3 border-t border-gray-200" />

            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-gray-900">
                Total
              </span>

              <span className="text-xl font-bold text-gray-900">
                ৳{total.toFixed(2)}
              </span>
            </div>
          </div>
        </section>

        {/* Place Order */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-gradient-primary hover:bg-gradient-primary-hover px-5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              PLACING ORDER...
            </>
          ) : (
            'PLACE ORDER'
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          By placing your order, you agree to our order and delivery terms.
        </p>
      </form>
    </div>
  );
};

export default CheckoutForm;
