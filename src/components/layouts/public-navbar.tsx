"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const routes = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4 md:gap-0">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" />
              }
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className="block px-2 py-1 text-lg font-semibold transition-colors hover:text-primary"
                  >
                    {route.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block text-xl">NextBuy</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {routes.map((route) => (
                <NavigationMenuItem key={route.path}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href={route.path} />}>
                    {route.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:block">
            <SearchBar />
          </div>
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" render={<Link href="/login" />} nativeButton={false}>
              Login
            </Button>
            <Button render={<Link href="/register" />} nativeButton={false}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
