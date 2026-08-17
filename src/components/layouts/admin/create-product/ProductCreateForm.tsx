'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/services/product.service';
import { Category } from '@/types/category.types';
import { IProduct } from '@/types/products.type';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';

import { MediaSection } from './MediaSection';
import { SpecificationAndPricingSection } from './SpecificationAndPricingSection';

import { ShippingAndWarrantySection } from './ShippingAndWarrantySection';
import { ProductStatusSection } from './ProductStatusSection';
import {
  ColorVariant,
  ColorVariantsSection,
  SizeVariant,
} from './ColorVariantsSection';
import { BasicInformationSection } from './BasicInformationSection';
import { HighlightsSection } from './HighlightsSection';
import { FormActions } from './FormActions';
import { CategoryService } from '@/services/category.service';
import { toast } from 'sonner';

interface ProductCreateFormProps {
  mode?: 'create' | 'edit';
  initialProduct?: IProduct | null;
}

const buildDefaultFormData = (product?: IProduct | null) => ({
  name: product?.name ?? '',
  slug: product?.slug ?? '',
  description: product?.description ?? '',
  brand: product?.brand ?? '',
  category: product?.categoryId ?? '',
  tags: product?.tags?.join(', ') ?? '',
  videoUrl: product?.videoUrl ?? '',
  model: product?.model ?? '',
  material: product?.material ?? '',
  price: product?.price ?? 0,
  specialPrice: product?.specialPrice ?? null,
  discount: product?.discount ?? null,
  stock: product?.stock ?? 0,
  weight: product?.weight ?? null,
  length: product?.dimensions?.length ?? null,
  width: product?.dimensions?.width ?? null,
  height: product?.dimensions?.height ?? null,
  dangerousGoods: product?.dangerousGoods ?? false,
  warrantyType: product?.warrantyType ?? '',
  warrantyPeriod: product?.warrantyPeriod ?? '',
  highlights: product?.highlights?.join('\n') ?? '',
  isFeatured: product?.isFeatured ?? false,
  isPublished: product?.isPublished ?? true,
});

const buildColorVariants = (product?: IProduct | null): ColorVariant[] =>
  (product?.colorVariants ?? []).map(colorVariant => ({
    color: colorVariant.color ?? '',
    image: colorVariant.image ?? '',
    sizes: (colorVariant.sizes ?? []).map(size => ({
      size: String(size.size ?? ''),
      price: Number(size.price ?? 0),
      specialPrice:
        size.specialPrice !== null ? Number(size.specialPrice) : null,
      stock: Number(size.stock ?? 0),
      sku: size.sku ?? '',
    })),
  }));

