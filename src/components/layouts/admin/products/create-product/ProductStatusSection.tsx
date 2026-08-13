import { ShieldCheck } from 'lucide-react';
import { SectionTitle } from './BasicInformationSection';

interface ProductStatusSectionProps {
  formData: {
    isFeatured: boolean;
    isPublished: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProductStatusSection = ({
  formData,
  onChange,
}: ProductStatusSectionProps) => {
  return (
    <div className="space-y-4">
      <SectionTitle
        icon={<ShieldCheck className="w-4 h-4 text-green-500" />}
        title="Product Status"
        subtitle="Publication and visibility settings"
      />

      <div className="space-y-3">
        <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={onChange}
            className="w-5 h-5 rounded accent-orange-500 cursor-pointer"
          />
          <div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Featured Product
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Display this product on featured section
            </p>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={onChange}
            className="w-5 h-5 rounded accent-green-500 cursor-pointer"
          />
          <div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Publish Immediately
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Make this product visible to customers
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};
