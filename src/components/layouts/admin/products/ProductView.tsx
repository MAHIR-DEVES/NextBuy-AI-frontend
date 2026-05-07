// src/components/modules/products/ProductView.tsx

import Image from 'next/image';
import { IProduct } from '@/types/products.type';

const ProductView = ({ product }: { product: IProduct | null }) => {
  if (!product) return null;

  return (
    <div className="space-y-5">
      <Image
        src={product.thumbnail}
        alt={product.name}
        width={300}
        height={300}
        className="rounded-xl object-cover"
      />

      <div>
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <p>
          <span className="font-semibold">Brand:</span> {product.brand}
        </p>

        <p>
          <span className="font-semibold">Category:</span> {product.category}
        </p>

        <p>
          <span className="font-semibold">Price:</span> ${product.price}
        </p>

        <p>
          <span className="font-semibold">Stock:</span> {product.stock}
        </p>

        <p>
          <span className="font-semibold">Rating:</span> {product.rating}
        </p>

        <p>
          <span className="font-semibold">Featured:</span>{' '}
          {product.isFeatured ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
};

export default ProductView;
