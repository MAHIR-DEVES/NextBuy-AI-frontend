import React, { useState } from 'react';
import {
  Menu,
  User,
  FileText,
  Package,
  Smartphone,
  Laptop,
  Shirt,
  Gamepad2,
  Watch,
  Shield,
  Home,
  Monitor,
  Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { IUser } from '@/types/auth';
interface UserDropdownProps {
  user: IUser | null;
}
const MobileNavbar = ({ user }: UserDropdownProps) => {
  // ✅ Controlled state for mobile sidebar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // ✅ Single helper — pass as onClick to every link inside the sidebar
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  return (
    <div className="md:hidden">
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-8 w-8" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-80 p-0 overflow-y-auto">
          {/* Header */}
          <div className="p-4 border-b">
            <SheetHeader className="p-0">
              <SheetTitle>
                <Link
                  href="/"
                  className="flex items-center gap-2 shrink-0"
                  onClick={closeMobileMenu}
                >
                  <div className="flex items-center">
                    <Image
                      src="/images/sera-place-logo.png"
                      alt="Logo"
                      width={110}
                      height={110}
                    />
                  </div>
                </Link>
              </SheetTitle>
            </SheetHeader>
          </div>

          <div className="p-4 space-y-6">
            {/* USER SECTION */}
            <div className="space-y-3">
              {user ? (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="rounded-full object-cover ring-2 ring-primary-light"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/login" onClick={closeMobileMenu}>
                    <Button className="w-full bg-gradient-primary hover:bg-gradient-primary-hover mb-2">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/register" onClick={closeMobileMenu}>
                    <Button variant="outline" className="w-full">
                      Create account
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* CATEGORY SECTION */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {[
                  { name: 'Smartphones', icon: Smartphone },
                  { name: 'Laptop', icon: Laptop },
                  { name: 'Fashion', icon: Shirt },
                  { name: 'Gaming', icon: Gamepad2 },
                  { name: 'Accessories', icon: Watch },
                  { name: 'Electronics', icon: Monitor },
                  { name: 'Home & Garden', icon: Home },
                  { name: 'Sports & Entertainment', icon: Trophy },
                ].map(cat => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.name}
                      href={`/products?category=${cat.name}`}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-title transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* BRAND SECTION */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Brands
              </h3>
              <div className="space-y-1">
                {['Apple', 'Samsung', 'Sony', 'Xiaomi', 'Dell'].map(brand => (
                  <Link
                    key={brand}
                    href={`/products?brand=${brand}`}
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-orange-500 transition-colors"
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            </div>

            {/* EXTRA LINKS */}
            <div className="pt-4 border-t space-y-3">
              <Link
                href="/products?verified=true"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Shield className="h-4 w-4" />
                Verified manufacturers
              </Link>

              <Link
                href="/products?orderProtection=true"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-orange-500 transition-colors"
              >
                <Package className="h-4 w-4" />
                Order protections
              </Link>

              <Link
                href="/products?taxExemption=true"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-orange-500 transition-colors"
              >
                <FileText className="h-4 w-4" />
                Tax exemption
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
