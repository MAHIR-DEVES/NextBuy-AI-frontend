import { Palette, Plus, Trash2, Upload, X } from 'lucide-react';
import { SectionTitle } from './BasicInformationSection';

export type SizeVariant = {
  size: string;
  price: number;
  specialPrice: number | null;
  stock: number;
  sku: string;
};

export type ColorVariant = {
  color: string;
  image: string;
  sizes: SizeVariant[];
};

interface ColorVariantsSectionProps {
  colorVariants: ColorVariant[];
  basePrice: number;
  baseSpecialPrice: number | null;
  uploading: boolean;
  onAddColorVariant: () => void;
  onRemoveColorVariant: (colorIndex: number) => void;
  onUpdateColor: (colorIndex: number, value: string) => void;
  onColorImageUpload: (
    colorIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onColorImageRemove: (colorIndex: number) => void;
  onAddSize: (colorIndex: number) => void;
  onRemoveSize: (colorIndex: number, sizeIndex: number) => void;
  onUpdateSize: (
    colorIndex: number,
    sizeIndex: number,
    field: keyof SizeVariant,
    value: string | number | null,
  ) => void;
}

export const ColorVariantsSection = ({
  colorVariants,
  basePrice,
  baseSpecialPrice,
  uploading,
  onAddColorVariant,
  onRemoveColorVariant,
  onUpdateColor,
  onColorImageUpload,
  onColorImageRemove,
  onAddSize,
  onRemoveSize,
  onUpdateSize,
}: ColorVariantsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b-2 border-gray-200 dark:border-gray-700 pb-3">
        <div className="flex items-center gap-3">
          <Palette className="w-4 h-4 text-pink-500" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Color Variants
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Add multiple colors with sizes, pricing and inventory
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddColorVariant}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={14} />
          Add Color
        </button>
      </div>

      {colorVariants.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
          <Palette className="mx-auto w-8 h-8 text-gray-400 mb-3" />
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            No color variants added yet
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Add color variants to specify size, price and stock for each color
          </p>
          <button
            type="button"
            onClick={onAddColorVariant}
            className="mt-4 inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
          >
            <Plus size={14} />
            Add First Color Variant
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {colorVariants.map((color, colorIndex) => (
            <ColorVariantCard
              key={colorIndex}
              color={color}
              colorIndex={colorIndex}
              basePrice={basePrice}
              baseSpecialPrice={baseSpecialPrice}
              uploading={uploading}
              onRemove={onRemoveColorVariant}
              onUpdateColor={onUpdateColor}
              onColorImageUpload={onColorImageUpload}
              onColorImageRemove={onColorImageRemove}
              onAddSize={onAddSize}
              onRemoveSize={onRemoveSize}
              onUpdateSize={onUpdateSize}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ColorVariantCardProps {
  color: ColorVariant;
  colorIndex: number;
  basePrice: number;
  baseSpecialPrice: number | null;
  uploading: boolean;
  onRemove: (colorIndex: number) => void;
  onUpdateColor: (colorIndex: number, value: string) => void;
  onColorImageUpload: (
    colorIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onColorImageRemove: (colorIndex: number) => void;
  onAddSize: (colorIndex: number) => void;
  onRemoveSize: (colorIndex: number, sizeIndex: number) => void;
  onUpdateSize: (
    colorIndex: number,
    sizeIndex: number,
    field: keyof SizeVariant,
    value: string | number | null,
  ) => void;
}

const ColorVariantCard = ({
  color,
  colorIndex,
  basePrice,
  baseSpecialPrice,
  uploading,
  onRemove,
  onUpdateColor,
  onColorImageUpload,
  onColorImageRemove,
  onAddSize,
  onRemoveSize,
  onUpdateSize,
}: ColorVariantCardProps) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
          Color #{colorIndex + 1}
        </h4>
        <button
          type="button"
          onClick={() => onRemove(colorIndex)}
          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Color Name & Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Green"
              value={color.color}
              onChange={e => onUpdateColor(colorIndex, e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color Image
            </label>
            {!color.image ? (
              <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-[42px] cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-colors bg-gray-50 dark:bg-gray-800/50 hover:bg-orange-50 dark:hover:bg-orange-900/10">
                <Upload size={14} />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Upload
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => onColorImageUpload(colorIndex, e)}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative inline-block">
                <img
                  src={color.image}
                  alt={color.color}
                  className="w-16 h-16 object-cover rounded-lg border-2 border-pink-300 dark:border-pink-700"
                />
                <button
                  type="button"
                  onClick={() => onColorImageRemove(colorIndex)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 transition-colors shadow-sm"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sizes Section */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Sizes & Pricing ({color.sizes.length})
            </h5>
            <button
              type="button"
              onClick={() => onAddSize(colorIndex)}
              className="flex items-center gap-1 text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors"
            >
              <Plus size={13} />
              Add Size
            </button>
          </div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[700px] text-left text-xs">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                  <th className="px-2 py-2.5 text-gray-600 dark:text-gray-400 font-semibold">
                    Size *
                  </th>
                  <th className="px-2 py-2.5 text-gray-600 dark:text-gray-400 font-semibold">
                    Price ৳ *
                  </th>
                  <th className="px-2 py-2.5 text-gray-600 dark:text-gray-400 font-semibold">
                    Special ৳
                  </th>
                  <th className="px-2 py-2.5 text-gray-600 dark:text-gray-400 font-semibold">
                    Stock *
                  </th>
                  <th className="px-2 py-2.5 text-gray-600 dark:text-gray-400 font-semibold">
                    SKU *
                  </th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {color.sizes.map((size, sizeIndex) => (
                  <tr
                    key={sizeIndex}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        value={size.size}
                        onChange={e =>
                          onUpdateSize(
                            colorIndex,
                            sizeIndex,
                            'size',
                            e.target.value,
                          )
                        }
                        placeholder="36"
                        className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        min="0"
                        value={size.price}
                        onChange={e =>
                          onUpdateSize(
                            colorIndex,
                            sizeIndex,
                            'price',
                            e.target.value === '' ? 0 : Number(e.target.value),
                          )
                        }
                        className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        min="0"
                        value={size.specialPrice ?? ''}
                        onChange={e =>
                          onUpdateSize(
                            colorIndex,
                            sizeIndex,
                            'specialPrice',
                            e.target.value === ''
                              ? null
                              : Number(e.target.value),
                          )
                        }
                        placeholder="Optional"
                        className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        min="0"
                        value={size.stock}
                        onChange={e =>
                          onUpdateSize(
                            colorIndex,
                            sizeIndex,
                            'stock',
                            e.target.value === '' ? 0 : Number(e.target.value),
                          )
                        }
                        className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        value={size.sku}
                        onChange={e =>
                          onUpdateSize(
                            colorIndex,
                            sizeIndex,
                            'sku',
                            e.target.value,
                          )
                        }
                        placeholder="GRN-36-001"
                        className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                      />
                    </td>
                    <td className="px-2">
                      <button
                        type="button"
                        onClick={() => onRemoveSize(colorIndex, sizeIndex)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {color.sizes.length === 0 && (
            <div className="text-center py-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                No sizes added for this color
              </p>
              <button
                type="button"
                onClick={() => onAddSize(colorIndex)}
                className="text-xs font-medium text-orange-500 hover:text-orange-600"
              >
                + Add Size
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