const ProductCreateForm = ({
  mode = 'create',
  initialProduct = null,
}: ProductCreateFormProps) => {
  const router = useRouter();
  const isEditMode = mode === 'edit';
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [thumbnail, setThumbnail] = useState(initialProduct?.thumbnail ?? '');
  const [images, setImages] = useState<string[]>(initialProduct?.images ?? []);

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAllCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const [formData, setFormData] = useState(() =>
    buildDefaultFormData(initialProduct),
  );

  useEffect(() => {
    setFormData(buildDefaultFormData(initialProduct));
    setThumbnail(initialProduct?.thumbnail ?? '');
    setImages(initialProduct?.images ?? []);
    setColorVariants(buildColorVariants(initialProduct));
  }, [initialProduct]);

  const selectedCategory = categories.find(
    category => category.id === formData.category,
  );
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>(() =>
    buildColorVariants(initialProduct),
  );

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
      toast.warning('Thumbnail image must be less than 2MB.');
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
      toast.error('Failed to upload thumbnail.');
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
      toast.warning('Maximum 10 product images are allowed.');
      e.target.value = '';
      return;
    }

    const selectedFiles = Array.from(files).slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      toast.warning(
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
          toast.warning(`${file.name} is larger than 2MB.`);
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
      toast.error('Failed to upload one or more images.');
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
    const defaultSizes =
      selectedCategory?.name.trim().toLowerCase() === 'shoes'
        ? ['39', '40', '41', '42', '43', '44']
        : [''];

    setColorVariants(prev => [
      ...prev,
      {
        color: '',
        image: '',
        sizes: defaultSizes.map(size => ({
          size,
          price: formData.price || 0,
          specialPrice: formData.specialPrice,
          stock: 0,
          sku: '',
        })),
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
      toast.warning('Color image must be less than 2MB.');
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
      toast.error('Failed to upload color image.');
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
        toast.warning(
          `Please enter color name for Color Variant #${colorIndex + 1}.`,
        );
        return false;
      }

      // Duplicate color check
      const normalizedColor = normalizeValue(colorName);

      if (usedColors.has(normalizedColor)) {
        toast.warning(
          `Duplicate color "${colorName}" found. Please use each color only once.`,
        );
        return false;
      }

      usedColors.add(normalizedColor);

      // At least one size
      if (colorVariant.sizes.length === 0) {
        toast.warning(`Please add at least one size for ${colorName}.`);
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
          toast.warning(
            `Please enter size for ${colorName}, row #${sizeIndex + 1}.`,
          );
          return false;
        }

        // Duplicate size within same color
        const normalizedSize = normalizeValue(sizeName);

        if (usedSizes.has(normalizedSize)) {
          toast.warning(
            `Duplicate size "${sizeName}" found under ${colorName}. ` +
              `The same color cannot have the same size twice.`,
          );
          return false;
        }

        usedSizes.add(normalizedSize);

        // SKU required
        if (!sku) {
          toast.warning(`Please enter SKU for ${colorName} - ${sizeName}.`);
          return false;
        }

        // Duplicate SKU globally
        const normalizedSku = normalizeValue(sku);

        if (usedSkus.has(normalizedSku)) {
          toast.warning(
            `Duplicate SKU "${sku}" found. SKU must be unique across the entire product.`,
          );
          return false;
        }

        usedSkus.add(normalizedSku);

        // Price validation
        if (Number(size.price) <= 0) {
          toast.warning(
            `Price must be greater than 0 for ${colorName} - ${sizeName}.`,
          );
          return false;
        }

        // Stock validation
        if (Number(size.stock) < 0) {
          toast.warning(
            `Stock cannot be negative for ${colorName} - ${sizeName}.`,
          );
          return false;
        }

        // Special price validation
        if (size.specialPrice !== null && Number(size.specialPrice) < 0) {
          toast.warning(
            `Special price cannot be negative for ${colorName} - ${sizeName}.`,
          );
          return false;
        }

        if (
          size.specialPrice !== null &&
          Number(size.specialPrice) > Number(size.price)
        ) {
          toast.warning(
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

    if (!formData.name.trim()) {
      toast.warning('Please enter product name.');
      return;
    }

    if (!thumbnail) {
      toast.warning('Please upload a thumbnail image.');
      return;
    }

    if (!formData.category.trim()) {
      toast.warning('Please provide a category ID.');
      return;
    }

    if (Number(formData.price) <= 0) {
      toast.warning('Base price must be greater than 0.');
      return;
    }

    if (formData.specialPrice !== null) {
      if (Number(formData.specialPrice) < 0) {
        toast.warning('Special price cannot be negative.');
        return;
      }

      if (Number(formData.specialPrice) > Number(formData.price)) {
        toast.warning('Special price cannot be greater than base price.');
        return;
      }
    }

    if (Number(formData.stock) < 0) {
      toast.warning('Stock cannot be negative.');
      return;
    }

    if (colorVariants.length > 0) {
      const isValid = validateColorVariants();

      if (!isValid) {
        return;
      }
    }

    try {
      setLoading(true);

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

      if (isEditMode && initialProduct?.id) {
        await updateProduct(initialProduct.id, payload);
        toast.success('Product updated successfully.');
        router.push('/admin/products');
        return;
      }

      await createProduct(payload);
      toast.success('Product created successfully.');
      router.push('/admin/products');
    } catch (error: unknown) {
      console.error(
        isEditMode ? 'UPDATE PRODUCT ERROR:' : 'CREATE PRODUCT ERROR:',
        error,
      );

      toast.error(
        isEditMode ? 'Failed to update product' : 'Failed to create product',
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

      <FormActions
        loading={loading}
        uploading={uploading}
        mode={isEditMode ? 'edit' : 'create'}
      />
    </form>
  );
};

export default ProductCreateForm;
