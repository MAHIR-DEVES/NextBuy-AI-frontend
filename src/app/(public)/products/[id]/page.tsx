// export default async function ProductDetailsPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   return (
//     <div className="container mx-auto py-10 px-4">
//       <h1 className="text-3xl font-bold mb-6">Product Details: {id}</h1>
//       <p className="text-muted-foreground">Product description and details will go here.</p>
//     </div>
//   );
// }

import {
  Star,
  Truck,
  Shield,
  RotateCcw,
  MessageCircle,
  Store,
  MapPin,
  Calendar,
  ChevronRight,
  Minus,
  Plus,
  Heart,
  Share2,
  Download,
  CheckCircle,
  Award,
  Clock,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Sample product data (replace with actual API call)
  const product = {
    id: id,
    name: 'Oraimo Watch 5 Lite Smart Watch OSW-804 with 2.01 Inch HD Display and 100 Plus Sports Modes',
    brand: 'Oraimo',
    category: 'Wearable Technology > Smartwatches',
    price: 1649,
    originalPrice: 1820,
    discount: 9,
    rating: 0,
    reviews: 0,
    color: 'Black',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop',
    ],
    features: [
      '2.01 Inch HD Display',
      '100+ Sports Modes',
      'Heart Rate Monitor',
      'Blood Oxygen Monitor',
      'Sleep Tracking',
      '5 ATM Water Resistant',
      '7 Days Battery Life',
      'Bluetooth Calling',
    ],
    seller: {
      name: 'oraimo',
      rating: 100,
      isNew: true,
      followers: 'Not enough data',
    },
    delivery: {
      location: 'Dhaka, Dhaka North, Banani Road No. 12 - 19',
      estimatedDate: '7-10 May',
      cashOnDelivery: true,
    },
    warranty: {
      easyReturn: '14 days easy return',
      brandWarranty: '1 Year Brand Warranty',
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-0 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/category" className="hover:text-orange-500">
            TV, Audio / Video, Gaming & W...
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/wearables" className="hover:text-orange-500">
            Wearable Technology
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/smartwatches" className="hover:text-orange-500">
            Smartwatches
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
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-orange-500 transition-colors"
                  >
                    <img
                      src={img}
                      alt={`Product ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Product Info */}
            <div>
              {/* Brand */}
              <Link
                href="#"
                className="text-orange-500 text-sm hover:underline"
              >
                {product.brand}
              </Link>

              {/* Title */}
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 mt-2 mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gray-300 text-gray-300" />
                  <span className="text-sm text-gray-500">No Ratings</span>
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
                    ₹ {product.price}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ₹ {product.originalPrice}
                  </span>
                  <span className="text-sm text-green-600 font-semibold">
                    -{product.discount}%
                  </span>
                </div>
              </div>

              {/* Color */}
              <div className="mb-4">
                <span className="text-sm text-gray-600">Color Family</span>
                <div className="mt-2">
                  <button className="px-4 py-2 border-2 border-orange-500 rounded-lg text-sm font-semibold text-gray-800">
                    {product.color}
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <span className="text-sm text-gray-600 block mb-2">
                  Quantity
                </span>
                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 border rounded-lg flex items-center justify-center hover:border-orange-500 transition-colors">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-12 text-center font-semibold">1</span>
                  <button className="w-8 h-8 border rounded-lg flex items-center justify-center hover:border-orange-500 transition-colors">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Buy Now
                </button>
                <button className="flex-1 border-2 border-orange-500 text-orange-500 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Add to Cart
                </button>
                <button className="w-12 h-12 border rounded-lg flex items-center justify-center hover:border-orange-500 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="w-12 h-12 border rounded-lg flex items-center justify-center hover:border-orange-500 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

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

              {/* App Download */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Download app to enjoy exclusive discounts!
                  </p>
                  <p className="text-xs text-gray-500">Scan with mobile</p>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Download className="h-5 w-5 text-white" />
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

        {/* Product Details Tabs */}
        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b px-6">
            <div className="flex gap-6 overflow-x-auto">
              <button className="py-4 border-b-2 border-orange-500 text-orange-500 font-semibold whitespace-nowrap">
                Product Details
              </button>
              <button className="py-4 text-gray-500 hover:text-orange-500 whitespace-nowrap">
                Specifications
              </button>
              <button className="py-4 text-gray-500 hover:text-orange-500 whitespace-nowrap">
                Reviews (0)
              </button>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map(item => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-gray-100 rounded-lg mb-3"></div>
                <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                  Smart Watch Pro
                </p>
                <p className="text-orange-500 font-bold mt-2">₹ 1,999</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
