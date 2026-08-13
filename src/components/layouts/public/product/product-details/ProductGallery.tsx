'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useProductStore } from '@/store/product.store';

interface ProductGalleryProps {
  thumbnail: string;
  images: string[];
  productName: string;
}

const ProductGallery = ({
  thumbnail,
  images,
  productName,
}: ProductGalleryProps) => {
  const selectedImage = useProductStore(state => state.selectedImage);
  const setSelectedImage = useProductStore(state => state.setSelectedImage);

  const galleryImages = useMemo(() => {
    return Array.from(new Set([thumbnail, ...(images || [])].filter(Boolean)));
  }, [thumbnail, images]);

  const [activeImage, setActiveImage] = useState(thumbnail);

  // Zustand থেকে color variant image এলে main image change হবে
  const currentImage = selectedImage || activeImage;

  // Gallery thumbnail click
  const handleGalleryClick = (image: string) => {
    setActiveImage(image);

    // Color variant image clear
    setSelectedImage(null);
  };

  return (
    <div className="space-y-4">
      {/* MAIN IMAGE */}
      <div className="relative h-[360px] overflow-hidden rounded-md border border-gray-200 bg-gray-50 md:h-[500px]">
        {currentImage ? (
          <Image
            src={currentImage}
            alt={productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-5"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* GALLERY */}
      {galleryImages.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {galleryImages.map((image, index) => {
            const isActive = currentImage === image;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => handleGalleryClick(image)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 bg-gray-50 transition-all md:h-24 md:w-24 ${
                  isActive
                    ? 'border-primary ring-2 ring-primary/10'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} ${index + 1}`}
                  fill
                  sizes="96px"
                  className="object-contain p-1.5"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
