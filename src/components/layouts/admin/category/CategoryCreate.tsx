'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import CategoryForm from './CategoryForm';

import { CategoryPayload } from '@/types/category.types';
import { CategoryService } from '@/services/category.service';

import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';

interface CategoryCreateProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const initialForm: CategoryPayload = {
  name: '',
  slug: '',
  description: '',
  image: '',
  isActive: true,
};

const CategoryCreate = ({ open, onClose, onSuccess }: CategoryCreateProps) => {
  const [formData, setFormData] = useState<CategoryPayload>(initialForm);

  const [submitting, setSubmitting] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);

  if (!open) return null;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cloudinary Image Upload
  const handleImageChange = async (file: File | null) => {
    if (!file) {
      setFormData(prev => ({
        ...prev,
        image: '',
      }));

      return;
    }

    try {
      setUploadingImage(true);

      const imageUrl = await uploadImageToCloudinary(file);

      setFormData(prev => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uploadingImage) return;

    try {
      setSubmitting(true);

      await CategoryService.createCategory(formData);

      setFormData(initialForm);

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to create category:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting || uploadingImage) return;

    setFormData(initialForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-background p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">Create Category</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add a new product category
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

        <CategoryForm
          formData={formData}
          submitting={submitting}
          uploadingImage={uploadingImage}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          onImageChange={handleImageChange}
          onActiveChange={checked =>
            setFormData(prev => ({
              ...prev,
              isActive: checked,
            }))
          }
        />
      </div>
    </div>
  );
};

export default CategoryCreate;
