'use client';

import {
  ShoppingCart,
  Menu,
  User,
  Briefcase,
  FileText,
  Package,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import AllCategories from './AllCategories';
import OrderProtectionModal from './OrderProtectionModal';
import { PromoBanner1 } from '@/components/promo-banner1';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { useCartStore } from '@/store/cart.store';

const PublicNavbar = ({ className }: { className?: string }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isFullscreenMenuOpen, setIsFullscreenMenuOpen] = useState(false);
  const [isOrderProtectionOpen, setIsOrderProtectionOpen] = useState(false);
  const fetchCart = useCartStore(state => state.fetchCart);
  const count = useCartStore(state => state.count);
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'Electronics' },
    { name: 'Fashion' },
    { name: 'Home & Garden' },
    { name: 'Sports & Entertainment' },
  ];

  return (
    <section
      className={cn('border-b bg-white sticky top-0 z-50 w-full', className)}
    >
      {/* Promo Banner */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-[100px] opacity-100'
        }`}
      >
        <PromoBanner1 />
      </div>

      <div className="container mx-auto px-3 sm:px-4">
        {/* Top Navbar */}
        <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
          {/* LEFT */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Logo */}
            <Link className="flex items-center gap-2 shrink-0" href="/">
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-bold text-orange-500">
                  NEXT
                </span>
                <span className="text-xl sm:text-2xl font-bold text-gray-800">
                  BUY
                </span>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-80 p-0">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle className="flex items-center gap-2">
                      <Link
                        className="flex items-center gap-2 shrink-0"
                        href="/"
                      >
                        <div className="flex items-center">
                          <span className="text-xl sm:text-2xl font-bold text-orange-500">
                            NEXT
                          </span>
                          <span className="text-xl sm:text-2xl font-bold text-gray-800">
                            BUY
                          </span>
                        </div>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="p-4 space-y-6">
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <User className="h-4 w-4" /> Sign in
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <Briefcase className="h-4 w-4" /> Create account
                      </Button>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">All categories</h3>
                      <div className="space-y-2">
                        {categories.map(cat => (
                          <a
                            key={cat.name}
                            href="#"
                            className="block py-2 text-gray-600 hover:text-orange-500"
                          >
                            {cat.name}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t space-y-3">
                      <a className="flex items-center gap-2 text-sm text-gray-600">
                        <Zap className="h-4 w-4" /> Verified manufacturers
                      </a>
                      <a className="flex items-center gap-2 text-sm text-gray-600">
                        <Package className="h-4 w-4" /> Order protections
                      </a>
                      <a className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4" /> Tax exemption
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Center: Search bar */}
          <SearchBar></SearchBar>

          {/* RIGHT DESKTOP */}
          <div className="hidden lg:flex items-center gap-4 shrink-0 ml-2">
            {/* Sign in */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-gray-700 text-base px-5 py-6 font-semibold"
                >
                  Sign in
                </Button>
              </Link>

              <span className="text-gray-300 text-lg">|</span>
            </div>

            {/* Cart */}
            <div className="relative">
              <Link href={'/cart'}>
                <ShoppingCart className="h-7 w-7" />

                <span className="absolute -top-4 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[11px] font-bold text-white">
                  {count}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex justify-between py-2 text-sm text-gray-600">
          <div className="flex gap-6">
            <div
              onMouseEnter={() => setIsFullscreenMenuOpen(true)}
              onMouseLeave={() => setIsFullscreenMenuOpen(false)}
              className="cursor-pointer hover:text-orange-500"
            >
              All categories
              {isFullscreenMenuOpen && (
                <AllCategories
                  isFullscreenMenuOpen={isFullscreenMenuOpen}
                  setIsFullscreenMenuOpen={setIsFullscreenMenuOpen}
                />
              )}
            </div>

            <div
              onMouseEnter={() => setIsOrderProtectionOpen(true)}
              onMouseLeave={() => setIsOrderProtectionOpen(false)}
              className="cursor-pointer hover:text-orange-500"
            >
              Order protections
              {isOrderProtectionOpen && (
                <OrderProtectionModal
                  isOpen={isOrderProtectionOpen}
                  setIsOpen={setIsOrderProtectionOpen}
                />
              )}
            </div>

            <a className="hover:text-orange-500">Accio Work</a>
          </div>

          <div className="flex gap-6">
            <a className="hover:text-orange-500">Order protections</a>
            <a className="hover:text-orange-500">Tax exemption</a>
            <a className="hover:text-orange-500">Buyer Central</a>
          </div>
        </div>

        {/* MOBILE SCROLL LINKS */}
        <div className="flex lg:hidden gap-4 py-2 text-xs text-gray-600 overflow-x-auto whitespace-nowrap border-t scrollbar-hide">
          <a className="hover:text-orange-500">Order protections</a>
          <a className="hover:text-orange-500">Tax exemption</a>
          <a className="hover:text-orange-500">Buyer Central</a>
        </div>
      </div>
    </section>
  );
};

export { PublicNavbar };
