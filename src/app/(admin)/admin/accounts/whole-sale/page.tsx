'use client';

import { useCallback, useEffect, useState } from 'react';

import { toast } from 'sonner';

import AccountPageHeader from '@/components/layouts/admin/accounts/shared/AccountPageHeader';

import WholesaleFormModal from '@/components/layouts/admin/accounts/wholesale/WholesaleFormModal';

import WholesaleTable from '@/components/layouts/admin/accounts/wholesale/WholesaleTable';

import {
  createWholesale,
  deleteWholesale,
  getAllWholesales,
  updateWholesale,
} from '@/services/accounts/wholesale.service';

import { Banknote, Package, ShoppingCart, TrendingUp } from 'lucide-react';

import {
  Wholesale,
  WholesaleMeta,
  WholesalePayload,
  WholesaleSummary,
} from '@/types/accounts/wholesale.types';

const ITEMS_PER_PAGE = 10;

const initialMeta: WholesaleMeta = {
  total: 0,
  page: 1,
  limit: ITEMS_PER_PAGE,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

const initialSummary: WholesaleSummary = {
  totalWholesales: 0,
  paid: 0,
  unpaid: 0,
  totalAmount: 0,
  totalShipping: 0,
  totalQuantity: 0,
  totalWeight: 0,
  totalProfit: 0,
  totalLoss: 0,
};

const Page = () => {
  const [wholesales, setWholesales] = useState<Wholesale[]>([]);

  const [meta, setMeta] = useState<WholesaleMeta>(initialMeta);

  const [summary, setSummary] = useState<WholesaleSummary>(initialSummary);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedWholesale, setSelectedWholesale] = useState<Wholesale | null>(
    null,
  );

  const [submitLoading, setSubmitLoading] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ==============================
  // FETCH
  // ==============================

  const fetchWholesales = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getAllWholesales({
        page,
        limit: ITEMS_PER_PAGE,
      });

      setWholesales(Array.isArray(response?.data) ? response.data : []);

      if (response?.meta) {
        setMeta(response.meta);
      }

      if (response?.summary) {
        setSummary(response.summary);
      }
    } catch (error) {
      console.error('Failed to fetch wholesales:', error);

      toast.error('Failed to load wholesales');

      setWholesales([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchWholesales();
  }, [fetchWholesales]);

  // ==============================
  // SUMMARY CARDS
  // ==============================

  const summaryCards = [
    {
      label: 'Total Wholesales',
      value: summary.totalWholesales,
      icon: ShoppingCart,
    },

    {
      label: 'Total Amount',
      value: `৳${Number(summary.totalAmount).toLocaleString()}`,
      icon: Banknote,
      className: '',
    },
    {
      label: 'Shipping',
      value: `৳${Number(summary.totalShipping).toLocaleString()}`,
      icon: Package,
      className: '',
    },

    {
      label: 'Profit',
      value: `৳${Number(summary.totalProfit).toLocaleString()}`,
      icon: TrendingUp,
      className: '',
    },
  ];

  // ==============================
  // CREATE
  // ==============================

  const handleCreate = () => {
    setSelectedWholesale(null);
    setModalOpen(true);
  };

  // ==============================
  // EDIT
  // ==============================

  const handleEdit = (wholesale: Wholesale) => {
    setSelectedWholesale(wholesale);
    setModalOpen(true);
  };

  // ==============================
  // CLOSE
  // ==============================

  const handleCloseModal = () => {
    if (submitLoading) return;

    setModalOpen(false);
    setSelectedWholesale(null);
  };

  // ==============================
  // CREATE / UPDATE
  // ==============================

  const handleSubmit = async (payload: WholesalePayload) => {
    try {
      setSubmitLoading(true);

      if (selectedWholesale) {
        const response = await updateWholesale(selectedWholesale.id, payload);

        toast.success(response?.message || 'Wholesale updated successfully');
      } else {
        const response = await createWholesale(payload);

        toast.success(response?.message || 'Wholesale created successfully');
      }

      setModalOpen(false);
      setSelectedWholesale(null);

      await fetchWholesales();
    } catch (error) {
      console.error('Failed to save wholesale:', error);

      toast.error(
        selectedWholesale
          ? 'Failed to update wholesale'
          : 'Failed to create wholesale',
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  // ==============================
  // DELETE
  // ==============================

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this wholesale record?',
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await deleteWholesale(id);

      toast.success(response?.message || 'Wholesale deleted successfully');

      if (wholesales.length === 1 && page > 1) {
        setPage(prev => prev - 1);
      } else {
        await fetchWholesales();
      }
    } catch (error) {
      console.error('Failed to delete wholesale:', error);

      toast.error('Failed to delete wholesale');
    } finally {
      setDeletingId(null);
    }
  };

  // ==============================
  // PAGINATION
  // ==============================

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > meta.totalPages) {
      return;
    }

    setPage(newPage);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <AccountPageHeader
        title="Wholesale"
        description="Manage wholesale purchases, pricing, shipping and profit."
        buttonText="New Wholesale"
        onCreate={handleCreate}
        summaryCards={summaryCards}
      />

      {/* TABLE */}

      <WholesaleTable
        wholesales={wholesales}
        meta={meta}
        loading={loading}
        deletingId={deletingId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
      />

      {/* MODAL */}

      <WholesaleFormModal
        open={modalOpen}
        wholesale={selectedWholesale}
        loading={submitLoading}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      {/* DELETE LOADING */}

      {deletingId && (
        <div className="pointer-events-none fixed bottom-5 right-5 z-[60]">
          <div className="flex items-center gap-2 rounded-lg border bg-background px-4 py-3 text-sm shadow-lg">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Deleting...
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
