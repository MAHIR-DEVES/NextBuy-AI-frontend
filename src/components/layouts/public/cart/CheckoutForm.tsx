'use client';

import { createOrder } from '@/services/orders.service';
import { useCartStore } from '@/store/cart.store';
import React, { useState } from 'react';
import { toast } from 'sonner';

type CheckoutFormProps = {
  subtotal: number;
};

const CheckoutForm = ({ subtotal }: CheckoutFormProps) => {
  const [insideDhaka, setInsideDhaka] = useState(true);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [thana, setThana] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  const { reset, fetchCart } = useCartStore.getState();

  // shipping fee match in Backend
  const shippingFee = insideDhaka ? 90 : 130;

  const total = subtotal + shippingFee;

  // ==============================
  // PLACE ORDER
  // ==============================

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createOrder({
        name,
        phone,
        district,
        thana,
        address,
        note: note || undefined,
        isInsideDhaka: insideDhaka,
      });

      toast.success('Order placed successfully!');

      // Clear cart state
      reset();

      // Refresh cart
      await fetchCart();

      // Reset form
      setName('');
      setPhone('');
      setDistrict('');
      setThana('');
      setAddress('');
      setNote('');
      setInsideDhaka(true);
    } catch (error) {
      console.error('Order failed:', error);

      toast.error('Order failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <h2 className="mb-6 text-2xl font-semibold text-title">
        Checkout Information
      </h2>

      <form onSubmit={handleOrder} className="space-y-5">
        {/* ==============================
            NAME
        ============================== */}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-title"
          >
            Full Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your full name"
            required
            disabled={loading}
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-title outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* ==============================
            PHONE
        ============================== */}

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-title"
          >
            Phone Number
          </label>

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="01XXXXXXXXX"
            required
            disabled={loading}
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-title outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* ==============================
            DISTRICT
        ============================== */}

        <div>
          <label
            htmlFor="district"
            className="mb-2 block text-sm font-medium text-title"
          >
            District
          </label>

          <input
            id="district"
            type="text"
            value={district}
            onChange={e => setDistrict(e.target.value)}
            placeholder="Enter your district"
            required
            disabled={loading}
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-title outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* ==============================
            THANA
        ============================== */}

        <div>
          <label
            htmlFor="thana"
            className="mb-2 block text-sm font-medium text-title"
          >
            Thana
          </label>

          <input
            id="thana"
            type="text"
            value={thana}
            onChange={e => setThana(e.target.value)}
            placeholder="Enter your thana"
            required
            disabled={loading}
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-title outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* ==============================
            ADDRESS
        ============================== */}

        <div>
          <label
            htmlFor="address"
            className="mb-2 block text-sm font-medium text-title"
          >
            Full Address
          </label>

          <textarea
            id="address"
            rows={4}
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Enter your full delivery address"
            required
            disabled={loading}
            className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-title outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* ==============================
            NOTE
        ============================== */}

        <div>
          <label
            htmlFor="note"
            className="mb-2 block text-sm font-medium text-title"
          >
            Order Note{' '}
            <span className="font-normal text-muted-foreground">
              (Optional)
            </span>
          </label>

          <textarea
            id="note"
            rows={3}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Any special instruction?"
            disabled={loading}
            className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-title outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* ==============================
            SHIPPING AREA
        ============================== */}

        <div>
          <label className="mb-3 block text-sm font-medium text-title">
            Shipping Area
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Inside Dhaka */}

            <label
              className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 transition ${
                insideDhaka
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="shippingArea"
                checked={insideDhaka}
                onChange={() => setInsideDhaka(true)}
                disabled={loading}
                className="h-4 w-4 accent-[var(--primary)]"
              />

              <div>
                <p className="font-medium text-title">Inside Dhaka</p>
                <p className="text-sm text-muted-foreground">৳90</p>
              </div>
            </label>

            {/* Outside Dhaka */}

            <label
              className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 transition ${
                !insideDhaka
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="shippingArea"
                checked={!insideDhaka}
                onChange={() => setInsideDhaka(false)}
                disabled={loading}
                className="h-4 w-4 accent-[var(--primary)]"
              />

              <div>
                <p className="font-medium text-title">Outside Dhaka</p>
                <p className="text-sm text-muted-foreground">৳130</p>
              </div>
            </label>
          </div>
        </div>

        {/* ==============================
            ORDER SUMMARY
        ============================== */}

        <div className="space-y-3 border-t border-border pt-5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>

            <span className="font-medium text-title">
              ৳{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>

            <span className="font-medium text-title">
              ৳{shippingFee.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between border-t border-border pt-3 text-lg font-semibold">
            <span className="text-title">Total</span>

            <span className="text-primary">৳{total.toFixed(2)}</span>
          </div>
        </div>

        {/* ==============================
            PLACE ORDER BUTTON
        ============================== */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-button py-3 font-semibold text-button-text transition-colors hover:bg-button-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
