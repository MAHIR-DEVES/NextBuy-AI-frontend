'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import CategoryForm from './CategoryForm';

import { Category, CategoryPayload } from '@/types/category.types';

import { CategoryService } from '@/services/category.service';

import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';

interface CategoryEditProps {
  category: Category | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CategoryEdit = ({
  category,
  open,
  onClose,
  onSuccess,
}: CategoryEditProps) => {
  const [formData, setFormData] = useState<CategoryPayload | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);

  /*
   * Don't render if modal is closed
   * or no category is selected.
   */
  if (!open || !category) {
    return null;
  }

  /*
   * Create initial form data from selected category.
   */
  const currentFormData: CategoryPayload = formData ?? {
    name: category.name,
    slug: category.slug,
    description: category.description ?? '',
    image: category.image ?? '',
    isActive: category.isActive,
  };

  /*
   * Handle text input changes
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...(prev ?? currentFormData),
      [name]: value,
    }));
  };

  /*
   * Handle image upload
   */
  const handleImageChange = async (file: File | null) => {
    /*
     * Remove current image
     */
    if (!file) {
      setFormData(prev => ({
        ...(prev ?? currentFormData),
        image: '',
      }));

      return;
    }

    try {
      setUploadingImage(true);

      /*
       * Upload image to Cloudinary
       */
      const imageUrl = await uploadImageToCloudinary(file);

      /*
       * Save Cloudinary URL into formData
       */
      setFormData(prev => ({
        ...(prev ?? currentFormData),
        image: imageUrl,
      }));
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  /*
   * Handle active status
   */
  const handleActiveChange = (checked: boolean) => {
    setFormData(prev => ({
      ...(prev ?? currentFormData),
      isActive: checked,
    }));
  };

  /*
   * Submit update
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /*
     * Don't submit while image is uploading
     */
    if (uploadingImage) return;

    try {
      setSubmitting(true);

      await CategoryService.updateCategory(category.id, currentFormData);

      onSuccess();
      onClose();

      /*
       * Reset form for next edit
       */
      setFormData(null);
    } catch (error) {
      console.error('Failed to update category:', error);
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * Close modal
   */
  const handleClose = () => {
    if (submitting || uploadingImage) return;

    setFormData(null);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-background p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">Update Category</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update category information
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={submitting || uploadingImage}
            className="rounded-lg p-2 hover:bg-muted disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <CategoryForm
          formData={currentFormData}
          submitting={submitting}
          uploadingImage={uploadingImage}
          isEdit
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          onImageChange={handleImageChange}
          onActiveChange={handleActiveChange}
        />
      </div>
    </div>
  );
};

export default CategoryEdit;
