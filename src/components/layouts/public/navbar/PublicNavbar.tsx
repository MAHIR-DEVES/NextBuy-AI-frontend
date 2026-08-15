'use client';

import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { PromoBanner1 } from '@/components/promo-banner1';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { useCartStore } from '@/store/cart.store';
import { getUser } from '@/utils/auth';
import Image from 'next/image';
import UserDropdown from './UserDropdown';
import DesktopNav from './DesktopNav';
import RightDesktopNev from './RightDesktopNev';
import MobileSidebar from './MobileSidebar';
import { IUser } from '@/types/auth';

const PublicNavbar = ({ className }: { className?: string }) => {
  const [scrolled, setScrolled] = useState(false);

  const fetchCart = useCartStore(state => state.fetchCart);
  const count = useCartStore(state => state.count);

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const currentUser = getUser();

    if (currentUser) {
      queueMicrotask(() => setUser(currentUser));
    }
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
            <div className="flex items-center gap-2">
              {/* mobile navbar  open + onOpenChange make this a controlled Sheet */}
              <MobileSidebar user={user}></MobileSidebar>

              {/* Logo */}
              <Link className="flex items-center mr-20 shrink-0" href="/">
                <div className="flex items-center">
                  <Image
                    src="/images/sera-place-logo.png"
                    alt="Logo"
                    width={170}
                    height={170}
                  />
                </div>
              </Link>
            </div>

            {/* Mobile: profile + cart (right side) */}
            <div className="flex items-center gap-3 md:hidden">
              {user && <UserDropdown user={user} />}
              <div className="relative">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-4 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[11px] font-bold text-white">
                    {count}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Center: Search bar */}
          <SearchBar />

          {/* RIGHT DESKTOP */}
          <RightDesktopNev></RightDesktopNev>
        </div>

        {/* DESKTOP NAV */}
        <DesktopNav />

        {/* MOBILE SCROLL LINKS */}
        {/* <div className="flex lg:hidden gap-4 py-2 text-xs text-gray-600 overflow-x-auto whitespace-nowrap border-t scrollbar-hide">
          <a className="hover:text-orange-500">Order protections</a>
          <a className="hover:text-orange-500">Tax exemption</a>
          <a className="hover:text-orange-500">Buyer Central</a>
        </div> */}
      </div>
    </section>
  );
};

export { PublicNavbar };
