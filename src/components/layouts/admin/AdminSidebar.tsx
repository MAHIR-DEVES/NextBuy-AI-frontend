'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Users,
  MessageSquare,
  User,
  LogOut,
} from 'lucide-react';

const AdminSidebar = ({ isOpen }: { isOpen: boolean }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },

    { name: 'Products', href: '/admin/products', icon: Package },

    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },

    // { name: 'Sellers', href: '/admin/sellers', icon: Store },

    { name: 'Customers', href: '/admin/users', icon: Users },

    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },

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
        bg-[#f0ede9] dark:bg-gray-900
        transition-all duration-300
        flex flex-col 

        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        w-64

        md:static md:translate-x-0 
        ${isOpen ? 'md:w-64' : 'md:w-20'}
      `}
    >
      {/* Logo Section */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-800">
        <Link href="/admin" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-[#FF6B35] rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#ff8c5a] rotate-45 rounded-md"></div>
              <div className="absolute inset-[3px] bg-white dark:bg-[#0F0B1A] rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-gradient-to-br from-[#FF6B35] to-[#ff8c5a] rounded-full"></div>
              </div>
            </div>
          </div>

          <div className={`${!isOpen && 'hidden'} transition-all`}>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
              Next
            </span>
            <span className="text-xl sm:text-2xl font-light tracking-tight bg-gradient-to-r from-[#FF6B35] to-[#ff8c5a] bg-clip-text text-transparent">
              Buy
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation (Scrollable) */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
  flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200

  ${isOpen ? 'px-3 py-2.5' : 'px-0 py-2 justify-center w-10 mx-auto'}

  ${
    isOpen && active
      ? 'bg-[#FF6B35] text-white shadow-sm'
      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
  }
  
`}
              >
                {!isOpen && active ? (
                  <Icon size={22} className="text-[#FF6B35]" />
                ) : (
                  <Icon size={22} />
                )}

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
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">AD</span>
            </div>
            <div className={`${!isOpen && 'hidden'} transition-all`}>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                Admin User
              </p>
              <p className="text-xs text-gray-500">admin@devstudio.com</p>
            </div>
          </div>

          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 w-full">
            <LogOut size={18} />
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
