import Link from 'next/link';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';

const PromoBanner = () => {
  return (
    <section className="my-10">
      <div className="relative overflow-hidden rounded-sm bg-gradient-to-r from-[#c9185b] via-[#df2868] to-[#f34b7d] px-6 py-8 md:px-10 md:py-10">
        {/* Decorative shapes */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          {/* Content */}
          <div className="max-w-xl text-white">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Special Offer
            </div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Shop More, Save More!
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-white/85 sm:text-base">
              Discover trending products, exclusive deals and everyday
              essentials at prices you’ll love.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-sm bg-white px-5 py-2.5 text-sm font-semibold text-[#c9185b] transition hover:bg-white/90"
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/products?isFeatured=true"
                className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                View Featured
              </Link>
            </div>
          </div>

          {/* Offer */}
          <div className="hidden shrink-0 md:block">
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 border-white/20 bg-white/10 text-center backdrop-blur-sm">
              <span className="text-3xl font-extrabold">30%</span>
              <span className="text-xs font-medium uppercase tracking-wider text-white/90">
                OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
