import ProductActions from '@/components/layouts/public/cart/ProductActions';
import AddToCartButton from '@/components/layouts/public/cart/ProductActions';
import { getSingleProduct } from '@/services/product.service';
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
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getSingleProduct(id);

  // API response handling
  const apiProduct = res?.data;

  // normalize data (so UI never breaks)
  const product = {
    ...apiProduct,

    originalPrice:
      apiProduct.price + (apiProduct.price * apiProduct.discount) / 100,

    delivery: apiProduct.delivery || {
      location: 'Dhaka, Bangladesh',
      estimatedDate: '3-5 days',
      cashOnDelivery: true,
    },

    warranty: apiProduct.warranty || {
      easyReturn: '7 Days Easy Return',
      brandWarranty: '1 Year Brand Warranty',
    },

    seller: apiProduct.seller || {
      name: apiProduct.brand,
      rating: 95,
      followers: 'Trusted Seller',
      isNew: false,
    },
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />

        <span className="text-gray-800 truncate">{product.name}</span>
      </div>
      {/* Main Product Section */}
      <div className="bg-white rounded-xs shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Left - Product Images */}
          <div>
            <div className="relative h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product.images?.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-orange-500 transition-colors relative"
                >
                  <Image
                    src={img}
                    alt={`Product ${idx + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div>
            {/* Brand */}
            <Link href="#" className="text-orange-500 text-sm hover:underline">
              {product.brand}
            </Link>

            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mt-2 mb-3">
              {product.name}
            </h1>
            {/* description */}
            <p className="pb-2"> {product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-gray-300 text-gray-300" />
                <span className="text-sm text-gray-500">
                  {product.rating || 'No Ratings'}
                </span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">
                Brand: {product.brand}
              </span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-orange-500">
                  $ {product.price}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  $ {product.originalPrice}
                </span>
                <span className="text-sm text-green-600 font-semibold">
                  -{product.discount}%
                </span>
              </div>
            </div>

            {/* Action Buttons */}

            <ProductActions product={product} productId={product.id} />
            {/* Delivery Options */}
            <div className="border-t pt-4 mb-4">
              <h3 className="font-semibold text-gray-800 mb-3">
                Delivery Options
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    {product.delivery.location}
                  </span>
                  <button className="text-xs text-orange-500 ml-auto">
                    CHANGE
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Standard Delivery Guaranteed by{' '}
                    {product.delivery.estimatedDate}
                  </span>
                </div>
                {product.delivery.cashOnDelivery && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Cash on Delivery Available
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Return & Warranty */}
            <div className="border-t pt-4 mb-4">
              <h3 className="font-semibold text-gray-800 mb-3">
                Return & Warranty
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {product.warranty.easyReturn}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {product.warranty.brandWarranty}
                  </span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">Sold by</h3>
                <button className="text-sm text-orange-500">Chat Now</button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Store className="h-4 w-4 text-gray-500" />
                    <span className="font-semibold text-gray-800">
                      {product.seller.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-green-600 flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Positive Seller Ratings
                    </span>
                    {product.seller.isNew && (
                      <span className="text-blue-600">New Seller</span>
                    )}
                    <span className="text-gray-600">
                      {product.seller.rating}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.seller.followers}
                  </p>
                </div>

                <button className="text-sm text-orange-500 border border-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors">
                  GO TO STORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
