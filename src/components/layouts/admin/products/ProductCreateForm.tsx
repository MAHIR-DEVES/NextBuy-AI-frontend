// src/components/modules/products/ProductCreateForm.tsx

'use client';

import { useState } from 'react';
import { getToken } from '@/utils/auth';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';

type Props = {
  refetch: () => void;
  closeModal: () => void;
};

const ProductCreateForm = ({ refetch, closeModal }: Props) => {
  const [loading, setLoading] = useState(false);

  const [imageUploading, setImageUploading] = useState(false);

  const [images, setImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: 0,
    discount: 0,
    stock: 0,
    thumbnail: '',
    brand: '',
    category: '',
    rating: 0,
    reviewCount: 0,
    isFeatured: false,
    isPublished: true,
  });

  // INPUT HANDLE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'number'
          ? Number(value)
          : type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : value,
    }));
  };

  // THUMBNAIL UPLOAD
  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setImageUploading(true);

      const imageUrl = await uploadImageToCloudinary(file);

      setFormData(prev => ({
        ...prev,
        thumbnail: imageUrl || '',
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setImageUploading(false);
    }
  };

  // MULTIPLE IMAGE UPLOAD
  const handleMultipleImagesUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;

    if (!files) return;

    try {
      setImageUploading(true);

      const uploadedImages: string[] = [];

      for (const file of Array.from(files)) {
        const imageUrl = await uploadImageToCloudinary(file);

        if (imageUrl) {
          uploadedImages.push(imageUrl);
        }
      }

      setImages(uploadedImages);
    } catch (error) {
      console.log(error);
    } finally {
      setImageUploading(false);
    }
  };

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = getToken();

      // FINAL DATA
      const productData = {
        ...formData,
        images,
      };

      console.log(productData);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const result = await res.json();

      console.log(result);

      refetch();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* NAME */}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        className="w-full border p-3 rounded-lg"
        onChange={handleChange}
      />

      {/* SLUG */}
      <input
        type="text"
        name="slug"
        placeholder="Slug"
        className="w-full border p-3 rounded-lg"
        onChange={handleChange}
      />

      {/* BRAND */}
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        className="w-full border p-3 rounded-lg"
        onChange={handleChange}
      />

      {/* CATEGORY */}
      <input
        type="text"
        name="category"
        placeholder="Category"
        className="w-full border p-3 rounded-lg"
        onChange={handleChange}
      />

      {/* PRICE */}
      <input
        type="number"
        name="price"
        placeholder="Price"
        className="w-full border p-3 rounded-lg"
        onChange={handleChange}
      />

      {/* DISCOUNT */}
      <input
        type="number"
        name="discount"
        placeholder="Discount"
        className="w-full border p-3 rounded-lg"
        onChange={handleChange}
      />

      {/* STOCK */}
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        className="w-full border p-3 rounded-lg"
        onChange={handleChange}
      />

      {/* RATING */}
      <input
        type="number"
        step="0.1"
        name="rating"
        placeholder="Rating"
        className="w-full border p-3 rounded-lg"
        onChange={handleChange}
      />

      {/* REVIEW COUNT */}
      <input
        type="number"
        name="reviewCount"
        placeholder="Review Count"
        className="w-full border p-3 rounded-lg"
        onChange={handleChange}
      />

      {/* THUMBNAIL */}
      <div className="space-y-2">
        <label className="font-medium">Thumbnail Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailUpload}
          className="w-full border p-3 rounded-lg"
        />

        {formData.thumbnail && (
          <img
            src={formData.thumbnail}
            alt="thumbnail"
            className="w-32 h-32 rounded-lg object-cover"
          />
        )}
      </div>

      {/* MULTIPLE IMAGES */}
      <div className="space-y-2">
        <label className="font-medium">Product Images</label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleMultipleImagesUpload}
          className="w-full border p-3 rounded-lg"
        />

        <div className="flex gap-3 flex-wrap">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="product"
              className="w-24 h-24 rounded-lg object-cover"
            />
          ))}
        </div>
      </div>

      {/* DESCRIPTION */}
      <textarea
        name="description"
        placeholder="Description"
        className="w-full border p-3 rounded-lg h-32"
        onChange={handleChange}
      />

      {/* FEATURED */}
      <div className="flex items-center gap-2">
        <input type="checkbox" name="isFeatured" onChange={handleChange} />

        <label>Featured Product</label>
      </div>

      {/* PUBLISHED */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked
          onChange={handleChange}
        />

        <label>Published</label>
      </div>

      <button
        disabled={loading || imageUploading}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        {loading
          ? 'Creating...'
          : imageUploading
            ? 'Uploading Image...'
            : 'Create Product'}
      </button>
    </form>
  );
};

export default ProductCreateForm;
