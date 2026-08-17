'use client';

import { Edit, Trash2 } from 'lucide-react';

import { Wholesale, WholesaleMeta } from '@/types/accounts/wholesale.types';
import LoadingSpinner from '@/components/layouts/admin/shared/dashboard/LoadingSpinner';

interface WholesaleTableProps {
  wholesales: Wholesale[];
  meta: WholesaleMeta;
  loading: boolean;
  deletingId: string | null;

  onEdit: (wholesale: Wholesale) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
}

const formatMoney = (value: string | number) => {
  return `৳${Number(value || 0).toLocaleString()}`;
};

const formatDate = (date: string) => {
  if (!date) return '-';

  return new Date(date).toLocaleDateString('en-GB');
};

const WholesaleTable = ({
  wholesales,
  meta,
  loading,
  deletingId,
  onEdit,
  onDelete,
  onPageChange,
}: WholesaleTableProps) => {
  if (loading) {
    return <LoadingSpinner message="wholesale" />;
  }

  return (
    <div className="overflow-hidden rounded-md border bg-background">
      {/* Mobile scroll */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1500px] text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="px-4 py-3 text-left font-semibold">Date</th>

              <th className="px-4 py-3 text-left font-semibold">Product</th>

              <th className="px-4 py-3 text-left font-semibold">Qty</th>

              <th className="px-4 py-3 text-left font-semibold">RMB</th>

              <th className="px-4 py-3 text-left font-semibold">Price (৳)</th>

              <th className="px-4 py-3 text-left font-semibold">Weight</th>

              <th className="px-4 py-3 text-left font-semibold">Shipping</th>

              <th className="px-4 py-3 text-left font-semibold">One Pair</th>

              <th className="px-4 py-3 text-left font-semibold">Sale Price</th>

              <th className="px-4 py-3 text-left font-semibold">Profit</th>

              <th className="px-4 py-3 text-left font-semibold">Loss</th>

              <th className="px-4 py-3 text-left font-semibold">Status</th>

              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {wholesales.length === 0 ? (
              <tr>
                <td
                  colSpan={13}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  No wholesale records found.
                </td>
              </tr>
            ) : (
              wholesales.map(item => (
                <tr
                  key={item.id}
                  className="border-b last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {formatDate(item.date)}
                  </td>

                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{item.productName}</p>

                      {item.courierChina && (
                        <p className="text-xs text-muted-foreground">
                          {item.courierChina}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3">{item.quantity}</td>

                  <td className="px-4 py-3">
                    ¥{Number(item.priceRmb).toLocaleString()}
                  </td>

                  <td className="px-4 py-3">{formatMoney(item.priceTaka)}</td>

                  <td className="px-4 py-3">
                    {Number(item.weight).toLocaleString()} kg
                  </td>

                  <td className="px-4 py-3">{formatMoney(item.shipping)}</td>

                  <td className="px-4 py-3">
                    {formatMoney(item.onePairPrice)}
                  </td>

                  <td className="px-4 py-3">{formatMoney(item.salePrice)}</td>

                  <td className="px-4 py-3 font-semibold text-green-600">
                    {formatMoney(item.profit)}
                  </td>

                  <td className="px-4 py-3 font-semibold text-red-600">
                    {formatMoney(item.loss)}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.status === 'PAID'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        disabled={deletingId === item.id}
                        className="rounded-md p-2 hover:bg-muted"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="rounded-md p-2 text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        {deletingId === item.id ? (
                          <span className="block h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
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
        <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPages} · {meta.total} total
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!meta.hasPreviousPage}
              onClick={() => onPageChange(meta.page - 1)}
              className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={!meta.hasNextPage}
              onClick={() => onPageChange(meta.page + 1)}
              className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WholesaleTable;
