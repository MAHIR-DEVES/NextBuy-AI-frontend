'use client';

import { Pencil, Trash2 } from 'lucide-react';

import {
  MonthlyCost,
  MonthlyCostMeta,
} from '@/types/accounts/monthly-cost.types';
import LoadingSpinner from '@/components/layouts/admin/shared/dashboard/LoadingSpinner';

interface MonthlyCostTableProps {
  costs: MonthlyCost[];
  meta: MonthlyCostMeta;
  loading: boolean;
  deletingId: string | null;
  onEdit: (cost: MonthlyCost) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
}

const MonthlyCostTable = ({
  costs,
  meta,
  loading,
  deletingId,
  onEdit,
  onDelete,
  onPageChange,
}: MonthlyCostTableProps) => {
  const formatDate = (date: string) => {
    if (!date) return '-';

    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: string | number) => {
    return `৳${Number(amount || 0).toLocaleString()}`;
  };

  return (
    <div className="overflow-hidden rounded-md border bg-background">
      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Date</th>

              <th className="px-4 py-3 text-left font-semibold">
                Description / Purpose
              </th>

              <th className="px-4 py-3 text-right font-semibold">Amount</th>

              <th className="px-4 py-3 text-center font-semibold">Status</th>

              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center">
                  <LoadingSpinner message="monthly cost" />
                </td>
              </tr>
            ) : costs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  No monthly costs found.
                </td>
              </tr>
            ) : (
              costs.map(cost => (
                <tr
                  key={cost.id}
                  className="border-b last:border-0 hover:bg-muted/20"
                >
                  <td className="whitespace-nowrap px-4 py-4">
                    {formatDate(cost.date)}
                  </td>

                  <td className="max-w-[350px] px-4 py-4">
                    <p className="truncate font-medium">
                      {cost.description || '-'}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-right font-semibold">
                    {formatAmount(cost.amount)}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        cost.status === 'PAID'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}
                    >
                      {cost.status === 'PAID' ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(cost)}
                        disabled={deletingId === cost.id}
                        className="rounded-md border p-2 hover:bg-muted disabled:opacity-50"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(cost.id)}
                        disabled={deletingId === cost.id}
                        className="rounded-md border p-2 text-destructive hover:bg-destructive/10 disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === cost.id ? (
                          <span className="block h-4 w-4 animate-spin rounded-full border-2 border-destructive border-t-transparent" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      {!loading && costs.length > 0 && (
        <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPages} · {meta.total} total
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(meta.page - 1)}
              disabled={!meta.hasPreviousPage}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <span className="min-w-10 text-center text-sm font-medium">
              {meta.page}
            </span>

            <button
              type="button"
              onClick={() => onPageChange(meta.page + 1)}
              disabled={!meta.hasNextPage}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyCostTable;
