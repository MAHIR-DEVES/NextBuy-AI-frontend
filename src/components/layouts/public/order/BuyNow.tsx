'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Phone,
  User,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

import { IProduct } from '@/types/products.type';
import { singleOrder } from '@/services/orders.service';
import { useRouter } from 'next/navigation';

interface BuyNowProps {
  product: IProduct;
}

const BuyNow = ({ product }: BuyNowProps) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    district: '',
    thana: '',
    address: '',
    note: '',
    isInsideDhaka: true,
  });

  // Updated delivery fee structure (Inside Dhaka: ৳90, Outside Dhaka: ৳130)
  const shippingFee = form.isInsideDhaka ? 90 : 130;

  // Determine effective unit price (uses specialPrice if valid, falls back to regular price)
  const unitPrice =
    product.specialPrice && product.specialPrice > 0
      ? product.specialPrice
      : product.price;

  const hasDiscount =
    product.specialPrice &&
    product.specialPrice > 0 &&
    product.specialPrice < product.price;

  const discountAmount = hasDiscount ? product.price - unitPrice : 0;

  const subtotal = useMemo(() => {
    return unitPrice * quantity;
  }, [unitPrice, quantity]);

  const totalPrice = subtotal + shippingFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityDecrease = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleQuantityIncrease = () => {
    if (quantity >= product.stock) {
      toast.error('সর্বোচ্চ মজুদ সীমায় পৌঁছেছেন।');
      return;
    }

    setQuantity(prev => prev + 1);
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error('আপনার নাম লিখুন।');
      return false;
    }

    if (!form.phone.trim()) {
      toast.error('আপনার ফোন নম্বর লিখুন।');
      return false;
    }

    if (!/^01\d{9}$/.test(form.phone.trim())) {
      toast.error('ফোন নম্বর অবশ্যই ১১ সংখ্যার হতে হবে।');
      return false;
    }

    if (!form.district.trim()) {
      toast.error('জেলা নির্বাচন করুন বা লিখুন।');
      return false;
    }

    if (!form.thana.trim()) {
      toast.error('থানা লিখুন।');
      return false;
    }

    if (!form.address.trim()) {
      toast.error('সম্পূর্ণ ঠিকানা লিখুন।');
      return false;
    }

    if (quantity <= 0) {
      toast.error('কমপক্ষে ১টি পণ্য নির্বাচন করুন।');
      return false;
    }

    if (product.stock <= 0) {
      toast.error('দুঃখিত, এই পণ্যটি বর্তমানে স্টকে নেই।');
      return false;
    }

    if (quantity > product.stock) {
      toast.error('নির্বাচিত পরিমাণ স্টকের চেয়ে বেশি।');
      return false;
    }

    return true;
  };

  const handleOrder = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        productId: product.id,
        quantity,
        name: form.name.trim(),
        phone: form.phone.trim(),
        district: form.district.trim(),
        thana: form.thana.trim(),
        address: form.address.trim(),
        note: form.note.trim() || undefined,
        isInsideDhaka: form.isInsideDhaka,
        unitPrice,
        totalPrice,
      };

      const res = await singleOrder(payload);

      if (res?.data?.success) {
        toast.success('অর্ডার সফলভাবে সম্পন্ন হয়েছে!');
      }

      // order form backend response
      const orderId = res?.data?.id;
      console.log(orderId);

      if (orderId) {
        router.push(`/thank-you?orderId=${orderId}`);
      } else {
        toast.error('Order ID পাওয়া যায়নি।');
      }

      setForm({
        name: '',
        phone: '',
        district: '',
        thana: '',
        address: '',
        note: '',
        isInsideDhaka: true,
      });

      setQuantity(1);
    } catch (error) {
      console.error('ORDER ERROR:', error);
      toast.error('অর্ডার সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 md:py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* PAGE HEADER */}
        <div className="mb-6 border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              অর্ডার সম্পন্ন করুন
            </h1>
          </div>
          <p className="mt-1 text-md sm:text-md text-slate-500">
            পণ্যটি কেনার জন্য নিচের তথ্যগুলো সঠিকভাবে পূরণ করে অর্ডার কনফার্ম
            করুন।
          </p>
        </div>

        {/* =====================================================
            SINGLE UNIFIED MAIN CARD CONTAINER
        ====================================================== */}
        <div className="overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-sm">
          <div className="grid grid-cols-1 divide-y divide-slate-200 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
            {/* =====================================================
                LEFT SIDE - ORDER SUMMARY (5 COLS)
            ====================================================== */}
            <div className="bg-slate-50/50 p-6 lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <h2 className="mb-4 text-base font-semibold text-slate-900 border-b border-slate-200/80 pb-3">
                  অর্ডার সামারি
                </h2>

                {/* PRODUCT ITEM */}
                <div className="flex gap-4 rounded-md border border-slate-200/80 bg-white p-3.5 shadow-2xs">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-50 border border-slate-100">
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-contain p-1.5"
                    />
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="line-clamp-2 text-md font-semibold text-slate-900">
                        {product.name}
                      </h3>
                      {product.brand && (
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          ব্র্যান্ড: {product.brand}
                        </p>
                      )}
                    </div>

                    {/* PRICE & DISCOUNT */}
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-base font-bold text-primary">
                        ৳{unitPrice.toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <span className="text-md text-slate-400 line-through font-normal">
                          ৳{product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* DISCOUNT BADGE */}
                {hasDiscount && (
                  <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-md text-emerald-700 font-medium border border-emerald-100">
                    <Tag className="h-3.5 w-3.5 shrink-0" />
                    <span>
                      প্রতিটি পণ্যে ৳
                      {(discountAmount * quantity).toLocaleString()} ছাড় পাওয়া
                      যাচ্ছে!
                    </span>
                  </div>
                )}

                {/* QUANTITY PICKER */}
                <div className="mt-4 rounded-md border border-slate-200/80 bg-white p-3.5 flex items-center justify-between shadow-2xs">
                  <div>
                    <p className="text-md font-medium text-slate-700">পরিমাণ</p>
                    <p className="text-[11px] text-slate-400">
                      স্টক এভেলেবেল: {product.stock} টি
                    </p>
                  </div>

                  <div className="flex items-center rounded-lg border border-slate-200 bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={handleQuantityDecrease}
                      disabled={quantity <= 1 || loading}
                      className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>

                    <span className="flex h-8 w-9 items-center justify-center border-x border-slate-200 text-md font-bold text-slate-800">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={handleQuantityIncrease}
                      disabled={loading || quantity >= product.stock}
                      className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* CALCULATION BREAKDOWN */}
                <div className="mt-5 space-y-2.5 border-t border-slate-200/80 pt-4 text-md">
                  <div className="flex justify-between text-slate-600">
                    <span>পণ্যের মূল্য</span>
                    <span className="font-semibold text-slate-800">
                      ৳{unitPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>পরিমাণ</span>
                    <span className="font-semibold text-slate-800">
                      × {quantity}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>সাবটোটাল</span>
                    <span className="font-semibold text-slate-800">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>ডেলিভারি চার্জ</span>
                    <span className="font-semibold text-slate-800">
                      ৳{shippingFee.toLocaleString()}
                    </span>
                  </div>

                  {/* TOTAL */}
                  <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                    <span className="text-md font-bold text-slate-900">
                      সর্বমোট
                    </span>
                    <span className="text-xl font-extrabold text-primary">
                      ৳{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* TRUST BADGES */}
              <div className="space-y-2.5 rounded-md border border-slate-200/80 bg-white p-3.5">
                <div className="flex items-center gap-2.5">
                  <Truck className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-md text-slate-600">
                    সারা বাংলাদেশে দ্রুত ডেলিভারি
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-md text-slate-600">
                    ক্যাশ অন ডেলিভারি (পণ্য পেয়ে মূল্য দিন)
                  </span>
                </div>
              </div>
            </div>

            {/* =====================================================
                RIGHT SIDE - CHECKOUT FORM (7 COLS)
            ====================================================== */}
            <div className="p-6 lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    ডেলিভারি তথ্য
                  </h2>
                  <p className="text-md text-slate-500">
                    সঠিক নাম ও বিস্তারিত ঠিকানা প্রদান করুন
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* NAME */}
                <div>
                  <label className="mb-1.5 block text-md font-semibold uppercase tracking-wider text-slate-700">
                    আপনার নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="যেমন: মোঃ রহিম উদ্দিন"
                    className="w-full rounded-md border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-md text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-1.5 block text-md font-semibold uppercase tracking-wider text-slate-700">
                    ফোন নম্বর <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={e => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 11) {
                          setForm(prev => ({ ...prev, phone: value }));
                        }
                      }}
                      placeholder="017XXXXXXXX"
                      maxLength={11}
                      inputMode="numeric"
                      className="w-full rounded-md border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-md text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                    />
                    <Phone className="absolute right-3.5 top-3 h-4 w-4 text-slate-400" />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    ১১ সংখ্যার সঠিক মোবাইল নম্বর প্রবেশ করুন।
                  </p>
                </div>

                {/* DISTRICT + THANA */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-md font-semibold uppercase tracking-wider text-slate-700">
                      জেলা <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      placeholder="যেমন: ঢাকা / রাজশাহী"
                      className="w-full rounded-md border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-md text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-md font-semibold uppercase tracking-wider text-slate-700">
                      থানা <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="thana"
                      value={form.thana}
                      onChange={handleChange}
                      placeholder="যেমন: মিরপুর / বোয়ালিয়া"
                      className="w-full rounded-md border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-md text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>

                {/* ADDRESS */}
                <div>
                  <label className="mb-1.5 block text-md font-semibold uppercase tracking-wider text-slate-700">
                    সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={2}
                    placeholder="হাউস নম্বর, রোড নম্বর, এলাকার নাম লিখুন..."
                    className="w-full resize-none rounded-md border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-md text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                {/* DELIVERY AREA SELECTOR */}
                <div>
                  <label className="mb-2 block text-md font-semibold uppercase tracking-wider text-slate-700">
                    ডেলিভারি এরিয়া
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        setForm(prev => ({ ...prev, isInsideDhaka: true }))
                      }
                      className={`relative flex items-center gap-3 rounded-md border p-3.5 text-left transition ${
                        form.isInsideDhaka
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          form.isInsideDhaka
                            ? 'border-primary bg-primary text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {form.isInsideDhaka && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                      </div>
                      <div>
                        <p className="text-md font-semibold text-slate-800">
                          ঢাকার ভেতরে
                        </p>
                        <p className="text-[11px] text-slate-500">
                          ডেলিভারি চার্জ:{' '}
                          <span className="font-bold text-slate-900">৳৯০</span>
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setForm(prev => ({ ...prev, isInsideDhaka: false }))
                      }
                      className={`relative flex items-center gap-3 rounded-md border p-3.5 text-left transition ${
                        !form.isInsideDhaka
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          !form.isInsideDhaka
                            ? 'border-primary bg-primary text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {!form.isInsideDhaka && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                      </div>
                      <div>
                        <p className="text-md font-semibold text-slate-800">
                          ঢাকার বাইরে
                        </p>
                        <p className="text-[11px] text-slate-500">
                          ডেলিভারি চার্জ:{' '}
                          <span className="font-bold text-slate-900">৳১৩০</span>
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* NOTE */}
                <div>
                  <label className="mb-1.5 block text-md font-semibold uppercase tracking-wider text-slate-700">
                    অতিরিক্ত নোট{' '}
                    <span className="text-md font-normal text-slate-400">
                      (ঐচ্ছিক)
                    </span>
                  </label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows={2}
                    placeholder="পণ্য বা ডেলিভারি সম্পর্কিত কোনো বিশেষ নির্দেশ থাকলে লিখুন..."
                    className="w-full resize-none rounded-md border border-slate-200 bg-slate-50/50 px-4 py-2 text-md text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* =====================================================
                  SINCERE NOTICE ABOUT FAKE ORDERS (PLACED ABOVE BUTTON)
              ====================================================== */}
              <div className="rounded-md border border-amber-200 bg-amber-50/80 p-4 text-amber-900">
                <div className="md:flex gap-2.5 ">
                  <AlertCircle className="h-5 w-5 hidden md:block shrink-0 text-amber-600 md:mt-0.5" />
                  <div className="space-y-1 text-sm leading-relaxed">
                    <p className="font-bold text-amber-950">
                      দয়া করে ফেইক অর্ডার করবেন না — আমাদের কষ্ট বুঝুন।
                    </p>
                    <p className="text-amber-800/90">
                      একটি ফেইক অর্ডার হয়তো আপনার কাছে কিছুই না, কিন্তু আমাদের
                      কাছে এটি সময়, শ্রম, প্যাকেজিং খরচ এবং হতাশার কারণ। দয়া করে
                      আমাদের কষ্টটাকে বুঝুন। নিশ্চিত হয়ে অর্ডার দিন
                    </p>
                  </div>
                </div>
              </div>

              {/* ORDER SUBMIT BUTTON */}
              <button
                type="button"
                onClick={handleOrder}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 text-md font-bold text-white shadow-md shadow-primary/20 transition hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span>অর্ডার প্রসেস হচ্ছে...</span>
                ) : (
                  <span>
                    অর্ডার কনফার্ম করুন — ৳{totalPrice.toLocaleString()}
                  </span>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-400">
                অর্ডার নিশ্চিত করার মাধ্যমে আপনি আমাদের শর্তাবলীতে সম্মতি
                জানাচ্ছেন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
