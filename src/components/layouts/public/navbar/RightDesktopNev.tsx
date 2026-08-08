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
          className="flex items-center gap-2 text-sm font-medium hover:text-hover-text"
        >
          <User className="h-5 w-5" />
          Sign in
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
