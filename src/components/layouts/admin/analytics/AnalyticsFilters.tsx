'use client';

import React from 'react';
import { CalendarDays } from 'lucide-react';

type AnalyticsFiltersProps = {
  year: number;
  month: number | undefined;
  currentYear: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number | undefined) => void;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AnalyticsFilters = ({
  year,
  month,
  currentYear,
  onYearChange,
  onMonthChange,
}: AnalyticsFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Year */}
      <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
        <CalendarDays className="h-4 w-4 text-muted-foreground" />

        <select
          value={year}
          onChange={e => onYearChange(Number(e.target.value))}
          className="bg-transparent text-sm  outline-none"
        >
          {Array.from({ length: 5 }, (_, index) => {
            const optionYear = currentYear - index;

            return (
              <option key={optionYear} value={optionYear}>
                {optionYear}
              </option>
            );
          })}
        </select>
      </div>

      {/* Month */}
      <select
        value={month ?? ''}
        onChange={e =>
          onMonthChange(e.target.value ? Number(e.target.value) : undefined)
        }
        className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
      >
        <option value="">All Months</option>

        {months.map((monthName, index) => (
          <option key={monthName} value={index + 1}>
            {monthName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AnalyticsFilters;
