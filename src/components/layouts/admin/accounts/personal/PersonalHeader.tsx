'use client';

import { Plus } from 'lucide-react';

interface PersonalHeaderProps {
  onCreate: () => void;
}

const PersonalHeader = ({ onCreate }: PersonalHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Personal Account
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage personal account entries and transactions.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Plus className="h-4 w-4" />
        Create Entry
      </button>
    </div>
  );
};

export default PersonalHeader;
