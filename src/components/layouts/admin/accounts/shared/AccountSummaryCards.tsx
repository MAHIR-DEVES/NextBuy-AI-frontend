'use client';

import type { LucideIcon } from 'lucide-react';

export interface SummaryCard {
  label: string;
  value: string | number;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

interface AccountSummaryCardsProps {
  cards: SummaryCard[];
}

const AccountSummaryCards = ({ cards }: AccountSummaryCardsProps) => {
  if (!cards.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={`${card.label}-${index}`}
            className="rounded-md border bg-background p-4"
          >
            <div className="flex items-start justify-between gap-3">
              {/* CONTENT */}
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{card.label}</p>

                <p
                  className={`mt-1 truncate text-2xl font-semibold ${
                    card.className || ''
                  }`}
                >
                  {card.value}
                </p>
              </div>

              {/* ICON */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted ${
                  card.iconClassName || ''
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccountSummaryCards;
