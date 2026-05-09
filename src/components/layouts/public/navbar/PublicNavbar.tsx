'use client';

import {
  ShoppingCart,
  Menu,
  User,
  Briefcase,
  FileText,
  Package,
  Zap,
  Smartphone,
  Laptop,
  Shirt,
  Gamepad2,
  Watch,
  Shield,
  Home,
  Monitor,
  Trophy,
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
import { getUser } from '@/utils/auth';
import Image from 'next/image';

const PublicNavbar = ({ className }: { className?: string }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isFullscreenMenuOpen, setIsFullscreenMenuOpen] = useState(false);
  const [isOrderProtectionOpen, setIsOrderProtectionOpen] = useState(false);
  const fetchCart = useCartStore(state => state.fetchCart);
  const count = useCartStore(state => state.count);

  const [user, setUser] = useState<ReturnType<typeof getUser> | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

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
            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-orange-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  0
                </span>
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-80 p-0">
                  {/* Header */}
                  <div className="p-4 border-b">
                    <SheetHeader className="p-0">
                      <SheetTitle className="flex items-center justify-between">
                        <Link
                          className="flex items-center gap-2 shrink-0"
                          href="/"
                        >
                          <div className="flex items-center">
                            <span className="text-xl font-bold text-orange-500">
                              NEXT
                            </span>
                            <span className="text-xl font-bold text-gray-800">
                              BUY
                            </span>
                          </div>
                        </Link>
                      </SheetTitle>
                    </SheetHeader>
                  </div>

                  <div className="p-4 space-y-6">
                    {/* USER SECTION */}
                    <div className="space-y-3">
                      {user ? (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                          {user?.avatar ? (
                            <Image
                              src={user.avatar}
                              alt="User avatar"
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {user?.name || 'User'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user?.email || 'user@example.com'}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Link href="/login">
                            <Button className="w-full bg-orange-500 hover:bg-orange-600">
                              Sign in
                            </Button>
                          </Link>
                          <Link href="/register">
                            <Button variant="outline" className="w-full">
                              Create account
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>

                    {/* CATEGORY SECTION */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Categories
                      </h3>
                      <div className="space-y-1">
                        {[
                          { name: 'Smartphones', icon: Smartphone },
                          { name: 'Laptop', icon: Laptop },
                          { name: 'Fashion', icon: Shirt },
                          { name: 'Gaming', icon: Gamepad2 },
                          { name: 'Accessories', icon: Watch },
                          { name: 'Electronics', icon: Monitor },
                          { name: 'Home & Garden', icon: Home },
                          { name: 'Sports & Entertainment', icon: Trophy },
                        ].map(cat => {
                          const Icon = cat.icon;
                          return (
                            <Link
                              key={cat.name}
                              href={`/products?category=${cat.name}`}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-orange-500 transition-colors"
                            >
                              <Icon className="h-5 w-5" />
                              <span>{cat.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* BRAND SECTION */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Brands
                      </h3>
                      <div className="space-y-1">
                        {['Apple', 'Samsung', 'Sony', 'Xiaomi', 'Dell'].map(
                          brand => (
                            <Link
                              key={brand}
                              href={`/products?brand=${brand}`}
                              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-orange-500 transition-colors"
                            >
                              {brand}
                            </Link>
                          ),
                        )}
                      </div>
                    </div>

                    {/* EXTRA LINKS */}
                    <div className="pt-4 border-t space-y-3">
                      <Link
                        href="/products?verified=true"
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        <Shield className="h-4 w-4" />
                        Verified manufacturers
                      </Link>

                      <Link
                        href="/products?orderProtection=true"
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        <Package className="h-4 w-4" />
                        Order protections
                      </Link>

                      <Link
                        href="/products?taxExemption=true"
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        Tax exemption
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Center: Search bar */}
          <SearchBar></SearchBar>

          {/* RIGHT DESKTOP */}
          <div className="hidden lg:flex items-center gap-4 shrink-0 ml-8">
            {/* Sign in */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              {user ? (
                <div className="flex items-center gap-2">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-gray-700 text-base px-5 py-6 font-semibold"
                  >
                    <User className="h-4 w-4" /> Sign in
                  </Button>
                </Link>
              )}

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
