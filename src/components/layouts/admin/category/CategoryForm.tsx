'use client';

import Image from 'next/image';
import { Trash2, Upload } from 'lucide-react';
import type { ChangeEvent, FormEvent } from 'react';

import { CategoryPayload } from '@/types/category.types';

interface CategoryFormProps {
  formData: CategoryPayload;
  submitting: boolean;
  uploadingImage: boolean;
  isEdit?: boolean;

  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  onSubmit: (e: FormEvent<HTMLFormElement>) => void;

  onCancel: () => void;

  onActiveChange: (checked: boolean) => void;

  onImageChange: (file: File | null) => void;
}

const CategoryForm = ({
  formData,
  submitting,
  uploadingImage,
  isEdit = false,
  onChange,
  onSubmit,
  onCancel,
  onActiveChange,
  onImageChange,
}: CategoryFormProps) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    onImageChange(file);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>

        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Shoes"
          required
          className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="mb-1.5 block text-sm font-medium">
          Slug
        </label>

        <input
          id="slug"
          type="text"
          name="slug"
          value={formData.slug}
          onChange={onChange}
          placeholder="shoes"
          required
          className="w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description ?? ''}
          onChange={onChange}
          placeholder="Category description..."
          rows={3}
          className="w-full resize-none rounded-lg border bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Image */}
      <div>
        <label
          htmlFor="category-image"
          className="mb-1.5 block text-sm font-medium"
        >
          Category Image
        </label>

        {/* Image Preview */}
        {formData.image && (
          <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-lg border">
            <Image
              src={formData.image}
              alt="Category"
              fill
              className="object-cover"
              sizes="128px"
            />

            <button
              type="button"
              onClick={() => onImageChange(null)}
              disabled={uploadingImage || submitting}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Upload */}
        <label
          htmlFor="category-image"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-4 text-sm hover:bg-muted"
        >
          <Upload className="h-5 w-5" />

          {uploadingImage ? 'Uploading image...' : 'Choose Image'}

          <input
            id="category-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploadingImage || submitting}
            className="hidden"
          />
        </label>

        <p className="mt-1 text-xs text-muted-foreground">
          JPG, PNG, WEBP etc.
        </p>
      </div>

      {/* Status */}
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={formData.isActive ?? true}
          onChange={e => onActiveChange(e.target.checked)}
          className="h-4 w-4"
        />

        <span className="text-sm font-medium">Active Category</span>
      </label>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting || uploadingImage}
          className="rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting || uploadingImage}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {submitting
            ? 'Saving...'
            : isEdit
              ? 'Update Category'
              : 'Create Category'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
