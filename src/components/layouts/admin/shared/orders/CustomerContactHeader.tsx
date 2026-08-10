'use client';

import { Clipboard, Download, Search, X } from 'lucide-react';

import { OrderStatus } from '@/types/orders';

interface CustomerContactHeaderProps {
  search: string;
  status: OrderStatus | 'ALL';
  selectedCount: number;
  orderCount: number;
  hasOrders: boolean;
  onSearch: (value: string) => void;
  onStatusChange: (value: OrderStatus | 'ALL') => void;
  onCopyPhones: () => void;
  onExportCSV: () => void;
}

const CustomerContactHeader = ({
  search,
  status,
  selectedCount,
  orderCount,
  hasOrders,
  onSearch,
  onStatusChange,
  onCopyPhones,
  onExportCSV,
}: CustomerContactHeaderProps) => {
  return (
    <>
      {/* Header */}
      <div className="rounded-md border bg-background p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-bold md:text-md">Customer Contact</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage customer orders and contact information.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onCopyPhones}
              disabled={!selectedCount}
              className="inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Clipboard className="h-4 w-4" />
              Copy Phones
              {selectedCount > 0 && (
                <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                  {selectedCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onExportCSV}
              disabled={!hasOrders}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="rounded-md border bg-background p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={search}
              onChange={e => onSearch(e.target.value)}
              placeholder="Search name, phone or email..."
              className="h-10 w-full rounded-lg border bg-background pl-9 pr-9 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            {search && (
              <button
                type="button"
                onClick={() => onSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex gap-3 items-center">
            <select
              value={status}
              onChange={e =>
                onStatusChange(e.target.value as OrderStatus | 'ALL')
              }
              className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="PARTIAL">Partial</option>
            </select>

            <p className="text-sm text-muted-foreground">
              {orderCount} order
              {orderCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerContactHeader;
