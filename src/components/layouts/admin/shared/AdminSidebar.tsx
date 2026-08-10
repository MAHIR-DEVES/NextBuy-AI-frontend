'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  User,
  LogOut,
  MessageSquare,
  ChartNoAxesCombined,
  UserStar,
  NotebookPen,
  ChevronDown,
} from 'lucide-react';
import { BiSolidCategory } from 'react-icons/bi';
import Image from 'next/image';
import {
  Building2,
  UserRound,
  WalletCards,
  HandCoins,
  Truck,
  Store,
  CalendarClock,
} from 'lucide-react';

const AdminSidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) => {
  const pathname = usePathname();

  const [accountsOpen, setAccountsOpen] = useState(
    pathname?.startsWith('/admin/accounts'),
  );

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/admin/users', icon: Users },
    {
      name: 'Customers Contact',
      href: '/admin/customer-contact',
      icon: MessageSquare,
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: ChartNoAxesCombined,
    },
    {
      name: 'Hero Management',
      href: '/admin/hero-management',
      icon: NotebookPen,
    },
    {
      name: 'Category Management',
      href: '/admin/category-management',
      icon: BiSolidCategory,
    },
    { name: 'Profile', href: '/admin/profile', icon: User },
  ];

  const accountSubItems = [
    {
      name: 'Central',
      href: '/admin/accounts/central',
      icon: Building2,
    },
    {
      name: 'Personal',
      href: '/admin/accounts/personal',
      icon: UserRound,
    },
    {
      name: 'Steadfast Withdrawal',
      href: '/admin/accounts/steadfast-withdrawal',
      icon: WalletCards,
    },
    {
      name: 'Investor Payment',
      href: '/admin/accounts/investor-payment',
      icon: HandCoins,
    },
    {
      name: 'Shipment',
      href: '/admin/accounts/shipment',
      icon: Truck,
    },
    {
      name: 'Whole Sale',
      href: '/admin/accounts/whole-sale',
      icon: Store,
    },
    {
      name: 'Fixed Monthly Cost',
      href: '/admin/accounts/fixed-monthly-cost',
      icon: CalendarClock,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }

    return pathname?.startsWith(href);
  };

  const handleMenuClick = () => {
    // others menu click Accounts submenu off
    setAccountsOpen(false);
    setIsOpen(false);
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
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/admin" className="group flex items-center gap-3">
          <div
            className={`
              ${isOpen ? 'hidden' : ''}
              w-8 h-8 bg-gray-900 dark:bg-white rounded-lg
              flex items-center justify-center flex-shrink-0
            `}
          >
            <span className="text-white dark:text-gray-900 font-bold text-sm">
              J
            </span>
          </div>

          <div className={`${!isOpen && 'hidden'} transition-all`}>
            <Image
              src="/images/jonopriologo-logo.png"
              alt="Logo"
              width={150}
              height={150}
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-1">
          {/* Normal Menu Items */}
          {menuItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleMenuClick}
                className={`
                  flex items-center gap-3 rounded-xs text-sm font-medium
                  transition-all duration-200
                  ${isOpen ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'}
                  ${
                    active
                      ? 'bg-chart-1 dark:bg-chart-4 text-button-text'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-button-hover-1'
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 ${
                    active ? 'text-button-text' : ''
                  }`}
                />

                <span className={`${!isOpen && 'hidden'} transition-all`}>
                  {item.name}
                </span>
              </Link>
            );
          })}

          {/* Accounts */}
          <div>
            <button
              type="button"
              onClick={() => {
                if (!isOpen) {
                  setIsOpen(true);
                }

                setAccountsOpen(prev => !prev);
              }}
              className={`
                w-full flex items-center gap-3 rounded-xs
                text-sm font-medium transition-all duration-200
                ${isOpen ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'}
                ${
                  isActive('/admin/accounts')
                    ? 'bg-chart-1 dark:bg-chart-4 text-button-text'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-button-hover-1'
                }
              `}
            >
              <UserStar size={20} className="flex-shrink-0" />

              <span
                className={`
                  ${!isOpen && 'hidden'}
                  flex-1 text-left transition-all
                `}
              >
                Accounts
              </span>

              {isOpen && (
                <ChevronDown
                  size={16}
                  className={`
                    transition-transform duration-200
                    ${accountsOpen ? 'rotate-180' : ''}
                  `}
                />
              )}
            </button>
            {/* Accounts Submenu */}
            {/* Accounts Submenu */}{' '}
            <AnimatePresence initial={false}>
              {' '}
              {isOpen && accountsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden"
                >
                  {' '}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.08 } },
                    }}
                    className="mt-1 ml-6 space-y-1 border-l border-gray-200 pl-3 dark:border-gray-700"
                  >
                    {' '}
                    {accountSubItems.map(item => {
                      const active = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.href}
                          variants={{
                            hidden: { opacity: 0, x: -12 },
                            visible: {
                              opacity: 1,
                              x: 0,
                              transition: { duration: 0.25, ease: 'easeOut' },
                            },
                          }}
                        >
                          {' '}
                          <Link
                            href={item.href}
                            onClick={() => {
                              setAccountsOpen(false);
                              setIsOpen(false);
                            }}
                            className={` relative flex gap-2 items-center rounded-xs px-3 py-2 text-sm transition-all duration-200 ${active ? 'bg-[#d0f1e8] font-medium text-primary' : 'text-gray-500 hover:bg-button-hover-1 hover:text-primary dark:text-gray-400'} `}
                          >
                            {' '}
                            {/* Active indicator */}{' '}
                            {active && (
                              <motion.span
                                layoutId="account-active"
                                className="absolute -left-[13px] h-5 w-0.5 rounded-full bg-primary"
                                transition={{
                                  type: 'spring',
                                  stiffness: 400,
                                  damping: 30,
                                }}
                              />
                            )}{' '}
                            <Icon
                              size={16}
                              className={`flex-shrink-0 ${
                                active ? 'text-primary' : 'text-gray-400'
                              }`}
                            />
                            <span>{item.name}</span>
                          </Link>{' '}
                        </motion.div>
                      );
                    })}{' '}
                  </motion.div>{' '}
                </motion.div>
              )}{' '}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="space-y-2">
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
              className={`
                ${!isOpen && 'hidden'}
                flex-1 min-w-0 transition-all
              `}
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Admin User
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                admin@example.com
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            className={`
              w-full flex items-center gap-3 rounded-lg px-3 py-2
              text-sm font-medium
              text-gray-600 dark:text-gray-400
              hover:bg-red-50 dark:hover:bg-red-500/10
              hover:text-red-600 dark:hover:text-red-400
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
