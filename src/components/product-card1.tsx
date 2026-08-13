import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IProduct } from '@/types/products.type';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCard1Props {
  product: IProduct;
}

const ProductCard1 = ({ product }: ProductCard1Props) => {
  const salePrice = product.specialPrice ?? product.price;

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <Card className="h-full overflow-hidden p-0 border border-gray-100 dark:border-gray-800 hover:border-primary/40 hover:shadow-md transition-all duration-300">
        {/* IMAGE */}
        <CardHeader className="relative block p-0">
          <AspectRatio ratio={1.1} className="overflow-hidden">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                <span className="text-sm text-gray-400">No Image</span>
              </div>
            )}

            {/* DISCOUNT */}
            {product.discount && product.discount > 0 && (
              <Badge className="absolute left-2 top-2 bg-red-500 text-white hover:bg-red-500">
                -{product.discount}%
              </Badge>
            )}

            {/* FEATURED */}
            {product.isFeatured && (
              <Badge className="absolute right-2 top-2 bg-primary text-white">
                Featured
              </Badge>
            )}
          </AspectRatio>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="flex flex-col gap-1.5 p-3">
          {/* CATEGORY */}
          {product.category?.name && (
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              {product.category.name}
            </p>
          )}

          {/* NAME */}
          <CardTitle className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900 dark:text-white">
            {product.name}
          </CardTitle>

          {/* BRAND */}
          {product.brand && (
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
              {product.brand}
            </p>
          )}

          {/* PRICE */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
              ৳{salePrice.toLocaleString('en-BD')}
            </span>

            {product.specialPrice != null &&
              product.specialPrice < product.price && (
                <span className="text-xs text-gray-400 line-through">
                  ৳{product.price.toLocaleString('en-BD')}
                </span>
              )}
          </div>

          {/* RATING */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500 text-xs">★</span>

              <span className="text-xs text-gray-600 dark:text-gray-400">
                {product.rating > 0 ? product.rating.toFixed(1) : 'No rating'}
              </span>

              {product.reviewCount > 0 && (
                <span className="text-[11px] text-gray-400">
                  ({product.reviewCount})
                </span>
              )}
            </div>

            {/* STOCK */}
            <span
              className={`text-[11px] font-medium ${
                product.stock > 0 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export { ProductCard1 };
