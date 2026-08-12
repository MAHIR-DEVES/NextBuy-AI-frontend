import React from 'react';

const AnalyticsSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <div className="h-7 w-56 rounded bg-muted" />

          <div className="mt-2 h-4 w-72 rounded bg-muted" />
        </div>

        <div className="h-10 w-40 rounded bg-muted" />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-28 rounded-lg border border-border bg-background p-5"
          >
            <div className="h-4 w-24 rounded bg-muted" />

            <div className="mt-4 h-7 w-20 rounded bg-muted" />
          </div>
        ))}
      </div>

      {/* Revenue + Status */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="h-[400px] rounded-lg bg-muted xl:col-span-2" />

        <div className="h-[400px] rounded-lg bg-muted" />
      </div>

      {/* Product */}
      <div className="h-[420px] rounded-lg bg-muted" />

      {/* District */}
      <div className="h-[400px] rounded-lg bg-muted" />

      {/* Customer */}
      <div className="h-[400px] rounded-lg bg-muted" />

      {/* Shipping */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-40 rounded-lg bg-muted" />

        <div className="h-40 rounded-lg bg-muted" />
      </div>
    </div>
  );
};

export default AnalyticsSkeleton;
