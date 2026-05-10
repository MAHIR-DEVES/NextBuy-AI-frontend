'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Circle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getUser, logout } from '@/utils/auth';
import Image from 'next/image';

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const user = getUser();

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ROLE BASED PROFILE REDIRECT
  const handleProfile = () => {
    setOpen(false);
    if (user?.role === 'ADMIN') {
      router.push('/admin/profile');
    } else {
      router.push('/dashboard/profile');
    }
  };

  // ROLE BASED DASHBOARD REDIRECT
  const handleDashboard = () => {
    setOpen(false);
    if (user?.role === 'ADMIN') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  // LOGOUT
  const handleLogout = () => {
    setOpen(false);
    logout();
    router.push('/login');
  };

  const getRoleColor = () => {
    return user?.role === 'ADMIN'
      ? 'text-purple-600 bg-purple-50'
      : 'text-orange-600 bg-orange-50';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* USER BUTTON WITH AVATAR + CHEVRON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-gray-100 transition-all duration-200"
      >
        {/* Avatar */}
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="user"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-sm">
            {user?.name ? (
              <span className="text-sm font-medium text-white">
                {getInitials(user.name)}
              </span>
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </div>
        )}

        {/* Chevron indicator */}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* USER INFO HEADER */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
            <div className="flex items-center gap-3">
              {/* Large Avatar */}
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt="user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover ring-2 ring-orange-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-sm">
                  {user?.name ? (
                    <span className="text-base font-semibold text-white">
                      {getInitials(user.name)}
                    </span>
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {user?.name || 'User'}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor()}`}
                  >
                    <Circle className="w-1.5 h-1.5 fill-current" />
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* MENU ITEMS */}
          <div className="py-2">
            {/* Profile */}
            <button
              onClick={handleProfile}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Profile</p>
                <p className="text-xs text-gray-400">
                  View and edit your profile
                </p>
              </div>
            </button>

            {/* Dashboard */}
            <button
              onClick={handleDashboard}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <LayoutDashboard className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Dashboard</p>
                <p className="text-xs text-gray-400">
                  {user?.role === 'ADMIN'
                    ? 'Admin control panel'
                    : 'Your activity overview'}
                </p>
              </div>
            </button>

            {/* Divider */}
            <div className="my-2 h-px bg-gray-100" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <LogOut className="w-4 h-4 text-red-500" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Logout</p>
                <p className="text-xs text-red-400">Sign out of your account</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
