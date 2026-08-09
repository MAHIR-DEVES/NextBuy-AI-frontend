import { ImagePlus, Link as LinkIcon, Pencil, Trash2 } from 'lucide-react';

import { Hero } from '@/types/heroManagement';
import Image from 'next/image';

interface HeroCardProps {
  hero: Hero;
  index: number;
  onEdit: (hero: Hero) => void;
  onDelete: (id: string) => void;
}

const HeroCard = ({ hero, index, onEdit, onDelete }: HeroCardProps) => {
  return (
    <div className="overflow-hidden rounded-md border bg-background shadow-sm">
      {/* Header */}

      <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
            {index + 1}
          </div>

          <div>
            <h2 className="font-semibold">Hero #{index + 1}</h2>

            <p className="text-xs text-muted-foreground">
              Homepage promotional content
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(hero)}
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(hero.id)}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Content */}

      <div className="grid gap-6 p-5 md:grid-cols-2 md:p-6">
        {/* Offer */}

        <div className="overflow-hidden rounded-md border">
          <div className="flex items-center justify-between border-b p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Offer Section
              </p>

              <h3 className="mt-1 font-semibold">
                {hero.offer?.shortTitle || 'Offer'}
              </h3>
            </div>

            <StatusBadge showing={hero.offer?.isShowing ?? false} />
          </div>

          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            {hero.offer?.image ? (
              <Image
                src={hero.offer.image}
                alt={hero.offer.shortTitle || 'Offer'}
                fill
                className="object-cover"
              />
            ) : (
              <EmptyImage />
            )}

            {hero.offer?.discount && (
              <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
                {hero.offer.discount}
              </div>
            )}
          </div>

          <div className="space-y-4 p-5">
            <Info label="Description" value={hero.offer?.shortDescription} />

            <div className="rounded-xl bg-muted/50 p-3">
              <div className="flex gap-2">
                <LinkIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Redirect Link</p>

                  <p className="mt-1 break-all text-sm font-medium">
                    {hero.offer?.link || '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner */}

        <div className="overflow-hidden rounded-md border">
          <div className="flex items-center justify-between border-b p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Banner Section
              </p>

              <h3 className="mt-1 font-semibold">Homepage Banner</h3>
            </div>

            <StatusBadge showing={hero.banner?.isShowing ?? false} />
          </div>

          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            {hero.banner?.image ? (
              <div className="relative h-full w-full">
                <Image
                  src={hero.banner.image}
                  alt="Homepage Banner"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              </div>
            ) : (
              <EmptyImage />
            )}
          </div>

          <div className="p-5">
            <Info
              label="Status"
              value={
                hero.banner?.isShowing
                  ? 'Currently Showing'
                  : 'Currently Hidden'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ showing }: { showing: boolean }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${
      showing ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}
  >
    {showing ? 'Showing' : 'Hidden'}
  </span>
);

const EmptyImage = () => (
  <div className="flex h-full items-center justify-center">
    <ImagePlus className="h-8 w-8 text-muted-foreground" />
  </div>
);

const Info = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>

    <p className="mt-1 text-sm font-medium">{value || '—'}</p>
  </div>
);

export default HeroCard;
