import { Settings2, DollarSign } from 'lucide-react';
import { SectionTitle, FormInput } from './BasicInformationSection';

interface SpecificationAndPricingSectionProps {
  formData: {
    model: string;
    material: string;
    price: number;
    specialPrice: number | null;
    discount: number | null;
    stock: number;
    weight: number | null;
    length: number | null;
    width: number | null;
    height: number | null;
  };
  colorVariantsLength: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SpecificationAndPricingSection = ({
  formData,
  colorVariantsLength,
  onChange,
}: SpecificationAndPricingSectionProps) => {
  return (
    <>
      {/* Specification */}
      <div className="space-y-4">
        <SectionTitle
          icon={<Settings2 className="w-4 h-4 text-blue-500" />}
          title="Specification"
          subtitle="Product model and material details"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormInput
            label="Model"
            name="model"
            placeholder="e.g. JPO-SP-2026"
            value={formData.model}
            onChange={onChange}
          />

          <FormInput
            label="Material"
            name="material"
            placeholder="e.g. Mesh, Leather"
            value={formData.material}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Pricing & Stock */}
      <div className="space-y-4">
        <SectionTitle
          icon={<DollarSign className="w-4 h-4 text-green-500" />}
          title="Pricing & Stock"
          subtitle="Set base prices and inventory levels"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <FormInput
            label="Base Price (৳) *"
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={onChange}
            required
          />

          <FormInput
            label="Special Price (৳)"
            name="specialPrice"
            type="number"
            min="0"
            placeholder="Optional"
            value={formData.specialPrice ?? ''}
            onChange={onChange}
          />

          <FormInput
            label="Discount (%)"
            name="discount"
            type="number"
            min="0"
            max="100"
            placeholder="Optional"
            value={formData.discount ?? ''}
            onChange={onChange}
          />
        </div>

        <FormInput
          label="Base Stock"
          name="stock"
          type="number"
          min="0"
          value={formData.stock}
          onChange={onChange}
        />

        {colorVariantsLength > 0 && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> Total stock will be calculated
              automatically from color/size variants.
            </p>
          </div>
        )}
      </div>

      {/* Dimensions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
          <div className="text-cyan-500">📦</div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Dimensions & Weight
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Physical properties for shipping
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormInput
            label="Weight (kg)"
            name="weight"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.75"
            value={formData.weight ?? ''}
            onChange={onChange}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">
            Dimensions (cm: L × W × H)
          </label>
          <div className="grid grid-cols-3 gap-3">
            <FormInput
              name="length"
              type="number"
              min="0"
              placeholder="Length"
              value={formData.length ?? ''}
              onChange={onChange}
            />

            <FormInput
              name="width"
              type="number"
              min="0"
              placeholder="Width"
              value={formData.width ?? ''}
              onChange={onChange}
            />

            <FormInput
              name="height"
              type="number"
              min="0"
              placeholder="Height"
              value={formData.height ?? ''}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
