'use client';

import { Pencil, Trash2 } from 'lucide-react';

import {
  SteadfastWithdrawal,
  SteadfastWithdrawalMeta,
} from '@/types/accounts/steadfast-withdrawal.types';
import LoadingSpinner from '@/components/layouts/admin/shared/dashboard/LoadingSpinner';

interface SteadfastWithdrawalTableProps {
  withdrawals: SteadfastWithdrawal[];
  meta: SteadfastWithdrawalMeta;
  loading: boolean;
  deletingId: string | null;
  onEdit: (withdrawal: SteadfastWithdrawal) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
}

const SteadfastWithdrawalTable = ({
  withdrawals,
  meta,
  loading,
  deletingId,
  onEdit,
  onDelete,
  onPageChange,
}: SteadfastWithdrawalTableProps) => {
  if (loading) {
    return <LoadingSpinner message="withdrawals"></LoadingSpinner>;
  }

  if (withdrawals.length === 0) {
    return (
      <div className="rounded-md border px-6 py-16 text-center">
        <p className="font-medium">No withdrawals found</p>

        <p className="mt-1 text-sm text-muted-foreground">
          No Steadfast withdrawal records are available.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full min-w-[1000px] text-sm">
        <thead className="bg-muted/50">
          <tr className="border-b">
            <th className="px-4 py-3 text-left font-medium">Date</th>

            <th className="px-4 py-3 text-left font-medium">Description</th>

            <th className="px-4 py-3 text-right font-medium">Amount</th>

            <th className="px-4 py-3 text-left font-medium">Status</th>

            <th className="px-4 py-3 text-left font-medium">Withdraw By</th>

            <th className="px-4 py-3 text-left font-medium">Payment Method</th>

            <th className="px-4 py-3 text-left font-medium">Clearance</th>

            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {withdrawals.map(withdrawal => (
            <tr
              key={withdrawal.id}
              className="border-b last:border-0 hover:bg-muted/30"
            >
              <td className="whitespace-nowrap px-4 py-3">
                {new Date(withdrawal.date).toLocaleDateString('en-GB')}
              </td>

              <td className="max-w-[220px] truncate px-4 py-3">
                {withdrawal.description}
              </td>

              <td className="whitespace-nowrap px-4 py-3 text-right font-medium">
                ৳{Number(withdrawal.amount).toLocaleString()}
              </td>

              <td className="px-4 py-3">
                <span
                  className={
                    withdrawal.status === 'PAID'
                      ? 'rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700'
                      : 'rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700'
                  }
                >
                  {withdrawal.status}
                </span>
              </td>

              <td className="px-4 py-3">{withdrawal.withdrawBy}</td>

              <td className="px-4 py-3">{withdrawal.paymentMethod}</td>

              <td className="px-4 py-3">
                <span
                  className={
                    withdrawal.clearanceStatus === 'COMPLETED'
                      ? 'rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700'
                      : 'rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-700'
                  }
                >
                  {withdrawal.clearanceStatus}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(withdrawal)}
                    className="rounded-md p-2 hover:bg-muted"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(withdrawal.id)}
                    disabled={deletingId === withdrawal.id}
                    className="rounded-md p-2 text-destructive hover:bg-destructive/10 disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === withdrawal.id ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-destructive border-t-transparent" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}

      <div className="flex items-center justify-between border-t px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Page {meta.page} of {meta.totalPages}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={!meta.hasPreviousPage}
            onClick={() => onPageChange(meta.page - 1)}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <button
            type="button"
            disabled={!meta.hasNextPage}
            onClick={() => onPageChange(meta.page + 1)}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SteadfastWithdrawalTable;
