import { Truck, AlertCircle } from 'lucide-react';
import { SectionTitle, FormInput } from './BasicInformationSection';

interface ShippingAndWarrantySectionProps {
  formData: {
    warrantyType: string;
    warrantyPeriod: string;
    dangerousGoods: boolean;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const ShippingAndWarrantySection = ({
  formData,
  onChange,
}: ShippingAndWarrantySectionProps) => {
  return (
    <div className="space-y-4">
      <SectionTitle
        icon={<Truck className="w-4 h-4 text-cyan-500" />}
        title="Warranty & Shipping"
        subtitle="Warranty terms and dangerous goods declaration"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormInput
          label="Warranty Period"
          name="warrantyPeriod"
          placeholder="e.g. 7 Days"
          value={formData.warrantyPeriod}
          onChange={onChange}
        />

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Warranty Type
          </label>
          <select
            name="warrantyType"
            value={formData.warrantyType}
            onChange={onChange}
            className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
          >
            <option value="">Select warranty type</option>
            <option value="Replacement Warranty">Replacement Warranty</option>
            <option value="Service Warranty">Service Warranty</option>
            <option value="Manufacturer Warranty">Manufacturer Warranty</option>
            <option value="No Warranty">No Warranty</option>
          </select>
        </div>
      </div>

      <div className="border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
          <label className="flex items-center gap-2 cursor-pointer flex-1">
            <input
              type="checkbox"
              name="dangerousGoods"
              checked={formData.dangerousGoods}
              onChange={onChange}
              className="w-4 h-4 rounded accent-yellow-600 cursor-pointer"
            />
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Dangerous Goods
              </span>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                Check if this product contains hazardous materials
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
