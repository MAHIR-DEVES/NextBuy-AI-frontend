'use client';

import {
  Search,
  ShoppingCart,
  Menu,
  User,
  Briefcase,
  FileText,
  Package,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import AllCategories from './AllCategories';
import OrderProtectionModal from './OrderProtectionModal';
import { PromoBanner1 } from '@/components/promo-banner1';

const PublicNavbar = ({ className }: { className?: string }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isFullscreenMenuOpen, setIsFullscreenMenuOpen] = useState(false);
  const [isOrderProtectionOpen, setIsOrderProtectionOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Category data structure
  const categories = [
    {
      name: 'Electronics',
      subcategories: [
        'Smartphones',
        'Laptops',
        'Audio',
        'Cameras',
        'Wearables',
        'Gaming',
      ],
    },
    {
      name: 'Fashion',
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Kids' Fashion",
        'Shoes',
        'Accessories',
        'Bags',
      ],
    },
    {
      name: 'Home & Garden',
      subcategories: [
        'Furniture',
        'Decor',
        'Kitchen & Dining',
        'Bedding',
        'Bath',
        'Garden Tools',
      ],
    },
    {
      name: 'Sports & Entertainment',
      subcategories: [
        'Fitness Equipment',
        'Outdoor Gear',
        'Toys & Hobbies',
        'Musical Instruments',
        'Sports Apparel',
      ],
    },
  ];

  return (
    <section
      className={cn('border-b bg-white relative sticky top-0 z-50', className)}
    >
      <div
        className={`transition-all duration-300 overflow-hidden ${
          scrolled ? 'max-h-0 opacity-0 ' : 'max-h-[100px] opacity-100'
        }`}
      >
        <PromoBanner1 />
      </div>
      <div className=" ">
        <div className="container mx-auto px-4  ">
          {/* Top row - Main navbar */}
          <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
            {/* Left: Logo and category dropdown */}
            <div className="flex items-center gap-4">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2 shrink-0">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-orange-500">
                    NEXT
                  </span>
                  <span className="text-2xl font-bold text-gray-800">BUY</span>
                </div>
              </a>
            </div>

            {/* Center: Search bar */}
            <div className="flex-1 w-full mx-0 md:mx-4">
              <div className="relative flex w-full items-stretch">
                <Input
                  placeholder="Search products, manufacturers, suppliers..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 h-11 text-base border-r-0 rounded-r-none focus-visible:ring-1"
                />
                <Button className="h-11 rounded-l-none px-6 bg-orange-500 hover:bg-orange-600">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Right: User actions */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Sign in / Create account */}
              <div className="hidden lg:flex items-center gap-1 text-sm">
                <Button variant="ghost" size="sm" className="text-gray-700">
                  Sign in
                </Button>
                <span className="text-gray-300">|</span>
                <Button variant="ghost" size="sm" className="text-gray-700">
                  Create account
                </Button>
              </div>

              {/* Cart */}
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                  0
                </span>
              </Button>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-orange-500">
                          NEXT
                        </span>
                        <span className="text-xl font-bold text-gray-800">
                          BUY
                        </span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="p-4 space-y-6">
                    {/* User actions mobile */}
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <User className="h-4 w-4" />
                        Sign in
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <Briefcase className="h-4 w-4" />
                        Create account
                      </Button>
                    </div>

                    {/* Categories mobile */}
                    <div>
                      <h3 className="font-semibold mb-3">All categories</h3>
                      <div className="space-y-2">
                        {categories.map(cat => (
                          <a
                            key={cat.name}
                            href="#"
                            className="block py-2 text-gray-600 hover:text-orange-500"
                          >
                            {cat.name}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Additional links mobile */}
                    <div className="pt-4 border-t space-y-3">
                      <a
                        href="#"
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Zap className="h-4 w-4" /> Verified manufacturers
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Package className="h-4 w-4" /> Order protections
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <FileText className="h-4 w-4" /> Tax exemption
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Bottom row - Secondary navigation links (Desktop only) */}
          <div className="hidden lg:flex items-center gap-6 py-2 text-sm text-gray-600">
            <div className="flex items-center justify-between w-full">
              <div className="flex space-x-6">
                {/* All categories with hover fullscreen menu */}
                <div
                  onMouseEnter={() => setIsFullscreenMenuOpen(true)}
                  onMouseLeave={() => setIsFullscreenMenuOpen(false)}
                >
                  <div className="hover:text-orange-500 cursor-pointer py-2 -my-2 flex items-center">
                    All categories
                  </div>

                  {/* Fullscreen Dropdown Menu */}
                  {isFullscreenMenuOpen && (
                    <AllCategories
                      isFullscreenMenuOpen={isFullscreenMenuOpen}
                      setIsFullscreenMenuOpen={setIsFullscreenMenuOpen}
                    />
                  )}
                </div>

                {/* All categories with hover fullscreen menu */}
                <div
                  onMouseEnter={() => setIsOrderProtectionOpen(true)}
                  onMouseLeave={() => setIsOrderProtectionOpen(false)}
                >
                  <div className="hover:text-orange-500 cursor-pointer py-2 -my-2 flex items-center">
                    Order protections
                  </div>

                  {/* Order protections Menu */}
                  {isOrderProtectionOpen && (
                    <OrderProtectionModal
                      isOpen={isOrderProtectionOpen}
                      setIsOpen={setIsOrderProtectionOpen}
                    />
                  )}
                </div>

                <a href="#" className="hover:text-orange-500">
                  Accio Work
                </a>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-orange-500">
                  Order protections
                </a>
                <a href="#" className="hover:text-orange-500">
                  Tax exemption
                </a>
                <a href="#" className="hover:text-orange-500">
                  Buyer Central
                </a>
              </div>
            </div>
          </div>

          {/* Mobile secondary links - scrollable */}
          <div className="flex lg:hidden gap-4 py-2 text-xs text-gray-600 overflow-x-auto whitespace-nowrap border-t">
            <a href="#" className="hover:text-orange-500">
              Order protections
            </a>
            <a href="#" className="hover:text-orange-500">
              Tax exemption
            </a>
            <a href="#" className="hover:text-orange-500">
              Buyer Central
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PublicNavbar };
