'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  User,
  LogOut,
} from 'lucide-react';

const AdminSidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    // { name: 'Sellers', href: '/admin/sellers', icon: Store },
    { name: 'Customers', href: '/admin/users', icon: Users },
    // { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Profile', href: '/admin/profile', icon: User },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 h-screen
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        transition-all duration-300
        flex flex-col
        shadow-sm

        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        w-64

        md:static md:translate-x-0 
        ${isOpen ? 'md:w-64' : 'md:w-20'}
      `}
    >
      {/* Logo Section */}
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/admin" className="group flex items-center gap-3">
          {/* Simplified Logo */}
          <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white dark:text-gray-900 font-bold text-sm">
              N
            </span>
          </div>

          <div className={`${!isOpen && 'hidden'} transition-all`}>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Next
            </span>
            <span className="text-xl font-bold text-orange-500 dark:text-orange-400">
              Buy
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation (Scrollable) */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${isOpen ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'}
                  ${
                    active
                      ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 ${
                    active ? 'text-orange-500 dark:text-orange-400' : ''
                  }`}
                />
                <span className={`${!isOpen && 'hidden'} transition-all`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section (Always Bottom) */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="space-y-2">
          {/* User Info */}
          <div
            className={`
            flex items-center gap-3 rounded-lg p-2
            ${isOpen ? 'bg-gray-50 dark:bg-gray-800/50' : 'justify-center'}
          `}
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                AD
              </span>
            </div>
            <div
              className={`${!isOpen && 'hidden'} flex-1 min-w-0 transition-all`}
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Admin User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                admin@example.com
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            className={`
              w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
              text-gray-600 dark:text-gray-400
              hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400
              transition-all duration-200
              ${!isOpen && 'justify-center'}
            `}
          >
            <LogOut size={18} className="flex-shrink-0" />
            <span className={`${!isOpen && 'hidden'} transition-all`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
