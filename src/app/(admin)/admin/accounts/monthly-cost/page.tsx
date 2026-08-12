'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { CircleDollarSign, CreditCard, Receipt, Wallet } from 'lucide-react';
import AccountPageHeader from '@/components/layouts/admin/accounts/shared/AccountPageHeader';

import MonthlyCostFormModal from '@/components/layouts/admin/accounts/monthly-cost/MonthlyCostFormModal';

import MonthlyCostTable from '@/components/layouts/admin/accounts/monthly-cost/MonthlyCostTable';

import {
  createMonthlyCost,
  deleteMonthlyCost,
  getAllMonthlyCosts,
  updateMonthlyCost,
} from '@/services/accounts/monthly-cost.service';

import {
  MonthlyCost,
  MonthlyCostMeta,
  MonthlyCostPayload,
  MonthlyCostSummary,
} from '@/types/accounts/monthly-cost.types';

const ITEMS_PER_PAGE = 10;

const initialMeta: MonthlyCostMeta = {
  total: 0,
  page: 1,
  limit: ITEMS_PER_PAGE,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

const initialSummary: MonthlyCostSummary = {
  totalCosts: 0,
  paid: 0,
  unpaid: 0,
  totalAmount: 0,
};

const Page = () => {
  const [costs, setCosts] = useState<MonthlyCost[]>([]);

  const [meta, setMeta] = useState<MonthlyCostMeta>(initialMeta);

  const [summary, setSummary] = useState<MonthlyCostSummary>(initialSummary);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedCost, setSelectedCost] = useState<MonthlyCost | null>(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ==============================
  // FETCH
  // ==============================

  const fetchMonthlyCosts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getAllMonthlyCosts({
        page,
        limit: ITEMS_PER_PAGE,
      });

      setCosts(Array.isArray(response?.data) ? response.data : []);

      if (response?.meta) {
        setMeta(response.meta);
      }

      if (response?.summary) {
        setSummary(response.summary);
      }
    } catch (error) {
      console.error('Failed to fetch monthly costs:', error);

      toast.error('Failed to load monthly costs');

      setCosts([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMonthlyCosts();
  }, [fetchMonthlyCosts]);

  // ==============================
  // SUMMARY CARDS
  // ==============================

  const summaryCards = [
    {
      label: 'Total Costs',
      value: summary.totalCosts,
      icon: Receipt,
    },
    {
      label: 'Paid',
      value: summary.paid,
      className: '',
      icon: CreditCard,
    },
    {
      label: 'Unpaid',
      value: summary.unpaid,
      className: '',
      icon: Wallet,
    },
    {
      label: 'Total Amount',
      value: `৳${Number(summary.totalAmount).toLocaleString()}`,
      className: '',
      icon: CircleDollarSign,
    },
  ];

  // ==============================
  // CREATE
  // ==============================

  const handleCreate = () => {
    setSelectedCost(null);
    setModalOpen(true);
  };

  // ==============================
  // EDIT
  // ==============================

  const handleEdit = (cost: MonthlyCost) => {
    setSelectedCost(cost);
    setModalOpen(true);
  };

  // ==============================
  // CLOSE MODAL
  // ==============================

  const handleCloseModal = () => {
    if (submitLoading) return;

    setModalOpen(false);
    setSelectedCost(null);
  };

  // ==============================
  // CREATE / UPDATE
  // ==============================

  const handleSubmit = async (payload: MonthlyCostPayload) => {
    try {
      setSubmitLoading(true);

      if (selectedCost) {
        const response = await updateMonthlyCost(selectedCost.id, payload);

        toast.success(response?.message || 'Monthly cost updated successfully');
      } else {
        const response = await createMonthlyCost(payload);

        toast.success(response?.message || 'Monthly cost created successfully');
      }

      setModalOpen(false);
      setSelectedCost(null);

      await fetchMonthlyCosts();
    } catch (error) {
      console.error('Failed to save monthly cost:', error);

      toast.error(
        selectedCost
          ? 'Failed to update monthly cost'
          : 'Failed to create monthly cost',
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
      'Are you sure you want to delete this monthly cost?',
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await deleteMonthlyCost(id);

      toast.success(response?.message || 'Monthly cost deleted successfully');

      if (costs.length === 1 && page > 1) {
        setPage(prev => prev - 1);
      } else {
        await fetchMonthlyCosts();
      }
    } catch (error) {
      console.error('Failed to delete monthly cost:', error);

      toast.error('Failed to delete monthly cost');
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
        title="Monthly Costs"
        description="Manage fixed monthly cost records."
        buttonText="New Monthly Cost"
        onCreate={handleCreate}
        summaryCards={summaryCards}
      />

      {/* TABLE */}

      <MonthlyCostTable
        costs={costs}
        meta={meta}
        loading={loading}
        deletingId={deletingId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
      />

      {/* MODAL */}

      <MonthlyCostFormModal
        open={modalOpen}
        cost={selectedCost}
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
