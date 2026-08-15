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
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});

  const currentImage = selectedImage || activeImage;

  const handleGalleryClick = (image: string) => {
    setActiveImage(image);
    setSelectedImage(null);
    setZoomStyle({});
  };

  // Cursor position  zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;

    const rect = container.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2)',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  return (
    <div className="space-y-4">
      {/* MAIN IMAGE */}
      <div
        className="group relative h-[360px] overflow-hidden rounded-md border border-gray-200 bg-gray-50 md:h-[500px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {currentImage ? (
          <Image
            src={currentImage}
            alt={productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-150 ease-out"
            style={zoomStyle}
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
                  className="object-contain"
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
