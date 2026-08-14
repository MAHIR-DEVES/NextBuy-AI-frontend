import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  MapPin,
  Phone,
  Truck,
  Package,
  Calendar,
  Clock,
  ArrowLeft,
  FileText,
  User,
} from 'lucide-react';
import DownloadOrderButton from '@/components/layouts/public/Thankyou/DownloadOrderButton';

interface PageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  product: {
    thumbnail: string;
  };
}

interface Order {
  id: string;
  total: number;
  status: string;
  name: string;
  phone: string;
  district: string;
  thana: string;
  address: string;
  note: string | null;
  isInsideDhaka: boolean;
  shippingFee: number;
  createdAt: string;
  items: OrderItem[];
}

const API_URL = process.env.NEXT_PUBLIC_BASE_API;

const getSingleOrder = async (orderId: string): Promise<Order | null> => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      cache: 'no-store',
    });

    if (!response.ok) return null;

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Failed to fetch order:', error);
    return null;
  }
};

const ThankYouPage = async ({ searchParams }: PageProps) => {
  const { orderId } = await searchParams;

  if (!orderId) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 bg-slate-50/50">
        <div className="max-w-md w-full text-center py-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
            <Package className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            অর্ডারের তথ্য পাওয়া যায়নি
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            দুঃখিত, কোনো অর্ডার আইডি প্রদান করা হয়নি।
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const order = await getSingleOrder(orderId);

  if (!order) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 bg-slate-50/50">
        <div className="max-w-md w-full text-center py-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-500 mb-4">
            <Package className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            অর্ডার খুঁজে পাওয়া যায়নি
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            আপনার প্রদানকৃত অর্ডার আইডি দিয়ে কোনো রেকর্ড পাওয়া যায়নি।
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const formattedDate = new Date(order.createdAt).toLocaleString('en-BD', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <main className="min-h-screen bg-slate-50/70 py-10 md:py-16">
      {/* PAGE WIDTH INCREASED TO 5XL */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* SUCCESS HEADER (INCREASED TEXT SIZES) */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 mb-4">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            ধন্যবাদ! অর্ডারটি সফল হয়েছে
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
            আপনার অর্ডারটি প্রসেসিংয়ে রয়েছে। খুব শীঘ্রই প্রতিনিধি আপনাকে ফোন
            করবেন।
          </p>
        </div>

        {/* UNIFIED RECEIPT CARD */}
        <div
          id="order-receipt"
          className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          {/* ACCENT BAR */}
          <div className="h-2 w-full bg-gradient-to-r from-primary via-emerald-500 to-primary" />

          <div className="p-6 sm:p-10 md:p-12 space-y-10">
            {/* INVOICE HEADER & META */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  অর্ডার ইনভয়েস
                </span>
                <h2 className="text-xs sm:text-md font-black text-slate-900 tracking-tight mt-1">
                  #{order.id}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 sm:text-right">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {formattedDate}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 font-bold text-amber-700 text-xs">
                  <Clock className="h-3.5 w-3.5" />
                  {order.status}
                </span>
              </div>
            </div>

            {/* CUSTOMER & DELIVERY META */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b border-slate-100 text-sm">
              {/* CUSTOMER */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" /> গ্রাহকের তথ্য
                </span>
                <p className="font-bold text-slate-900 text-base">
                  {order.name}
                </p>
                <p className="flex items-center gap-2 text-slate-600 font-medium">
                  <Phone className="h-4 w-4 text-slate-400" />
                  {order.phone}
                </p>
              </div>

              {/* ADDRESS */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" /> ডেলিভারি ঠিকানা
                </span>
                <p className="text-slate-800 font-medium leading-relaxed text-base">
                  {order.address}
                </p>
                <p className="text-slate-500 font-medium">
                  {order.thana}, {order.district}
                </p>
                <p className="inline-flex items-center gap-1.5 text-xs font-bold text-primary pt-1">
                  <Truck className="h-4 w-4" />
                  {order.isInsideDhaka
                    ? 'ঢাকার ভেতরে (৳৯০)'
                    : 'ঢাকার বাইরে (৳১৩০)'}
                </p>
              </div>
            </div>

            {/* PRODUCT LIST */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 block">
                পণ্যসমূহ
              </span>

              <div className="divide-y divide-slate-100">
                {order.items.map(item => (
                  <div
                    key={item.id}
                    className="py-4 first:pt-0 last:pb-0 flex items-center gap-5"
                  >
                    {/* LARGER PRODUCT IMAGE (h-20 w-20) */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-50 border border-slate-100">
                      <Image
                        src={item.product.thumbnail}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1.5"
                      />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        ৳{item.price.toLocaleString()} × {item.quantity}টি
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-base sm:text-lg font-extrabold text-slate-900">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ORDER NOTE */}
            {order.note && (
              <div className="text-sm bg-slate-50/80 rounded-2xl p-5 text-slate-700 space-y-1.5">
                <span className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <FileText className="h-4 w-4 text-slate-400" /> নোট:
                </span>
                <p className="italic leading-relaxed">{order.note}</p>
              </div>
            )}

            {/* SUMMARY BREAKDOWN */}
            <div className="pt-6 border-t border-slate-100 space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>পণ্যের সাবটোটাল</span>
                <span className="font-semibold text-slate-800 text-base">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>ডেলিভারি চার্জ</span>
                <span className="font-semibold text-slate-800 text-base">
                  ৳{order.shippingFee.toLocaleString()}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-baseline justify-between">
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  সর্বমোট
                </span>
                <span className="text-2xl sm:text-3xl font-black text-primary">
                  ৳{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="mt-8 flex flex-col items-center gap-4 print:hidden">
          <DownloadOrderButton />

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition mt-1"
          >
            <ArrowLeft className="h-4 w-4" /> হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
