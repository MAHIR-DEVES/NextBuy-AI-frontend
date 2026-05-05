'use client';

import {
  Search,
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
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import AllCategories from './AllCategories';
import OrderProtectionModal from './OrderProtectionModal';
import { PromoBanner1 } from '@/components/promo-banner1';
import Link from 'next/link';

const PublicNavbar = ({ className }: { className?: string }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isFullscreenMenuOpen, setIsFullscreenMenuOpen] = useState(false);
  const [isOrderProtectionOpen, setIsOrderProtectionOpen] = useState(false);

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
          <div className="flex-1 w-full mx-0 md:mx-4">
            <div className="relative flex w-full items-stretch">
              <Input
                placeholder="Search products, manufacturers, suppliers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 h-11 text-base border-r-0 rounded-r-none focus-visible:ring-1 text-sm sm:text-base"
              />
              <Button className="h-11 rounded-l-none px-4 sm:px-6 bg-orange-500 hover:bg-orange-600">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Search</span>
              </Button>
            </div>
          </div>

          {/* RIGHT DESKTOP */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Sign in / Create account */}
            <div className="hidden lg:flex items-center gap-1 text-sm">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-gray-700">
                  Sign in
                </Button>
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/register">
                <Button variant="ghost" size="sm" className="text-gray-700">
                  Create account
                </Button>
              </Link>
            </div>
            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                0
              </span>
            </Button>
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
