import ProductGallery from '@/components/layouts/public/product/product-details/ProductGallery';
import ProductPurchaseOptions from '@/components/layouts/public/product/product-details/ProductPurchaseOptions';
import ProductReviews from '@/components/layouts/public/product/product-details/ProductReviews';
import { getSingleProduct } from '@/services/product.service';
import { IProductColorVariant } from '@/types/products.type';
import {
  Star,
  Truck,
  Shield,
  RotateCcw,
  Store,
  MapPin,
  CheckCircle,
  Award,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const res = await getSingleProduct(id);

  const product = res?.data;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Product not found
        </h1>

        <Link
          href="/products"
          className="inline-block mt-4 text-primary hover:underline"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const currentPrice = product.specialPrice ?? product.price;

  const originalPrice =
    product.specialPrice != null && product.specialPrice < product.price
      ? product.price
      : product.discount && product.discount > 0
        ? Math.round(product.price / (1 - product.discount / 100))
        : null;

  return (
    <div className="container mx-auto px-3 md:px-4 py-8 md:py-10">
      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>

        <ChevronRight className="h-3.5 w-3.5" />

        <Link
          href={`/products?category=${product.category?.slug}`}
          className="hover:text-primary"
        >
          {product.category?.name}
        </Link>

        <ChevronRight className="h-3.5 w-3.5" />

        <span className="text-gray-800 truncate max-w-[250px]">
          {product.name}
        </span>
      </div>

      {/* =====================================================
          MAIN PRODUCT
      ====================================================== */}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-3 md:p-7">
          {/* =================================================
              LEFT SIDE - IMAGE GALLERY
          ================================================== */}

          <div>
            <ProductGallery
              thumbnail={product.thumbnail}
              images={product.images || []}
              productName={product.name}
            />
          </div>

          {/* =================================================
              RIGHT SIDE - PRODUCT INFORMATION
          ================================================== */}

          <div className="flex flex-col">
            {/* Brand */}

            {product.brand && (
              <Link
                href="#"
                className="text-primary text-sm font-medium hover:underline mb-1"
              >
                {product.brand}
              </Link>
            )}

            {/* Product Name */}

            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
              {product.name}
            </h1>

            {/* Description */}

            {product.description && (
              <p className="text-sm text-gray-600 mt-3 leading-6">
                {product.description}
              </p>
            )}

            {/* Rating */}

            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1">
                <Star
                  className={`h-4 w-4 ${
                    product.rating > 0
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />

                <span className="text-sm text-gray-600">
                  {product.rating > 0
                    ? product.rating.toFixed(1)
                    : 'No Ratings'}
                </span>
              </div>

              <span className="text-gray-300">|</span>

              <span className="text-sm text-gray-500">
                {product.reviewCount || 0} Reviews
              </span>

              <span className="text-gray-300">|</span>

              <span className="text-sm text-gray-500">
                {product.viewCount || 0} Views
              </span>
            </div>

            {/* =================================================
                PRICE
            ================================================== */}

            <div className="bg-gray-50 rounded-lg p-4 mt-5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-3xl font-bold text-title">
                  ৳{currentPrice.toLocaleString()}
                </span>

                {originalPrice && originalPrice > currentPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ৳{originalPrice.toLocaleString()}
                  </span>
                )}

                {product.discount && product.discount > 0 && (
                  <span className="text-sm text-green-600 font-semibold">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            {/* =================================================
                PURCHASE OPTIONS
            ================================================== */}

            <ProductPurchaseOptions product={product} />

            {/* =================================================
                DELIVERY
            ================================================== */}

            <div className="border-t mt-5 pt-5">
              <h3 className="font-semibold text-gray-800 mb-3">
                Delivery Options
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />

                  <span className="text-sm text-gray-600">
                    Dhaka, Bangladesh
                  </span>

                  <button className="text-xs text-primary ml-auto">
                    CHANGE
                  </button>
                </div>

                <div className="flex items-start gap-2">
                  <Truck className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />

                  <span className="text-sm text-gray-600">
                    Standard Delivery Guaranteed by 3-5 days
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />

                  <span className="text-sm text-gray-600">
                    Cash on Delivery Available
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                RETURN & WARRANTY
            ================================================== */}

            {/* <div className="border-t mt-5 pt-5">
              <h3 className="font-semibold text-gray-800 mb-3">
                Return & Warranty
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-gray-400" />

                  <span className="text-sm text-gray-600">
                    7 Days Easy Return
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-400" />

                  <span className="text-sm text-gray-600">
                    {product.warrantyType || 'No Warranty'}
                    {product.warrantyPeriod
                      ? ` - ${product.warrantyPeriod}`
                      : ''}
                  </span>
                </div>
              </div>
            </div> */}

            {/* =================================================
                SELLER
            ================================================== */}

            {/* <div className="border-t mt-5 pt-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Sold by</h3>

                <button className="text-sm text-primary">Chat Now</button>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Store className="h-4 w-4 text-gray-500" />

                    <span className="font-semibold text-gray-800">
                      {product.brand || 'Our Store'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600 flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Trusted Seller
                    </span>
                  </div>
                </div>

                <button className="shrink-0 text-sm text-title border border-primary-light px-4 py-2 rounded-lg hover:bg-button-hover-1 transition-colors">
                  GO TO STORE
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* =====================================================
          PRODUCT DETAILS
      ====================================================== */}

      <div className="mt-8 bg-white rounded-lg border border-gray-100 shadow-sm">
        <div className="p-5 md:p-7">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Product Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            {product.model && (
              <div className="flex justify-between border-b pb-3">
                <span className="text-sm text-gray-500">Model</span>
                <span className="text-sm font-medium text-gray-800">
                  {product.model}
                </span>
              </div>
            )}

            {product.material && (
              <div className="flex justify-between border-b pb-3">
                <span className="text-sm text-gray-500">Material</span>
                <span className="text-sm font-medium text-gray-800">
                  {product.material}
                </span>
              </div>
            )}

            {product.weight != null && (
              <div className="flex justify-between border-b pb-3">
                <span className="text-sm text-gray-500">Weight</span>
                <span className="text-sm font-medium text-gray-800">
                  {product.weight}
                </span>
              </div>
            )}

            {product.category?.name && (
              <div className="flex justify-between border-b pb-3">
                <span className="text-sm text-gray-500">Category</span>
                <span className="text-sm font-medium text-gray-800">
                  {product.category.name}
                </span>
              </div>
            )}
          </div>

          {/* Highlights */}

          {product.highlights?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Highlights</h3>

              <ul className="space-y-2">
                {product.highlights.map((highlight: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />

                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          REVIEWS
      ====================================================== */}

      {/* Reviews */}
      <ProductReviews
        reviews={product.reviews || []}
        rating={product.rating}
        reviewCount={product.reviewCount}
      />
    </div>
  );
}
