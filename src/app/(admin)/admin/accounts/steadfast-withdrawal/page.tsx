'use client';

import { useCallback, useEffect, useState } from 'react';

import { toast } from 'sonner';

import SteadfastWithdrawalFormModal from '@/components/layouts/admin/accounts/steadfast-withdrawal/SteadfastWithdrawalFormModal';

import SteadfastWithdrawalTable from '@/components/layouts/admin/accounts/steadfast-withdrawal/SteadfastWithdrawalTable';

import {
  createSteadfastWithdrawal,
  deleteSteadfastWithdrawal,
  getAllSteadfastWithdrawals,
  updateSteadfastWithdrawal,
} from '@/services/accounts/steadfast-withdrawal.service';

import {
  SteadfastWithdrawal,
  SteadfastWithdrawalMeta,
  SteadfastWithdrawalPayload,
  SteadfastWithdrawalSummary,
} from '@/types/accounts/steadfast-withdrawal.types';
import AccountPageHeader from '@/components/layouts/admin/accounts/shared/AccountPageHeader';

const ITEMS_PER_PAGE = 10;

const initialMeta: SteadfastWithdrawalMeta = {
  total: 0,
  page: 1,
  limit: ITEMS_PER_PAGE,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

import { CircleDollarSign, CreditCard, Receipt, Wallet } from 'lucide-react';
const initialSummary: SteadfastWithdrawalSummary = {
  totalWithdrawals: 0,
  paid: 0,
  unpaid: 0,
  totalAmount: 0,
};

const Page = () => {
  const [withdrawals, setWithdrawals] = useState<SteadfastWithdrawal[]>([]);

  const [meta, setMeta] = useState<SteadfastWithdrawalMeta>(initialMeta);

  const [summary, setSummary] =
    useState<SteadfastWithdrawalSummary>(initialSummary);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<SteadfastWithdrawal | null>(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ==============================
  // FETCH
  // ==============================

  const fetchWithdrawals = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getAllSteadfastWithdrawals({
        page,
        limit: ITEMS_PER_PAGE,
      });

      const result = response?.data;

      setWithdrawals(Array.isArray(result?.data) ? result.data : []);

      if (result?.meta) {
        setMeta(result.meta);
      }

      if (result?.summary) {
        setSummary(result.summary);
      }
    } catch (error) {
      console.error('Failed to fetch Steadfast withdrawals:', error);

      toast.error('Failed to load Steadfast withdrawals');

      setWithdrawals([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchWithdrawals();
  }, [fetchWithdrawals]);

  // summary data
  const summaryCards = [
    {
      label: 'Total Withdrawals',
      value: summary.totalWithdrawals,
      icon: Receipt,
      iconClassName: 'text-primary',
    },
    {
      label: 'Paid',
      value: summary.paid,
      icon: CircleDollarSign,
      className: '',
      iconClassName: 'text-green-600',
    },
    {
      label: 'Unpaid',
      value: summary.unpaid,
      icon: CreditCard,
      className: '',
      iconClassName: 'text-yellow-600',
    },
    {
      label: 'Total Amount',
      value: `৳${Number(summary.totalAmount).toLocaleString()}`,
      icon: Wallet,
      className: '',
      iconClassName: 'text-blue-600',
    },
  ];

  // ==============================
  // CREATE
  // ==============================

  const handleCreate = () => {
    setSelectedWithdrawal(null);
    setModalOpen(true);
  };

  // ==============================
  // EDIT
  // ==============================

  const handleEdit = (withdrawal: SteadfastWithdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setModalOpen(true);
  };

  // ==============================
  // CLOSE MODAL
  // ==============================

  const handleCloseModal = () => {
    if (submitLoading) return;

    setModalOpen(false);
    setSelectedWithdrawal(null);
  };

  // ==============================
  // CREATE / UPDATE
  // ==============================

  const handleSubmit = async (payload: SteadfastWithdrawalPayload) => {
    try {
      setSubmitLoading(true);

      if (selectedWithdrawal) {
        const response = await updateSteadfastWithdrawal(
          selectedWithdrawal.id,
          payload,
        );

        toast.success(
          response?.message || 'Steadfast withdrawal updated successfully',
        );
      } else {
        const response = await createSteadfastWithdrawal(payload);

        toast.success(
          response?.message || 'Steadfast withdrawal created successfully',
        );
      }

      setModalOpen(false);
      setSelectedWithdrawal(null);

      await fetchWithdrawals();
    } catch (error) {
      console.error('Failed to save Steadfast withdrawal:', error);

      toast.error(
        selectedWithdrawal
          ? 'Failed to update Steadfast withdrawal'
          : 'Failed to create Steadfast withdrawal',
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
      'Are you sure you want to delete this withdrawal?',
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await deleteSteadfastWithdrawal(id);

      toast.success(
        response?.message || 'Steadfast withdrawal deleted successfully',
      );

      if (withdrawals.length === 1 && page > 1) {
        setPage(prev => prev - 1);
      } else {
        await fetchWithdrawals();
      }
    } catch (error) {
      console.error('Failed to delete Steadfast withdrawal:', error);

      toast.error('Failed to delete Steadfast withdrawal');
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
        title="Steadfast Withdrawals"
        description="Manage Steadfast withdrawal records."
        buttonText="New Withdrawal"
        onCreate={handleCreate}
        summaryCards={summaryCards}
      />

      {/* TABLE */}

      <SteadfastWithdrawalTable
        withdrawals={withdrawals}
        meta={meta}
        loading={loading}
        deletingId={deletingId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
      />

      {/* MODAL */}

      <SteadfastWithdrawalFormModal
        open={modalOpen}
        withdrawal={selectedWithdrawal}
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
