'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { ImageUp, Loader2, Upload } from 'lucide-react';
import { Hero, CreateHeroPayload } from '@/types/heroManagement';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import { HeroService } from '@/services/hero-management.service';
import Image from 'next/image';

interface HeroFormProps {
  hero: Hero | null;
  onClose: () => void;
  onSuccess: () => void;
}

const getDefaultForm = (): CreateHeroPayload => ({
  offer: {
    image: '',
    shortTitle: '',
    discount: '',
    shortDescription: '',
    link: '',
    isShowing: true,
  },
  banner: {
    image: '',
    isShowing: true,
  },
});

const getHeroForm = (hero: Hero | null): CreateHeroPayload => {
  if (!hero) {
    return getDefaultForm();
  }

  return {
    offer: {
      image: hero.offer?.image || '',
      shortTitle: hero.offer?.shortTitle || '',
      discount: hero.offer?.discount || '',
      shortDescription: hero.offer?.shortDescription || '',
      link: hero.offer?.link || '',
      isShowing: hero.offer?.isShowing ?? true,
    },

    banner: {
      image: hero.banner?.image || '',
      isShowing: hero.banner?.isShowing ?? true,
    },
  };
};

const HeroForm = ({ hero, onClose, onSuccess }: HeroFormProps) => {
  const [form, setForm] = useState<CreateHeroPayload>(() => getHeroForm(hero));

  const [saving, setSaving] = useState(false);
  const [offerUploading, setOfferUploading] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);

  // =========================
  // Offer Input
  // =========================

  const handleOfferChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      offer: {
        ...prev.offer,
        [name]: value,
      },
    }));
  };

  // =========================
  // Offer Image
  // =========================

  const handleOfferImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setOfferUploading(true);

      const imageUrl = await uploadImageToCloudinary(file);

      if (!imageUrl) {
        throw new Error('Image upload failed');
      }

      setForm(prev => ({
        ...prev,
        offer: {
          ...prev.offer,
          image: imageUrl,
        },
      }));
    } catch (error) {
      console.error('Offer image upload failed:', error);

      alert('Offer image upload failed');
    } finally {
      setOfferUploading(false);
    }
  };

  // =========================
  // Banner Image
  // =========================

  const handleBannerImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setBannerUploading(true);

      const imageUrl = await uploadImageToCloudinary(file);

      if (!imageUrl) {
        throw new Error('Image upload failed');
      }

      setForm(prev => ({
        ...prev,
        banner: {
          ...prev.banner,
          image: imageUrl,
        },
      }));
    } catch (error) {
      console.error('Banner image upload failed:', error);

      alert('Banner image upload failed');
    } finally {
      setBannerUploading(false);
    }
  };

  // =========================
  // Submit
  // =========================

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.offer.image) {
      alert('Please upload offer image');
      return;
    }

    if (!form.banner.image) {
      alert('Please upload banner image');
      return;
    }

    try {
      setSaving(true);

      if (hero) {
        await HeroService.updateHero(hero.id, form);
      } else {
        await HeroService.createHero(form);
      }

      onSuccess();
    } catch (error) {
      console.error('Failed to save hero:', error);

      alert('Failed to save hero');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="overflow-y-auto">
      <div className="space-y-6 p-5">
        {/* =========================
            OFFER
        ========================= */}

        <div className="rounded-md border">
          <div className="border-b p-5">
            <h3 className="font-semibold">Offer Section</h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Configure your promotional offer.
            </p>
          </div>

          <div className="space-y-5 p-5">
            <ImageUpload
              label="Offer Image"
              image={form.offer.image}
              uploading={offerUploading}
              onChange={handleOfferImage}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Short Title"
                name="shortTitle"
                value={form.offer.shortTitle}
                onChange={handleOfferChange}
                placeholder="Mega Sale"
                required
              />

              <Input
                label="Discount"
                name="discount"
                value={form.offer.discount}
                onChange={handleOfferChange}
                placeholder="30% OFF"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Short Description
              </label>

              <textarea
                name="shortDescription"
                value={form.offer.shortDescription}
                onChange={handleOfferChange}
                rows={3}
                placeholder="Get up to 30% discount"
                className="w-full resize-none rounded-md border bg-background px-3 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <Input
              label="Redirect Link"
              name="link"
              value={form.offer.link}
              onChange={handleOfferChange}
              placeholder="/products"
              required
            />

            <Toggle
              label="Show Offer"
              checked={form.offer.isShowing}
              onChange={value =>
                setForm(prev => ({
                  ...prev,
                  offer: {
                    ...prev.offer,
                    isShowing: value,
                  },
                }))
              }
            />
          </div>
        </div>

        {/* =========================
            BANNER
        ========================= */}

        <div className="rounded-md border">
          <div className="border-b p-5">
            <h3 className="font-semibold">Banner Section</h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Configure your homepage banner.
            </p>
          </div>

          <div className="space-y-5 p-5">
            <ImageUpload
              label="Banner Image"
              image={form.banner.image}
              uploading={bannerUploading}
              onChange={handleBannerImage}
            />

            <Toggle
              label="Show Banner"
              checked={form.banner.isShowing}
              onChange={value =>
                setForm(prev => ({
                  ...prev,
                  banner: {
                    ...prev.banner,
                    isShowing: value,
                  },
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* =========================
          FOOTER
      ========================= */}

      <div className="flex flex-col-reverse gap-3 border-t p-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className="h-11 rounded-md border px-6 text-sm font-medium hover:bg-muted"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving || offerUploading || bannerUploading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-7 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}

          {saving ? 'Saving...' : hero ? 'Update Hero' : 'Create Hero'}
        </button>
      </div>
    </form>
  );
};

/* =========================
   Input
========================= */

const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium">{label}</label>

    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
  </div>
);

/* =========================
   Image Upload
========================= */

const ImageUpload = ({
  label,
  image,
  uploading,
  onChange,
}: {
  label: string;
  image: string;
  uploading: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="overflow-hidden rounded-md border">
    <div className="aspect-[16/7] bg-muted">
      {image ? (
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={label}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          <ImageUp />
        </div>
      )}
    </div>

    <label className="flex cursor-pointer items-center justify-center gap-2 border-t bg-background px-4 py-3 text-sm font-medium hover:bg-muted">
      {uploading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Uploading...
        </>
      ) : (
        <>
          <Upload className="h-4 w-4" />
          {image ? 'Change Image' : 'Upload Image'}
        </>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        disabled={uploading}
        className="hidden"
      />
    </label>
  </div>
);

/* =========================
   Toggle
========================= */

const Toggle = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) => (
  <div className="flex items-center justify-between rounded-md border bg-muted/30 p-4">
    <span className="text-sm font-medium">{label}</span>

    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition ${
        checked ? 'bg-primary' : 'bg-muted-foreground/30'
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
          checked ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  </div>
);

export default HeroForm;
