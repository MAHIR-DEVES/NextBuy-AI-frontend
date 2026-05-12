'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  User,
  LogOut,
  Heart,
} from 'lucide-react';

const UserSidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
    { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === href;
    return pathname?.startsWith(href);
  };

  // ✅ FIXED NAVIGATION HANDLER
  const handleNavigate = (href: string) => {
    router.push(href);

    // small delay prevents navigation interruption bug
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 h-screen
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        transition-all duration-300
        flex flex-col shadow-sm

        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64

        md:static md:translate-x-0
        ${isOpen ? 'md:w-64' : 'md:w-20'}
      `}
    >
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-gray-900 font-bold text-sm">
              N
            </span>
          </div>

          <div className={`${!isOpen && 'hidden'}`}>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Next
            </span>
            <span className="text-xl font-bold text-orange-500">Buy</span>
          </div>
        </Link>
      </div>

      {/* NAV */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <button
                key={item.href}
                onClick={() => handleNavigate(item.href)}
                className={`
                  flex items-center gap-3 rounded-lg text-sm font-medium
                  transition-all duration-200 w-full

                  ${isOpen ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'}

                  ${
                    active
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={20} className={active ? 'text-orange-500' : ''} />
                <span className={`${!isOpen && 'hidden'}`}>{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 mt-auto">
        {/* User */}
        <div
          className={`
            flex items-center gap-3 rounded-lg p-2
            ${isOpen ? 'bg-gray-50' : 'justify-center'}
          `}
        >
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-medium">AD</span>
          </div>

          <div className={`${!isOpen && 'hidden'} flex-1`}>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>

        {/* Logout */}
        <button
          className={`
            w-full flex items-center gap-3 rounded-lg px-3 py-2 mt-2
            text-gray-600 hover:bg-red-50 hover:text-red-600
            ${!isOpen && 'justify-center'}
          `}
        >
          <LogOut size={18} />
          <span className={`${!isOpen && 'hidden'}`}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;
