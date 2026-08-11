'use client';

import { Plus } from 'lucide-react';

import AccountSummaryCards, { SummaryCard } from './AccountSummaryCards';

interface AccountPageHeaderProps {
  title: string;
  description?: string;
  buttonText: string;
  onCreate: () => void;
  summaryCards?: SummaryCard[];
}

const AccountPageHeader = ({
  title,
  description,
  buttonText,
  onCreate,
  summaryCards = [],
}: AccountPageHeaderProps) => {
  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* TITLE */}
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {/* CREATE BUTTON */}
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />

          {buttonText}
        </button>
      </div>

      {/* SUMMARY CARDS */}
      {summaryCards.length > 0 && <AccountSummaryCards cards={summaryCards} />}
    </div>
  );
};

export default AccountPageHeader;
