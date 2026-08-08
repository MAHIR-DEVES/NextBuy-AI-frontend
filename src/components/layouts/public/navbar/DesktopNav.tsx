'use client';
import React, { useState } from 'react';
import AllCategories from './AllCategories';
import OrderProtectionModal from './OrderProtectionModal';
import Link from 'next/link';

const leftNavLinks = [
  {
    label: 'Products',
    href: '/products',
  },

  {
    label: 'Shoes',
    href: '/products?category=shoes',
  },
  {
    label: 'Fashion',
    href: '/products?category=Fashion',
  },
  {
    label: 'Gadgets',
    href: '/products?category=Gadgets',
  },
];
const rightNavLinks = [
  {
    label: 'About Us',
    href: '/about',
  },
  {
    label: 'Wholesale',
    href: '/wholesale',
  },
  {
    label: 'Faq',
    href: '/faq',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

const DesktopNav = () => {
  const [isFullscreenMenuOpen, setIsFullscreenMenuOpen] = useState(false);
  const [isOrderProtectionOpen, setIsOrderProtectionOpen] = useState(false);
  return (
    <div className="hidden lg:flex justify-between py-2 text-sm text-gray-600">
      <div className="flex gap-6">
        <div
          onMouseEnter={() => setIsFullscreenMenuOpen(true)}
          onMouseLeave={() => setIsFullscreenMenuOpen(false)}
          className="cursor-pointer hover:text-hover-text"
        >
          All categories
          {isFullscreenMenuOpen && (
            <AllCategories
              isFullscreenMenuOpen={isFullscreenMenuOpen}
              setIsFullscreenMenuOpen={setIsFullscreenMenuOpen}
            />
          )}
        </div>
        {/* Navigation Links */}
        {leftNavLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-hover-text"
          >
            {link.label}
          </Link>
        ))}

        <div
          onMouseEnter={() => setIsOrderProtectionOpen(true)}
          onMouseLeave={() => setIsOrderProtectionOpen(false)}
          className="cursor-pointer hover:text-hover-text"
        >
          Order protections
          {isOrderProtectionOpen && (
            <OrderProtectionModal
              isOpen={isOrderProtectionOpen}
              setIsOpen={setIsOrderProtectionOpen}
            />
          )}
        </div>
      </div>

      <div className="flex gap-6">
        {rightNavLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-hover-text"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopNav;
