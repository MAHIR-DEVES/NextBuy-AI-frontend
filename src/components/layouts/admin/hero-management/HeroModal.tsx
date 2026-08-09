import { X } from 'lucide-react';

import { Hero } from '@/types/heroManagement';
import HeroForm from './HeroForm';

interface HeroModalProps {
  open: boolean;
  hero: Hero | null;
  onClose: () => void;
  onSuccess: () => void;
}

const HeroModal = ({ open, hero, onClose, onSuccess }: HeroModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-md bg-background shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-xl font-bold">
              {hero ? 'Edit Hero' : 'Create Hero'}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage offer and banner
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}

        <HeroForm hero={hero} onClose={onClose} onSuccess={onSuccess} />
      </div>
    </div>
  );
};

export default HeroModal;
