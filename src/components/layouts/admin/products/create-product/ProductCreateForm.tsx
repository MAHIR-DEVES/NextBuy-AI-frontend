'use client';

import { useState } from 'react';
import { getToken } from '@/utils/auth';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';

import { BasicInformationSection } from './BasicInformationSection';
import { MediaSection } from './MediaSection';
import { SpecificationAndPricingSection } from './SpecificationAndPricingSection';
import {
  ColorVariantsSection,
  type ColorVariant,
  type SizeVariant,
} from './ColorVariantsSection';
import { HighlightsSection } from './HighlightsSection';
import { ShippingAndWarrantySection } from './ShippingAndWarrantySection';
import { ProductStatusSection } from './ProductStatusSection';
import { FormActions } from './FormActions';

const ProductCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [thumbnail, setThumbnail] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',

    brand: '',
    category: '',
    tags: '',

    videoUrl: '',

    model: '',
    material: '',

    price: 0,
    specialPrice: null as number | null,
    discount: null as number | null,
    stock: 0,

    weight: null as number | null,

    length: null as number | null,
    width: null as number | null,
    height: null as number | null,

    dangerousGoods: false,

    warrantyType: '',
    warrantyPeriod: '',

    highlights: '',

    isFeatured: false,
    isPublished: true,
  });

  const [colorVariants, setColorVariants] = useState<ColorVariant[]>([]);

  // =========================================================
  // HELPERS
  // =========================================================

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  const normalizeValue = (value: string) => value.trim().toLowerCase();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    const input = e.target as HTMLInputElement;

    setFormData(prev => {
      const updated = {
        ...prev,
        [name]:
          type === 'number'
            ? value === ''
              ? null
              : Number(value)
            : type === 'checkbox'
              ? input.checked
              : value,
      };

      if (name === 'name') {
        updated.slug = generateSlug(value);
      }

      return updated;
    });
  };

  // =========================================================
  // THUMBNAIL UPLOAD
  // =========================================================

  const handleThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Thumbnail image must be less than 2MB.');
      e.target.value = '';
      return;
    }

    try {
      setUploading(true);

      const url = await uploadImageToCloudinary(file);

      if (url) {
        setThumbnail(url);
      }
    } catch (error) {
      console.error('Thumbnail upload error:', error);
      alert('Failed to upload thumbnail.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // =========================================================
  // MULTIPLE IMAGE UPLOAD
  // =========================================================

  const handleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const remainingSlots = 10 - images.length;

    if (remainingSlots <= 0) {
      alert('Maximum 10 product images are allowed.');
      e.target.value = '';
      return;
    }

    const selectedFiles = Array.from(files).slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      alert(
        `Only ${remainingSlots} more image${
          remainingSlots > 1 ? 's are' : ' is'
        } allowed.`,
      );
    }

    try {
      setUploading(true);

      const uploaded: string[] = [];

      for (const file of selectedFiles) {
        if (file.size > 2 * 1024 * 1024) {
          alert(`${file.name} is larger than 2MB.`);
          continue;
        }

        const url = await uploadImageToCloudinary(file);

        if (url) {
          uploaded.push(url);
        }
      }

      setImages(prev => [...prev, ...uploaded]);
    } catch (error) {
      console.error('Images upload error:', error);
      alert('Failed to upload one or more images.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // =========================================================
  // COLOR VARIANTS
  // =========================================================

  const addColorVariant = () => {
    setColorVariants(prev => [
      ...prev,
      {
        color: '',
        image: '',
        sizes: [
          {
            size: '',
            price: formData.price || 0,
            specialPrice: formData.specialPrice,
            stock: 0,
            sku: '',
          },
        ],
      },
    ]);
  };

  const removeColorVariant = (colorIndex: number) => {
    setColorVariants(prev => prev.filter((_, index) => index !== colorIndex));
  };

  const updateColor = (colorIndex: number, value: string) => {
    setColorVariants(prev =>
      prev.map((variant, index) =>
        index === colorIndex
          ? {
              ...variant,
              color: value,
            }
          : variant,
      ),
    );
  };

  // =========================================================
  // COLOR IMAGE
  // =========================================================

  const handleColorImage = async (
    colorIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Color image must be less than 2MB.');
      e.target.value = '';
      return;
    }

    try {
      setUploading(true);

      const url = await uploadImageToCloudinary(file);

      if (url) {
        setColorVariants(prev =>
          prev.map((variant, index) =>
            index === colorIndex
              ? {
                  ...variant,
                  image: url,
                }
              : variant,
          ),
        );
      }
    } catch (error) {
      console.error('Color image upload error:', error);
      alert('Failed to upload color image.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeColorImage = (colorIndex: number) => {
    setColorVariants(prev =>
      prev.map((item, index) =>
        index === colorIndex
          ? {
              ...item,
              image: '',
            }
          : item,
      ),
    );
  };

  // =========================================================
  // SIZE VARIANTS
  // =========================================================

  const addSize = (colorIndex: number) => {
    setColorVariants(prev =>
      prev.map((variant, index) =>
        index === colorIndex
          ? {
              ...variant,
              sizes: [
                ...variant.sizes,
                {
                  size: '',
                  price: formData.price || 0,
                  specialPrice: formData.specialPrice,
                  stock: 0,
                  sku: '',
                },
              ],
            }
          : variant,
      ),
    );
  };

  const removeSize = (colorIndex: number, sizeIndex: number) => {
    setColorVariants(prev =>
      prev.map((variant, index) =>
        index === colorIndex
          ? {
              ...variant,
              sizes: variant.sizes.filter((_, i) => i !== sizeIndex),
            }
          : variant,
      ),
    );
  };

  const updateSize = (
    colorIndex: number,
    sizeIndex: number,
    field: keyof SizeVariant,
    value: string | number | null,
  ) => {
    setColorVariants(prev =>
      prev.map((variant, cIndex) =>
        cIndex === colorIndex
          ? {
              ...variant,
              sizes: variant.sizes.map((size, sIndex) =>
                sIndex === sizeIndex
                  ? {
                      ...size,
                      [field]: value,
                    }
                  : size,
              ),
            }
          : variant,
      ),
    );
  };

  // =========================================================
  // VALIDATE COLOR VARIANTS
  // =========================================================

  const validateColorVariants = (): boolean => {
    const usedSkus = new Set<string>();
    const usedColors = new Set<string>();

    for (let colorIndex = 0; colorIndex < colorVariants.length; colorIndex++) {
      const colorVariant = colorVariants[colorIndex];

      const colorName = colorVariant.color.trim();

      // Color required
      if (!colorName) {
        alert(`Please enter color name for Color Variant #${colorIndex + 1}.`);
        return false;
      }

      // Duplicate color check
      const normalizedColor = normalizeValue(colorName);

      if (usedColors.has(normalizedColor)) {
        alert(
          `Duplicate color "${colorName}" found. Please use each color only once.`,
        );
        return false;
      }

      usedColors.add(normalizedColor);

      // At least one size
      if (colorVariant.sizes.length === 0) {
        alert(`Please add at least one size for ${colorName}.`);
        return false;
      }

      const usedSizes = new Set<string>();

      for (
        let sizeIndex = 0;
        sizeIndex < colorVariant.sizes.length;
        sizeIndex++
      ) {
        const size = colorVariant.sizes[sizeIndex];

        const sizeName = size.size.trim();
        const sku = size.sku.trim();

        // Size required
        if (!sizeName) {
          alert(`Please enter size for ${colorName}, row #${sizeIndex + 1}.`);
          return false;
        }

        // Duplicate size within same color
        const normalizedSize = normalizeValue(sizeName);

        if (usedSizes.has(normalizedSize)) {
          alert(
            `Duplicate size "${sizeName}" found under ${colorName}. ` +
              `The same color cannot have the same size twice.`,
          );
          return false;
        }

        usedSizes.add(normalizedSize);

        // SKU required
        if (!sku) {
          alert(`Please enter SKU for ${colorName} - ${sizeName}.`);
          return false;
        }

        // Duplicate SKU globally
        const normalizedSku = normalizeValue(sku);

        if (usedSkus.has(normalizedSku)) {
          alert(
            `Duplicate SKU "${sku}" found. SKU must be unique across the entire product.`,
          );
          return false;
        }

        usedSkus.add(normalizedSku);

        // Price validation
        if (Number(size.price) <= 0) {
          alert(`Price must be greater than 0 for ${colorName} - ${sizeName}.`);
          return false;
        }

        // Stock validation
        if (Number(size.stock) < 0) {
          alert(`Stock cannot be negative for ${colorName} - ${sizeName}.`);
          return false;
        }

        // Special price validation
        if (size.specialPrice !== null && Number(size.specialPrice) < 0) {
          alert(
            `Special price cannot be negative for ${colorName} - ${sizeName}.`,
          );
          return false;
        }

        if (
          size.specialPrice !== null &&
          Number(size.specialPrice) > Number(size.price)
        ) {
          alert(
            `Special price cannot be greater than price for ${colorName} - ${sizeName}.`,
          );
          return false;
        }
      }
    }

    return true;
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim()) {
      alert('Please enter product name.');
      return;
    }

    if (!thumbnail) {
      alert('Please upload a thumbnail image.');
      return;
    }

    if (!formData.category.trim()) {
      alert('Please provide a category ID.');
      return;
    }

    if (Number(formData.price) <= 0) {
      alert('Base price must be greater than 0.');
      return;
    }

    if (formData.specialPrice !== null) {
      if (Number(formData.specialPrice) < 0) {
        alert('Special price cannot be negative.');
        return;
      }

      if (Number(formData.specialPrice) > Number(formData.price)) {
        alert('Special price cannot be greater than base price.');
        return;
      }
    }

    if (Number(formData.stock) < 0) {
      alert('Stock cannot be negative.');
      return;
    }

    // Validate color variants
    if (colorVariants.length > 0) {
      const isValid = validateColorVariants();

      if (!isValid) {
        return;
      }
    }

    try {
      setLoading(true);

      const token = getToken();

      const totalVariantStock = colorVariants.reduce(
        (total, color) =>
          total +
          color.sizes.reduce(
            (sizeTotal, size) => sizeTotal + Number(size.stock || 0),
            0,
          ),
        0,
      );

      const payload = {
        name: formData.name.trim(),

        slug: formData.slug || generateSlug(formData.name),

        description: formData.description.trim() || undefined,

        brand: formData.brand.trim() || undefined,

        category: formData.category.trim(),

        tags: formData.tags
          ? formData.tags
              .split(',')
              .map(tag => tag.trim())
              .filter(Boolean)
          : [],

        thumbnail,

        images,

        videoUrl: formData.videoUrl.trim() || undefined,

        model: formData.model.trim() || undefined,

        material: formData.material.trim() || undefined,

        price: Number(formData.price),

        specialPrice:
          formData.specialPrice !== null
            ? Number(formData.specialPrice)
            : undefined,

        discount:
          formData.discount !== null ? Number(formData.discount) : undefined,

        stock:
          colorVariants.length > 0 ? totalVariantStock : Number(formData.stock),

        weight: formData.weight !== null ? Number(formData.weight) : undefined,

        dimensions:
          formData.length || formData.width || formData.height
            ? {
                length:
                  formData.length !== null ? Number(formData.length) : null,
                width: formData.width !== null ? Number(formData.width) : null,
                height:
                  formData.height !== null ? Number(formData.height) : null,
              }
            : undefined,

        dangerousGoods: formData.dangerousGoods,

        warrantyType: formData.warrantyType.trim() || undefined,

        warrantyPeriod: formData.warrantyPeriod.trim() || undefined,

        highlights: formData.highlights
          ? formData.highlights
              .split('\n')
              .map(item => item.trim())
              .filter(Boolean)
          : [],

        isFeatured: formData.isFeatured,

        isPublished: formData.isPublished,

        colorVariants: colorVariants.map(color => ({
          color: color.color.trim(),

          image: color.image || undefined,

          sizes: color.sizes.map(size => ({
            size: size.size.trim(),

            price: Number(size.price),

            specialPrice:
              size.specialPrice !== null
                ? Number(size.specialPrice)
                : undefined,

            stock: Number(size.stock),

            sku: size.sku.trim(),
          })),
        })),
      };

      console.log('CREATE PRODUCT PAYLOAD:', payload);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(payload),
      });

      const result = await res.json();

      console.log('CREATE PRODUCT RESPONSE:', result);

      if (!res.ok) {
        throw new Error(
          result?.message || result?.error || 'Failed to create product',
        );
      }

      alert('Product created successfully.');
    } catch (error) {
      console.error('CREATE PRODUCT ERROR:', error);

      alert(
        error instanceof Error ? error.message : 'Failed to create product',
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[80vh] overflow-y-auto px-1 pb-2"
    >
      {/* =====================================================
          BASIC INFORMATION
      ====================================================== */}

      <BasicInformationSection formData={formData} onChange={handleChange} />

      {/* =====================================================
          IMAGES & VIDEO
      ====================================================== */}

      <MediaSection
        thumbnail={thumbnail}
        images={images}
        formData={{ videoUrl: formData.videoUrl }}
        uploading={uploading}
        onThumbnailUpload={handleThumbnail}
        onThumbnailRemove={() => setThumbnail('')}
        onImagesUpload={handleImages}
        onImageRemove={removeImage}
        onVideoUrlChange={handleChange}
      />

      {/* =====================================================
          SPECIFICATION & PRICING
      ====================================================== */}

      <SpecificationAndPricingSection
        formData={formData}
        colorVariantsLength={colorVariants.length}
        onChange={handleChange}
      />

      {/* =====================================================
          COLOR VARIANTS
      ====================================================== */}

      <ColorVariantsSection
        colorVariants={colorVariants}
        basePrice={formData.price}
        baseSpecialPrice={formData.specialPrice}
        uploading={uploading}
        onAddColorVariant={addColorVariant}
        onRemoveColorVariant={removeColorVariant}
        onUpdateColor={updateColor}
        onColorImageUpload={handleColorImage}
        onColorImageRemove={removeColorImage}
        onAddSize={addSize}
        onRemoveSize={removeSize}
        onUpdateSize={updateSize}
      />

      {/* =====================================================
          HIGHLIGHTS
      ====================================================== */}

      <HighlightsSection
        highlights={formData.highlights}
        onChange={handleChange}
      />

      {/* =====================================================
          SHIPPING & WARRANTY
      ====================================================== */}

      <ShippingAndWarrantySection formData={formData} onChange={handleChange} />

      {/* =====================================================
          PRODUCT STATUS
      ====================================================== */}

      <ProductStatusSection formData={formData} onChange={handleChange} />

      {/* =====================================================
          ACTIONS
      ====================================================== */}

      <FormActions loading={loading} uploading={uploading} />
    </form>
  );
};

export default ProductCreateForm;
