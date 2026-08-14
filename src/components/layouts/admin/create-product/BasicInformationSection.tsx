import { CategoryService } from '@/services/category.service';
import { Category } from '@/types/category.types';
import { Package } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BasicInformationSectionProps {
  formData: {
    name: string;
    slug: string;
    description: string;
    brand: string;
    category: string;
    tags: string;
  };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}

export const BasicInformationSection = ({
  formData,
  onChange,
}: BasicInformationSectionProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);

        const response = await CategoryService.getAllCategories();

        setCategories(response.data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="space-y-4">
      <SectionTitle
        icon={<Package className="w-4 h-4 text-orange-500" />}
        title="Basic Information"
      />

      <FormInput
        label="Product Name *"
        name="name"
        placeholder="Enter product name"
        value={formData.name}
        onChange={onChange}
        required
      />

      {formData.slug && (
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Slug
          </label>
          <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
            {formData.slug}
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={4}
          placeholder="Provide a detailed product description..."
          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormInput
          label="Brand"
          name="brand"
          placeholder="e.g. Jonoprio"
          value={formData.brand}
          onChange={onChange}
        />

        {/* CATEGORY */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category *
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            required
            disabled={loadingCategories}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">
              {loadingCategories
                ? 'Loading categories...'
                : 'Select a category'}
            </option>

            {categories
              .filter(category => category.isActive)
              .map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <FormInput
        label="Tags (comma separated)"
        name="tags"
        placeholder="leather, formal, gift, premium"
        value={formData.tags}
        onChange={onChange}
      />
    </div>
  );
};

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const FormInput = ({ label, icon, ...props }: FormInputProps) => {
  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
            icon ? 'pl-10' : ''
          }`}
        />
      </div>
    </div>
  );
};

interface SectionTitleProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const SectionTitle = ({ icon, title, subtitle }: SectionTitleProps) => {
  return (
    <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
