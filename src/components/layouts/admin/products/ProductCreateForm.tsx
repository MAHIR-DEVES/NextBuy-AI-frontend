'use client';

import { useState } from 'react';
import { getToken } from '@/utils/auth';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import {
  X,
  Upload,
  Package,
  DollarSign,
  Percent,
  Box,
  Tag,
  Star,
  Image as ImageIcon,
  Plus,
  Loader2,
} from 'lucide-react';

type Props = {
  refetch: () => void;
  closeModal: () => void;
};

const ProductCreateForm = ({ refetch, closeModal }: Props) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [images, setImages] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: 0,
    discount: 0,
    stock: 0,
    brand: '',
    category: '',
    rating: 0,
    isFeatured: false,
    isPublished: true,
  });

  // slug generator
  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  // input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData(prev => {
      const updated = {
        ...prev,
        [name]:
          type === 'number'
            ? Number(value)
            : type === 'checkbox'
              ? (e.target as HTMLInputElement).checked
              : value,
      };

      if (name === 'name') {
        updated.slug = generateSlug(value);
      }

      return updated;
    });
  };

  // thumbnail upload
  const handleThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImageToCloudinary(file);
      if (url) setThumbnail(url);
    } finally {
      setUploading(false);
    }
  };

  // multiple images upload
  const handleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      setUploading(true);
      const uploaded: string[] = [];

      for (const file of Array.from(files)) {
        const url = await uploadImageToCloudinary(file);
        if (url) uploaded.push(url);
      }

      setImages(prev => [...prev, ...uploaded]);
    } finally {
      setUploading(false);
    }
  };

  // remove image
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = getToken();

      const payload = {
        ...formData,
        slug: formData.slug || generateSlug(formData.name),
        thumbnail,
        images,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log(result);

      refetch();
      closeModal();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[80vh] overflow-y-auto px-1"
    >
      {/* Basic Information Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
          <Package className="w-4 h-4 text-orange-500" />
          Basic Information
        </h3>

        {/* Product Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Product Name *
          </label>
          <input
            name="name"
            placeholder="Enter product name"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>

        {/* Slug (Auto-generated, read-only) */}
        {formData.slug && (
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Slug (Auto-generated)
            </label>
            <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
              {formData.slug}
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter product description..."
            rows={3}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          />
        </div>
      </div>

      {/* Pricing & Stock Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
          <DollarSign className="w-4 h-4 text-green-500" />
          Pricing & Stock
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Price */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                name="price"
                placeholder="0.00"
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Discount */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Discount (%)
            </label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                name="discount"
                placeholder="0"
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Stock *
            </label>
            <div className="relative">
              <Box className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                name="stock"
                placeholder="0"
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand & Category Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
          <Tag className="w-4 h-4 text-blue-500" />
          Product Classification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Brand */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Brand
            </label>
            <input
              name="brand"
              placeholder="Enter brand name"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <input
              name="category"
              placeholder="Enter category"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rating (0-5)
            </label>
            <div className="relative">
              <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                step="0.1"
                name="rating"
                placeholder="0"
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
          <ImageIcon className="w-4 h-4 text-purple-500" />
          Product Images
        </h3>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Thumbnail Image *
          </label>
          {!thumbnail ? (
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-colors bg-gray-50 dark:bg-gray-800/50 py-6">
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click to upload thumbnail
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  SVG, PNG, JPG (max. 2MB)
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnail}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative inline-block">
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="w-24 h-24 object-cover rounded-lg border-2 border-orange-500"
              />
              <button
                type="button"
                onClick={() => setThumbnail('')}
                className="absolute -top-2 -right-2 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Multiple Images Upload */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Additional Images
          </label>
          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-colors bg-gray-50 dark:bg-gray-800/50 py-4">
            <div className="flex flex-col items-center justify-center">
              <Plus className="w-6 h-6 text-gray-400 mb-1" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add more images
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              className="hidden"
            />
          </label>

          {images.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-3">
              {images.map((img, i) => (
                <div key={i} className="relative w-20 h-20 group">
                  <img
                    src={img}
                    alt={`Product ${i + 1}`}
                    className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured & Published Toggles */}
      <div className="space-y-3 pt-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="isFeatured"
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Featured Product
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-green-500 focus:ring-green-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Publish immediately
          </span>
        </label>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={closeModal}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading || uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {loading ? 'Creating...' : 'Uploading...'}
            </>
          ) : (
            'Create Product'
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductCreateForm;
