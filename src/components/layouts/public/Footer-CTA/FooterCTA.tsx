import Link from 'next/link';
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';

const FooterCTA = () => {
  return (
    <section className="my-10">
      <div className="relative overflow-hidden rounded-sm border border-[#f3d9e3] bg-gradient-to-r from-[#fff5f8] via-white to-[#fff8fa] px-5 py-8 sm:px-8 md:px-10 md:py-9">
        {/* Subtle decoration */}
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#fce4ed]" />
        <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-[#fff0f5]" />

        <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div className="max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fde7ef] px-3 py-1.5 text-xs font-semibold text-[#c9185b]">
              <Heart className="h-3.5 w-3.5 fill-current" />
              Made for your everyday shopping
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Find Something You’ll Love
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
              Explore our latest collection and enjoy quality products, great
              prices and a simple shopping experience.
            </p>

            <Link
              href="/products"
              className="mt-5 inline-flex items-center gap-2 rounded-sm bg-[#c9185b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b51650]"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right */}
          <div className="grid w-full max-w-sm grid-cols-3 gap-2.5 sm:gap-3 md:max-w-md">
            <div className="flex flex-col items-center justify-center rounded-sm border border-[#f4dce5] bg-white p-3 text-center shadow-sm sm:p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0f5]">
                <ShoppingBag className="h-5 w-5 text-[#c9185b]" />
              </div>

              <p className="text-xs font-semibold text-slate-800 sm:text-sm">
                Wide Choice
              </p>

              <p className="mt-1 hidden text-[11px] text-slate-400 sm:block">
                More to explore
              </p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-sm border border-[#f4dce5] bg-white p-3 text-center shadow-sm sm:p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0f5]">
                <Truck className="h-5 w-5 text-[#c9185b]" />
              </div>

              <p className="text-xs font-semibold text-slate-800 sm:text-sm">
                Fast Delivery
              </p>

              <p className="mt-1 hidden text-[11px] text-slate-400 sm:block">
                Across Bangladesh
              </p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-sm border border-[#f4dce5] bg-white p-3 text-center shadow-sm sm:p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0f5]">
                <ShieldCheck className="h-5 w-5 text-[#c9185b]" />
              </div>

              <p className="text-xs font-semibold text-slate-800 sm:text-sm">
                Shop Safely
              </p>

              <p className="mt-1 hidden text-[11px] text-slate-400 sm:block">
                Trusted shopping
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
