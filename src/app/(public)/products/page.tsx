/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlidersHorizontal, Filter, ChevronRight } from 'lucide-react';

import { ProductCard1 } from '@/components/product-card1';
import { getProducts } from '@/services/product.service';
import Link from 'next/link';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type SearchParams = Promise<{
  page?: string;
  search?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: string;
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  rating?: string;
}>;

export default async function ProductListing({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Next.js 15+: searchParams is a Promise — must be awaited
  const sp = await searchParams;

  // API CALL WITH FILTERS
  const res = await getProducts({
    page: Number(sp?.page || 1),
    search: sp?.search,
    category: sp?.category,
    sortBy: sp?.sortBy,
    sortOrder: sp?.sortOrder as any,
    minPrice: sp?.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp?.maxPrice ? Number(sp.maxPrice) : undefined,
    brand: sp?.brand,
    rating: sp?.rating ? Number(sp.rating) : undefined,
  });

  const products = res?.data?.data || [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="#">Home</a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-800 font-medium">Products</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          {/* ================= LEFT FILTER ================= */}
          <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
            <div className="bg-white rounded-xs shadow-sm p-5 sticky top-4">
              {/* TITLE */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h2>
                {/* <a
                  href="/products"
                  className="text-sm text-orange-500 hover:underline"
                >
                  Reset
                </a> */}
                <Link
                  className="text-sm text-orange-500 hover:underline"
                  href={'/products'}
                >
                  Reset
                </Link>
              </div>

              {/* ================= SEARCH ================= */}
              <form method="get" className="mb-5">
                <input
                  type="hidden"
                  name="category"
                  value={sp?.category || ''}
                />
                <input type="hidden" name="brand" value={sp?.brand || ''} />
                <input type="hidden" name="rating" value={sp?.rating || ''} />
                <input
                  type="hidden"
                  name="minPrice"
                  value={sp?.minPrice || ''}
                />
                <input
                  type="hidden"
                  name="maxPrice"
                  value={sp?.maxPrice || ''}
                />
                <input type="hidden" name="sortBy" value={sp?.sortBy || ''} />
                <input
                  type="hidden"
                  name="sortOrder"
                  value={sp?.sortOrder || ''}
                />
                <input
                  type="search"
                  name="search"
                  placeholder="Search product..."
                  defaultValue={sp?.search || ''}
                  className="w-full border p-2 rounded-xs text-sm"
                />
              </form>

              {/* ================= PRICE FILTER ================= */}
              <div className="mb-5 border-b pb-4">
                <h3 className="font-semibold mb-2">Price</h3>

                <div className="space-y-2 text-sm">
                  <Link
                    href={`?maxPrice=50${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                    className="block hover:text-orange-500 flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.maxPrice === '50'}
                      readOnly
                    />
                    Under $50
                  </Link>
                  <Link
                    href={`?minPrice=50&maxPrice=100${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                    className="block hover:text-orange-500 flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.minPrice === '50'}
                      readOnly
                    />
                    $50 - $100
                  </Link>
                  <Link
                    href={`?minPrice=100&maxPrice=200${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                    className="block hover:text-orange-500 flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.minPrice === '100'}
                      readOnly
                    />
                    $100 - $200
                  </Link>
                  <Link
                    href={`?minPrice=200${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                    className="block hover:text-orange-500 flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.minPrice === '200'}
                      readOnly
                    />
                    $200+
                  </Link>
                </div>
              </div>

              {/* ================= RATING ================= */}
              <div className="mb-5 border-b pb-4">
                <h3 className="font-semibold mb-2">Rating</h3>

                <div className="space-y-2 text-sm">
                  <Link
                    href={`?rating=4${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                    className="block hover:text-orange-500 flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.rating === '4'}
                      readOnly
                    />
                    ⭐ 4 & above
                  </Link>
                  <Link
                    href={`?rating=3${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                    className="block hover:text-orange-500 flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.rating === '3'}
                      readOnly
                    />
                    ⭐ 3 & above
                  </Link>
                </div>
              </div>

              {/* ================= Category ================= */}
              <div className="mb-5 border-b pb-4">
                <h3 className="font-semibold mb-2">Category</h3>

                <div className="space-y-2 text-sm">
                  <Link
                    href={`?category=Smartphones${sp?.search ? '&search=' + sp.search : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                    className="block hover:text-orange-500  flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.category === 'Smartphones'}
                      readOnly
                    />
                    Smartphones
                  </Link>
                  <Link
                    href={`?category=Laptop${sp?.search ? '&search=' + sp.search : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                    className="block hover:text-orange-500  flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.category === 'Laptop'}
                      readOnly
                    />
                    Laptop
                  </Link>
                  <Link
                    href={`?category=Fashion${sp?.search ? '&search=' + sp.search : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                    className="block hover:text-orange-500  flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.category === 'Fashion'}
                      readOnly
                    />
                    Fashion
                  </Link>
                </div>
              </div>
              {/* ================= BRAND ================= */}
              <div className="mb-5 border-b pb-4">
                <h3 className="font-semibold mb-2">Brand</h3>

                <div className="space-y-2 text-sm">
                  <Link
                    href={`?brand=Apple${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                    className="block hover:text-orange-500  flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.brand === 'Apple'}
                      readOnly
                    />
                    Apple
                  </Link>
                  <Link
                    href={`?brand=Samsung${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                    className="block hover:text-orange-500  flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.brand === 'Samsung'}
                      readOnly
                    />
                    Samsung
                  </Link>
                  <Link
                    href={`?brand=Sony${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                    className="block hover:text-orange-500  flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.brand === 'Sony'}
                      readOnly
                    />
                    Sony
                  </Link>
                </div>
              </div>

              {/* ================= LATEST ================= */}
              <div className="mb-5">
                <h3 className="font-semibold mb-2">Sort By</h3>

                <div className="space-y-2 text-sm">
                  <Link
                    href={`?sortBy=createdAt&sortOrder=desc${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}`}
                    className="block hover:text-orange-500  flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.sortBy === 'createdAt'}
                      readOnly
                    />
                    Latest
                  </Link>
                  <Link
                    href={`?sortBy=price&sortOrder=asc${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}`}
                    className="block hover:text-orange-500  flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={
                        sp?.sortBy === 'price' && sp?.sortOrder === 'asc'
                      }
                      readOnly
                    />
                    Price Low to High
                  </Link>
                  <Link
                    href={`?sortBy=price&sortOrder=desc${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}`}
                    className="block hover:text-orange-500  flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={
                        sp?.sortBy === 'price' && sp?.sortOrder === 'desc'
                      }
                      readOnly
                    />
                    Price High to Low
                  </Link>
                  <Link
                    href={`?sortBy=rating&sortOrder=desc${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}`}
                    className="block hover:text-orange-500  flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={sp?.sortBy === 'rating'}
                      readOnly
                    />
                    Top Rated
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT PRODUCTS ================= */}
          <div className="flex-1">
            {/* TOP BAR */}
            <div className="bg-white rounded-xs shadow-sm p-4 mb-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm">
                <SlidersHorizontal className="h-4 w-4" />
                <span>{products.length} Products</span>
              </div>
              {/* MOBILE FILTER BUTTON */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex items-center gap-2 border bg-white px-4 py-2 rounded-xs text-sm font-medium shadow-sm">
                      <Filter className="h-4 w-4" />
                      Filters
                    </button>
                  </SheetTrigger>

                  <SheetContent
                    side="left"
                    className="w-[320px] overflow-y-auto p-0"
                  >
                    {/* HEADER */}
                    <div className="sticky top-0 z-10 bg-white border-b px-5 py-4 flex items-center justify-between">
                      <SheetHeader className="space-y-0">
                        <SheetTitle className="text-lg">Filters</SheetTitle>
                      </SheetHeader>

                      <SheetClose asChild>
                        <Link
                          href="/products"
                          className="text-sm text-orange-500 font-medium hover:underline"
                        >
                          Reset
                        </Link>
                      </SheetClose>
                    </div>

                    <div className="p-5">
                      {/* ================= SEARCH ================= */}
                      <form method="get" className="mb-6">
                        <input
                          type="hidden"
                          name="category"
                          value={sp?.category || ''}
                        />
                        <input
                          type="hidden"
                          name="brand"
                          value={sp?.brand || ''}
                        />
                        <input
                          type="hidden"
                          name="rating"
                          value={sp?.rating || ''}
                        />
                        <input
                          type="hidden"
                          name="minPrice"
                          value={sp?.minPrice || ''}
                        />
                        <input
                          type="hidden"
                          name="maxPrice"
                          value={sp?.maxPrice || ''}
                        />
                        <input
                          type="hidden"
                          name="sortBy"
                          value={sp?.sortBy || ''}
                        />
                        <input
                          type="hidden"
                          name="sortOrder"
                          value={sp?.sortOrder || ''}
                        />

                        <div>
                          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-500">
                            Search
                          </h3>

                          <input
                            type="search"
                            name="search"
                            placeholder="Search product..."
                            defaultValue={sp?.search || ''}
                            className="w-full border border-gray-200  outline-none p-3 rounded-xs text-sm"
                          />
                        </div>
                      </form>

                      {/* ================= PRICE FILTER ================= */}
                      <div className="mb-6 border-b pb-6">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-500">
                          Price
                        </h3>

                        <div className="space-y-2">
                          <SheetClose asChild>
                            <Link
                              href={`?maxPrice=50${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>Under $50</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href={`?minPrice=50&maxPrice=100${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>$50 - $100</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href={`?minPrice=100&maxPrice=200${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>$100 - $200</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href={`?minPrice=200${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>$200+</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                        </div>
                      </div>

                      {/* ================= RATING ================= */}
                      <div className="mb-6 border-b pb-6">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-500">
                          Rating
                        </h3>

                        <div className="space-y-2">
                          <SheetClose asChild>
                            <Link
                              href={`?rating=4${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>⭐ 4 & above</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href={`?rating=3${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>⭐ 3 & above</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                        </div>
                      </div>

                      {/* ================= CATEGORY ================= */}
                      <div className="mb-6 border-b pb-6">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-500">
                          Category
                        </h3>

                        <div className="space-y-2">
                          <SheetClose asChild>
                            <Link
                              href={`?category=Smartphones${sp?.search ? '&search=' + sp.search : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>Smartphones</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href={`?category=Laptop${sp?.search ? '&search=' + sp.search : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>Laptop</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href={`?category=Fashion${sp?.search ? '&search=' + sp.search : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>Fashion</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                        </div>
                      </div>

                      {/* ================= BRAND ================= */}
                      <div className="mb-6 border-b pb-6">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-500">
                          Brand
                        </h3>

                        <div className="space-y-2">
                          <SheetClose asChild>
                            <Link
                              href={`?brand=Apple${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>Apple</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href={`?brand=Samsung${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>Samsung</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href={`?brand=Sony${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>Sony</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                        </div>
                      </div>

                      {/* ================= SORT ================= */}
                      <div className="mb-4">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-500">
                          Sort By
                        </h3>

                        <div className="space-y-2">
                          <SheetClose asChild>
                            <Link
                              href={`?sortBy=createdAt&sortOrder=desc${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>Latest</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href={`?sortBy=price&sortOrder=asc${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>Price Low to High</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href={`?sortBy=price&sortOrder=desc${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>Price High to Low</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href={`?sortBy=rating&sortOrder=desc${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}`}
                              className="flex items-center justify-between rounded-xs border px-4 py-3 text-sm hover:border-orange-400 hover:bg-orange-50 transition"
                            >
                              <span>Top Rated</span>
                              <span>→</span>
                            </Link>
                          </SheetClose>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="text-sm text-gray-500 hidden lg:block">
                Use filters to refine
              </div>
            </div>

            {/* PRODUCTS */}
            {products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {products.map((product: any) => (
                  <ProductCard1
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.name,
                      image: {
                        src: product.thumbnail,
                        alt: product.name,
                      },
                      link: `/products/${product.id}`,
                      description: product.description,
                      price: {
                        regular: product.price,
                        sale: product.price,
                        currency: 'USD',
                      },
                      rating: product.rating || 0,
                      moq: product.stock || 1,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-10 text-center">No products found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { SlidersHorizontal, Filter, ChevronRight } from 'lucide-react';

// import { ProductCard1 } from '@/components/product-card1';
// import { getProducts } from '@/services/product.service';
// import Link from 'next/link';

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@/components/ui/sheet';

// type SearchParams = Promise<{
//   page?: string;
//   search?: string;
//   category?: string;
//   sortBy?: string;
//   sortOrder?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   brand?: string;
//   rating?: string;
// }>;

// export default async function ProductListing({
//   searchParams,
// }: {
//   searchParams: SearchParams;
// }) {
//   // ✅ Next.js 15+: searchParams is a Promise — must be awaited
//   const sp = await searchParams;

//   // 🚀 API CALL WITH FILTERS
//   const res = await getProducts({
//     page: Number(sp?.page || 1),
//     search: sp?.search,
//     category: sp?.category,
//     sortBy: sp?.sortBy,
//     sortOrder: sp?.sortOrder as any,
//     minPrice: sp?.minPrice ? Number(sp.minPrice) : undefined,
//     maxPrice: sp?.maxPrice ? Number(sp.maxPrice) : undefined,
//     brand: sp?.brand,
//     rating: sp?.rating ? Number(sp.rating) : undefined,
//   });

//   const products = res?.data?.data || [];

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="container mx-auto px-4 py-6">
//         {/* BREADCRUMB */}
//         <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
//           <Link href="#">Home</Link>
//           <ChevronRight className="h-3 w-3" />
//           <span className="text-gray-800 font-medium">Products</span>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-3">
//           {/* ================= LEFT FILTER DESKTOP ================= */}
//           <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
//             <div className="bg-white rounded-xs shadow-sm p-5 sticky top-4">
//               {/* TITLE */}
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-bold flex items-center gap-2">
//                   <Filter className="h-4 w-4" />
//                   Filters
//                 </h2>

//                 <Link
//                   className="text-sm text-orange-500 hover:underline"
//                   href={'/products'}
//                 >
//                   Reset
//                 </Link>
//               </div>

//               {/* ================= SEARCH ================= */}
//               <form method="get" className="mb-5">
//                 <input
//                   type="hidden"
//                   name="category"
//                   value={sp?.category || ''}
//                 />
//                 <input type="hidden" name="brand" value={sp?.brand || ''} />
//                 <input type="hidden" name="rating" value={sp?.rating || ''} />
//                 <input
//                   type="hidden"
//                   name="minPrice"
//                   value={sp?.minPrice || ''}
//                 />
//                 <input
//                   type="hidden"
//                   name="maxPrice"
//                   value={sp?.maxPrice || ''}
//                 />
//                 <input type="hidden" name="sortBy" value={sp?.sortBy || ''} />
//                 <input
//                   type="hidden"
//                   name="sortOrder"
//                   value={sp?.sortOrder || ''}
//                 />

//                 <input
//                   type="search"
//                   name="search"
//                   placeholder="Search product..."
//                   defaultValue={sp?.search || ''}
//                   className="w-full border p-2 rounded-lg text-sm"
//                 />
//               </form>

//               {/* ================= PRICE FILTER ================= */}
//               <div className="mb-5 border-b pb-4">
//                 <h3 className="font-semibold mb-2">Price</h3>

//                 <div className="space-y-2 text-sm">
//                   <a
//                     href={`?maxPrice=50${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     Under $50
//                   </a>

//                   <a
//                     href={`?minPrice=50&maxPrice=100${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     $50 - $100
//                   </a>

//                   <a
//                     href={`?minPrice=100&maxPrice=200${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     $100 - $200
//                   </a>

//                   <a
//                     href={`?minPrice=200${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     $200+
//                   </a>
//                 </div>
//               </div>

//               {/* ================= RATING ================= */}
//               <div className="mb-5 border-b pb-4">
//                 <h3 className="font-semibold mb-2">Rating</h3>

//                 <div className="space-y-2 text-sm">
//                   <a
//                     href={`?rating=4${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     ⭐ 4 & above
//                   </a>

//                   <a
//                     href={`?rating=3${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     ⭐ 3 & above
//                   </a>
//                 </div>
//               </div>

//               {/* ================= CATEGORY ================= */}
//               <div className="mb-5 border-b pb-4">
//                 <h3 className="font-semibold mb-2">Category</h3>

//                 <div className="space-y-2 text-sm">
//                   <a
//                     href={`?category=Smartphones${sp?.search ? '&search=' + sp.search : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     Smartphones
//                   </a>

//                   <a
//                     href={`?category=Laptop${sp?.search ? '&search=' + sp.search : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     Laptop
//                   </a>

//                   <a
//                     href={`?category=Fashion${sp?.search ? '&search=' + sp.search : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     Fashion
//                   </a>
//                 </div>
//               </div>

//               {/* ================= BRAND ================= */}
//               <div className="mb-5 border-b pb-4">
//                 <h3 className="font-semibold mb-2">Brand</h3>

//                 <div className="space-y-2 text-sm">
//                   <a
//                     href={`?brand=Apple${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     Apple
//                   </a>

//                   <a
//                     href={`?brand=Samsung${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     Samsung
//                   </a>

//                   <a
//                     href={`?brand=Sony${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     Sony
//                   </a>
//                 </div>
//               </div>

//               {/* ================= SORT ================= */}
//               <div className="mb-5">
//                 <h3 className="font-semibold mb-2">Sort By</h3>

//                 <div className="space-y-2 text-sm">
//                   <a
//                     href={`?sortBy=createdAt&sortOrder=desc${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     Latest
//                   </a>

//                   <a
//                     href={`?sortBy=price&sortOrder=asc${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     Price Low to High
//                   </a>

//                   <a
//                     href={`?sortBy=price&sortOrder=desc${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     Price High to Low
//                   </a>

//                   <a
//                     href={`?sortBy=rating&sortOrder=desc${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.minPrice ? '&minPrice=' + sp.minPrice : ''}${sp?.maxPrice ? '&maxPrice=' + sp.maxPrice : ''}`}
//                     className="block hover:text-orange-500"
//                   >
//                     Top Rated
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ================= RIGHT PRODUCTS ================= */}
//           <div className="flex-1">
//             {/* TOP BAR */}
//             <div className="bg-white rounded-xs shadow-sm p-4 mb-3 flex justify-between items-center">
//               <div className="flex items-center gap-2 text-sm">
//                 <SlidersHorizontal className="h-4 w-4" />
//                 <span>{products.length} Products</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 {/* MOBILE FILTER BUTTON */}
//                 <div className="lg:hidden">
//                   <Sheet>
//                     <SheetTrigger asChild>
//                       <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm">
//                         <Filter className="h-4 w-4" />
//                         Filters
//                       </button>
//                     </SheetTrigger>

//                     <SheetContent
//                       side="left"
//                       className="w-[280px] overflow-y-auto"
//                     >
//                       <SheetHeader>
//                         <SheetTitle>Filters</SheetTitle>
//                       </SheetHeader>

//                       <div className="mt-6">
//                         {/* ================= SEARCH ================= */}
//                         <form method="get" className="mb-5">
//                           <input
//                             type="hidden"
//                             name="category"
//                             value={sp?.category || ''}
//                           />
//                           <input
//                             type="hidden"
//                             name="brand"
//                             value={sp?.brand || ''}
//                           />
//                           <input
//                             type="hidden"
//                             name="rating"
//                             value={sp?.rating || ''}
//                           />
//                           <input
//                             type="hidden"
//                             name="minPrice"
//                             value={sp?.minPrice || ''}
//                           />
//                           <input
//                             type="hidden"
//                             name="maxPrice"
//                             value={sp?.maxPrice || ''}
//                           />
//                           <input
//                             type="hidden"
//                             name="sortBy"
//                             value={sp?.sortBy || ''}
//                           />
//                           <input
//                             type="hidden"
//                             name="sortOrder"
//                             value={sp?.sortOrder || ''}
//                           />

//                           <input
//                             type="search"
//                             name="search"
//                             placeholder="Search product..."
//                             defaultValue={sp?.search || ''}
//                             className="w-full border p-2 rounded-lg text-sm"
//                           />
//                         </form>

//                         {/* ================= PRICE FILTER ================= */}
//                         <div className="mb-5 border-b pb-4">
//                           <h3 className="font-semibold mb-2">Price</h3>

//                           <div className="space-y-2 text-sm">
//                             <a
//                               href={`?maxPrice=50${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                               className="block hover:text-orange-500"
//                             >
//                               Under $50
//                             </a>

//                             <a
//                               href={`?minPrice=50&maxPrice=100${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                               className="block hover:text-orange-500"
//                             >
//                               $50 - $100
//                             </a>

//                             <a
//                               href={`?minPrice=100&maxPrice=200${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                               className="block hover:text-orange-500"
//                             >
//                               $100 - $200
//                             </a>

//                             <a
//                               href={`?minPrice=200${sp?.search ? '&search=' + sp.search : ''}${sp?.category ? '&category=' + sp.category : ''}${sp?.brand ? '&brand=' + sp.brand : ''}${sp?.rating ? '&rating=' + sp.rating : ''}${sp?.sortBy ? '&sortBy=' + sp.sortBy : ''}${sp?.sortOrder ? '&sortOrder=' + sp.sortOrder : ''}`}
//                               className="block hover:text-orange-500"
//                             >
//                               $200+
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </SheetContent>
//                   </Sheet>
//                 </div>

//                 <div className="hidden sm:block text-sm text-gray-500">
//                   Use filters to refine
//                 </div>
//               </div>
//             </div>

//             {/* PRODUCTS */}
//             {products.length > 0 ? (
//               <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
//                 {products.map((product: any) => (
//                   <ProductCard1
//                     key={product.id}
//                     product={{
//                       id: product.id,
//                       name: product.name,
//                       image: {
//                         src: product.thumbnail,
//                         alt: product.name,
//                       },
//                       link: `/products/${product.id}`,
//                       description: product.description,
//                       price: {
//                         regular: product.price,
//                         sale: product.price,
//                         currency: 'USD',
//                       },
//                       rating: product.rating || 0,
//                       moq: product.stock || 1,
//                     }}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="bg-white p-10 text-center">No products found</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
