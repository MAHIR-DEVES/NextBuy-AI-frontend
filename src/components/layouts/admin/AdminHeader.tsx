'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, ChevronDown, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { getUser, logout } from '@/utils/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AdminHeader = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof getUser> | null>(null);
  const router = useRouter();
  useEffect(() => {
    setUser(getUser());
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handelLogout = () => {
    logout();
    router.push('/login');
  };

  const getInitial = () => {
    if (!user) return 'U';
    return (user?.name || user?.email || 'U').charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
      <div className="pl-3 pr-5 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side - Menu Button & Logo */}
          <div className="flex items-center gap-4">
            {/* Menu Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} className="text-gray-600 dark:text-gray-400" />
            </button>

            {/* Mobile Logo */}
            <div className="md:hidden">
              <Link href="/admin" className="flex items-center gap-2">
                <div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Next
                  </span>
                  <span className="text-lg font-bold text-orange-500 dark:text-orange-400">
                    Buy
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun size={18} className="text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon size={18} className="text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="user"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {getInitial()}
                    </span>
                  )}
                </div>

                <ChevronDown size={14} />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  />

                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20 overflow-hidden">
                    <div className="p-3 border-b">
                      <p className="text-sm font-medium">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || ''}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/admin/profile"
                        className="flex items-center gap-3 px-3 py-2 text-sm"
                      >
                        <User size={15} />
                        Profile
                      </Link>
                    </div>

                    <div className="border-t py-1">
                      <button
                        onClick={handelLogout}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 w-full"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
