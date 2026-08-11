'use client';

import { Pencil, Trash2 } from 'lucide-react';

import {
  InvestorPayment,
  InvestorPaymentMeta,
} from '@/types/accounts/investor-payment.types';
import LoadingSpinner from '@/components/layouts/shared/dashboard/LoadingSpinner';

interface InvestorPaymentTableProps {
  payments: InvestorPayment[];
  meta: InvestorPaymentMeta;
  loading: boolean;
  deletingId: string | null;

  onEdit: (payment: InvestorPayment) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
}

const formatAmount = (value: string | number) => {
  return `৳${Number(value || 0).toLocaleString()}`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB');
};

const InvestorPaymentTable = ({
  payments,
  meta,
  loading,
  deletingId,
  onEdit,
  onDelete,
  onPageChange,
}: InvestorPaymentTableProps) => {
  if (loading) {
    return <LoadingSpinner message="investor payment" />;
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full min-w-[1250px] text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>

              <th className="px-4 py-3 text-left">Investor</th>

              <th className="px-4 py-3 text-left">Description</th>

              <th className="px-4 py-3 text-right">Amount</th>

              <th className="px-4 py-3 text-right">Invested</th>

              <th className="px-4 py-3 text-right">Received</th>

              <th className="px-4 py-3 text-left">Status</th>

              <th className="px-4 py-3 text-left">Investment</th>

              <th className="px-4 py-3 text-center">Months</th>

              <th className="px-4 py-3 text-left">Payment By</th>

              <th className="px-4 py-3 text-left">Reference</th>

              <th className="px-4 py-3 text-left">Platform</th>

              <th className="px-4 py-3 text-left">Products</th>

              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan={14}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No investor payments found.
                </td>
              </tr>
            ) : (
              payments.map(payment => (
                <tr
                  key={payment.id}
                  className="border-b last:border-0 hover:bg-muted/20"
                >
                  <td className="px-4 py-3">{formatDate(payment.date)}</td>

                  <td className="px-4 py-3 font-medium">
                    {payment.investorName}
                  </td>

                  <td className="max-w-[220px] truncate px-4 py-3">
                    {payment.description || '-'}
                  </td>

                  <td className="px-4 py-3 text-right font-medium">
                    {formatAmount(payment.amount)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {formatAmount(payment.investedAmount)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {formatAmount(payment.receivedAmount)}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        payment.status === 'PAID'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        payment.investmentStatus === 'RUNNING'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {payment.investmentStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {payment.monthsPaid}
                  </td>

                  <td className="px-4 py-3">{payment.paymentBy || '-'}</td>

                  <td className="px-4 py-3">{payment.referenceBy || '-'}</td>

                  <td className="px-4 py-3">{payment.platform || '-'}</td>

                  <td className="max-w-[150px] truncate px-4 py-3">
                    {payment.buyProducts || '-'}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(payment)}
                        className="rounded-md p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        disabled={deletingId === payment.id}
                        onClick={() => onDelete(payment.id)}
                        className="rounded-md p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {meta.totalPages > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={!meta.hasPreviousPage}
              onClick={() => onPageChange(meta.page - 1)}
              className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={!meta.hasNextPage}
              onClick={() => onPageChange(meta.page + 1)}
              className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorPaymentTable;
