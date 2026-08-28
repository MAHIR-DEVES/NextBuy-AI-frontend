'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import ProductCreateForm from '@/components/layouts/admin/create-product/ProductCreateForm';
import { getSingleProduct } from '@/services/product.service';
import { IProduct } from '@/types/products.type';
import LoadingSpinner from '@/components/layouts/admin/shared/dashboard/LoadingSpinner';

function UpdateProductContent() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get('slug');

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productSlug) {
      return;
    }

    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await getSingleProduct(productSlug);

        if (isMounted) {
          setProduct(response?.data ?? response ?? null);
        }
      } catch (error) {
        console.error('Failed to fetch product for edit:', error);

        if (isMounted) {
          setProduct(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productSlug]);

  if (!productSlug) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-sm text-red-600 dark:text-red-400">
        Product slug is missing.
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner message="product" />;
  }

  if (!product) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-sm text-red-600 dark:text-red-400">
        Product not found.
      </div>
    );
  }

  return <ProductCreateForm mode="edit" initialProduct={product} />;
}

export default function UpdateProductPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="product" />}>
      <UpdateProductContent />
    </Suspense>
  );
}
