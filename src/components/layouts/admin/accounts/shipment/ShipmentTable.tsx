'use client';

import { Edit, Loader2, Trash2 } from 'lucide-react';

import { Shipment, ShipmentMeta } from '@/types/accounts/shipment.types';
import LoadingSpinner from '@/components/layouts/shared/dashboard/LoadingSpinner';

interface ShipmentTableProps {
  shipments: Shipment[];
  meta: ShipmentMeta;
  loading: boolean;
  deletingId: string | null;

  onEdit: (shipment: Shipment) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
}

const formatDate = (date?: string | null) => {
  if (!date) return '-';

  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatNumber = (value: string | number) => {
  return Number(value).toLocaleString();
};

const ShipmentTable = ({
  shipments,
  meta,
  loading,
  deletingId,
  onEdit,
  onDelete,
  onPageChange,
}: ShipmentTableProps) => {
  if (loading) {
    return <LoadingSpinner message="shipment"></LoadingSpinner>;
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px] text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Date</th>

              <th className="px-4 py-3 text-left font-semibold">Product</th>

              <th className="px-4 py-3 text-left font-semibold">Description</th>

              <th className="px-4 py-3 text-right font-semibold">Amount</th>

              <th className="px-4 py-3 text-center font-semibold">Qty</th>

              <th className="px-4 py-3 text-left font-semibold">
                Shipping Company
              </th>

              <th className="px-4 py-3 text-right font-semibold">Weight</th>

              <th className="px-4 py-3 text-right font-semibold">Per Kg</th>

              <th className="px-4 py-3 text-right font-semibold">
                Shipping Charge
              </th>

              <th className="px-4 py-3 text-center font-semibold">Billing</th>

              <th className="px-4 py-3 text-center font-semibold">Shipping</th>

              <th className="px-4 py-3 text-left font-semibold">
                Receiving Date
              </th>

              <th className="px-4 py-3 text-left font-semibold">Investor</th>

              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {shipments.length === 0 ? (
              <tr>
                <td
                  colSpan={15}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No shipments found.
                </td>
              </tr>
            ) : (
              shipments.map(shipment => (
                <tr key={shipment.id} className="hover:bg-muted/20">
                  <td className="whitespace-nowrap px-4 py-3">
                    {formatDate(shipment.date)}
                  </td>

                  <td className="max-w-[180px] px-4 py-3 font-medium">
                    <div className="truncate">{shipment.productName}</div>
                  </td>

                  <td className="max-w-[220px] px-4 py-3">
                    <div className="truncate text-muted-foreground">
                      {shipment.description || '-'}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right font-medium">
                    ৳{formatNumber(shipment.amount)}
                  </td>

                  <td className="px-4 py-3 text-center">{shipment.quantity}</td>

                  <td className="px-4 py-3">{shipment.shippingCompany}</td>

                  <td className="px-4 py-3 text-right">
                    {formatNumber(shipment.weight)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    ৳{formatNumber(shipment.perKgRate)}
                  </td>

                  <td className="px-4 py-3 text-right font-medium">
                    ৳{formatNumber(shipment.shippingCharge)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        shipment.billingStatus === 'PAID'
                          ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400'
                      }`}
                    >
                      {shipment.billingStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        shipment.shippingStatus === 'COMPLETED'
                          ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                      }`}
                    >
                      {shipment.shippingStatus}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    {formatDate(shipment.receivingDate)}
                  </td>

                  <td className="px-4 py-3">{shipment.investorName || '-'}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(shipment)}
                        className="rounded-md p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(shipment.id)}
                        disabled={deletingId === shipment.id}
                        className="rounded-md p-2 text-red-600 hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950"
                        title="Delete"
                      >
                        {deletingId === shipment.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
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

      {meta.totalPages > 0 && (
        <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPages}
            {' · '}
            {meta.total} shipments
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!meta.hasPreviousPage}
              onClick={() => onPageChange(meta.page - 1)}
              className="rounded-md border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={!meta.hasNextPage}
              onClick={() => onPageChange(meta.page + 1)}
              className="rounded-md border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentTable;
