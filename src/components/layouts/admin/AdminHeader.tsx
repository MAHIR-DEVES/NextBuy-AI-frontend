'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  User,
  Menu,
  Moon,
  Sun,
  ChevronDown,
  Settings,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

const AdminHeader = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-[#f0ede9] dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-20">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side - Menu Button & Search */}
          <div className="flex items-center gap-4">
            {/* Menu Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <Menu size={28} className="text-gray-700 dark:text-gray-300" />
                {/* Modern geometric logo mark */}
                <div className="md:hidden">
                  <Link href="/admin" className="group flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#FF6B35] rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                      <div className="relative w-6 h-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#ff8c5a] rotate-45 rounded-md"></div>
                        <div className="absolute inset-[2px] bg-white dark:bg-[#0F0B1A] rounded-full"></div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#FF6B35] to-[#ff8c5a] rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    <div className={`$ transition-all`}>
                      <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                        Soft
                      </span>
                      <span className="text-xl sm:text-2xl font-light tracking-tight bg-gradient-to-r from-[#FF6B35] to-[#ff8c5a] bg-clip-text text-transparent">
                        visionix
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-white dark:bg-gray-800 rounded-lg px-3 py-1.5 border border-gray-200 dark:border-gray-700">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400 w-64"
              />
            </div>
          </div>

          {/* Center - Date & Time */}
          {/* <div className="hidden md:block text-center">
            <div className=" rounded-lg px-4 py-1.5 ">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(currentDateTime)}
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                {formatTime(currentDateTime)}
              </p>
            </div>
          </div> */}

          {/* Right Side - Notifications, Dark Mode, Profile */}
          <div className="flex items-center gap-3">
            {/* Search Icon (Mobile) */}
            {/* <button className="md:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Search size={18} className="text-gray-700 dark:text-gray-300" />
            </button> */}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isDarkMode ? (
                <Sun size={18} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon size={18} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Bell size={18} className="text-gray-700 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B35] to-[#ff8c5a] rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">AD</span>
                </div>
                <ChevronDown
                  size={14}
                  className="text-gray-600 dark:text-gray-400"
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        Admin User
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        admin@devstudio.com
                      </p>
                    </div>

                    <div className="p-2">
                      <Link
                        href="/admin/profile"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User size={16} />
                        Profile
                      </Link>
                      <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings size={16} />
                        Settings
                      </Link>
                      <Link
                        href="/help"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <HelpCircle size={16} />
                        Help
                      </Link>
                    </div>

                    <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                      <button className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full">
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Date & Time */}
        {/* <div className="md:hidden mt-3 text-center">
          <div className="inline-block bg-white dark:bg-gray-800 rounded-lg px-3 py-1 shadow-sm">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(currentDateTime)}
            </p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              {formatTime(currentDateTime)}
            </p>
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default AdminHeader;
