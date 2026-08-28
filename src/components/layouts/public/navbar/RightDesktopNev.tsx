'use client';

import { getUser } from '@/utils/auth';
import React, { useEffect, useState } from 'react';
import UserDropdown from './UserDropdown';
import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';

const RightDesktopNev = () => {
  const [user, setUser] = useState<ReturnType<typeof getUser> | null>(null);

  useEffect(() => {
    const currentUser = getUser();

    if (currentUser) {
      queueMicrotask(() => setUser(currentUser));
    }
  }, []);

  const fetchCart = useCartStore(state => state.fetchCart);
  const count = useCartStore(state => state.count);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="flex items-center gap-5 ml-4 hidden md:flex">
      {user ? (
        <UserDropdown user={user} />
      ) : (
        <Link
          href="/login"
          className="group inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-gradient-primary-hover hover:shadow-lg "
        >
          <User className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          <span>Login</span>
        </Link>
      )}

      <div className="h-5 w-px bg-border" />

      <div className="relative">
        <Link href="/cart" className="block">
          <ShoppingCart className="h-6 w-6 transition-colors hover:text-hover-text" />

          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
              {count}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default RightDesktopNev;
