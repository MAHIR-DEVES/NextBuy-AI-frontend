'use client';

import ProductActions from '@/components/layouts/public/cart/ProductActions';
import { IProduct } from '@/types/products.type';
import { useProductStore } from '@/store/product.store';
import { Check, ShieldCheck, Truck } from 'lucide-react';
import { useState } from 'react';
import { useOrderStore } from '@/store/order.store';

interface Props {
  product: IProduct;
}

const ProductPurchaseOptions = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { setSelectedImage, setSelectedColor, selectedColor } =
    useProductStore();
  const setOrderSelectedSize = useOrderStore(state => state.setSelectedSize);

  const handleColorClick = (image: string | null, color: string) => {
    setSelectedImage(image);
    setSelectedColor(color);
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Trust Features */}
      <div className="grid grid-cols-2 gap-3 rounded-md border border-gray-100 bg-gray-50 p-3">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-xs font-semibold text-gray-800">
              ক্যাশ অন ডেলিভারি
            </p>
            <p className="text-[11px] text-gray-500">সারা বাংলাদেশে</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-xs font-semibold text-gray-800">১০০% অরিজিনাল</p>
            <p className="text-[11px] text-gray-500">Guaranteed Product</p>
          </div>
        </div>
      </div>

      {/* Color */}
      {product.colorVariants?.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">
              কালার নির্বাচন করুন
            </h3>

            {selectedColor && (
              <span className="text-xs font-medium capitalize text-primary">
                {selectedColor}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {product.colorVariants.map(variant => {
              const isSelected = selectedColor === variant.color;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => handleColorClick(variant.image, variant.color)}
                  className={`group rounded-md border px-4 py-2.5 text-sm font-medium capitalize transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 text-primary shadow-sm ring-1 ring-primary'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isSelected && <Check className="h-4 w-4" />}

                    {variant.color}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product.colorVariants?.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">
              Available Sizes
            </h3>

            <span className="text-xs text-gray-500">Size নির্বাচন করুন</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.from(
              new Map(
                product.colorVariants
                  .flatMap(variant => variant.sizes ?? [])
                  .map(size => [size.size, size]),
              ).values(),
            ).map(size => {
              const isSelected = selectedSize === size.size;

              return (
                <button
                  key={size.id}
                  type="button"
                  disabled={size.stock <= 0}
                  onClick={() => {
                    setSelectedSize(size.size);
                    setOrderSelectedSize(size.size);
                  }}
                  className={`min-w-[64px] rounded-md border px-3 py-2.5 transition-all ${
                    size.stock <= 0
                      ? 'cursor-not-allowed border-gray-100 bg-gray-100 text-gray-400'
                      : isSelected
                        ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                        : 'border-gray-200 bg-white hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  <div className="text-sm font-semibold">{size.size}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock */}
      <div className="flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 px-4 py-3">
        <div>
          <p className="text-xs text-gray-500">Available Stock</p>
          <p className="mt-0.5 text-sm font-semibold text-gray-800">
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>

        <div
          className={`text-lg font-bold ${
            product.stock > 0 ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {product.stock}
        </div>
      </div>

      {/* Actions */}
      <ProductActions product={product} productId={product.id} />
    </div>
  );
};

export default ProductPurchaseOptions;
