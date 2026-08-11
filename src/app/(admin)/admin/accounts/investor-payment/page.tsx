'use client';

import {
  CircleDollarSign,
  CirclePlus,
  ReceiptText,
  Wallet,
} from 'lucide-react';

import { useCallback, useEffect, useState } from 'react';

import { toast } from 'sonner';

import AccountPageHeader from '@/components/layouts/admin/accounts/shared/AccountPageHeader';

import InvestorPaymentFormModal from '@/components/layouts/admin/accounts/investor-payment/InvestorPaymentFormModal';

import InvestorPaymentTable from '@/components/layouts/admin/accounts/investor-payment/InvestorPaymentTable';

import {
  createInvestorPayment,
  deleteInvestorPayment,
  getAllInvestorPayments,
  updateInvestorPayment,
} from '@/services/accounts/investor-payment.service';

import {
  InvestorPayment,
  InvestorPaymentMeta,
  InvestorPaymentPayload,
  InvestorPaymentSummary,
} from '@/types/accounts/investor-payment.types';

const ITEMS_PER_PAGE = 10;

const initialMeta: InvestorPaymentMeta = {
  total: 0,
  page: 1,
  limit: ITEMS_PER_PAGE,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

const initialSummary: InvestorPaymentSummary = {
  totalPayments: 0,
  paid: 0,
  unpaid: 0,
  totalAmount: 0,
  totalInvestedAmount: 0,
  totalReceivedAmount: 0,
  totalMonthsPaid: 0,
};

const Page = () => {
  const [payments, setPayments] = useState<InvestorPayment[]>([]);

  const [meta, setMeta] = useState<InvestorPaymentMeta>(initialMeta);

  const [summary, setSummary] =
    useState<InvestorPaymentSummary>(initialSummary);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedPayment, setSelectedPayment] =
    useState<InvestorPayment | null>(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ==============================
  // FETCH
  // ==============================

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);

      const result = await getAllInvestorPayments({
        page,
        limit: ITEMS_PER_PAGE,
      });

      setPayments(Array.isArray(result?.data) ? result.data : []);

      if (result?.meta) {
        setMeta(result.meta);
      }

      if (result?.summary) {
        setSummary(result.summary);
      }
    } catch (error) {
      console.error('Failed to fetch investor payments:', error);

      toast.error('Failed to load investor payments');

      setPayments([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // ==============================
  // SUMMARY CARDS
  // ==============================

  const summaryCards = [
    {
      label: 'Total Payments',
      value: summary.totalPayments,
      icon: ReceiptText,
    },

    {
      label: 'Total Amount',
      value: `৳${Number(summary.totalAmount).toLocaleString()}`,
      icon: Wallet,
      className: '',
    },

    {
      label: 'Total Invested',
      value: `৳${Number(summary.totalInvestedAmount).toLocaleString()}`,
      icon: CircleDollarSign,
      className: '',
    },

    {
      label: 'Total Received',
      value: `৳${Number(summary.totalReceivedAmount).toLocaleString()}`,
      icon: CirclePlus,
      className: '',
    },
  ];

  // ==============================
  // CREATE
  // ==============================

  const handleCreate = () => {
    setSelectedPayment(null);
    setModalOpen(true);
  };

  // ==============================
  // EDIT
  // ==============================

  const handleEdit = (payment: InvestorPayment) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  // ==============================
  // CLOSE MODAL
  // ==============================

  const handleCloseModal = () => {
    if (submitLoading) return;

    setModalOpen(false);
    setSelectedPayment(null);
  };

  // ==============================
  // CREATE / UPDATE
  // ==============================

  const handleSubmit = async (payload: InvestorPaymentPayload) => {
    try {
      setSubmitLoading(true);

      if (selectedPayment) {
        const response = await updateInvestorPayment(
          selectedPayment.id,
          payload,
        );

        toast.success(
          response?.message || 'Investor payment updated successfully',
        );
      } else {
        const response = await createInvestorPayment(payload);

        toast.success(
          response?.message || 'Investor payment created successfully',
        );
      }

      setModalOpen(false);
      setSelectedPayment(null);

      await fetchPayments();
    } catch (error) {
      console.error('Failed to save investor payment:', error);

      toast.error(
        selectedPayment
          ? 'Failed to update investor payment'
          : 'Failed to create investor payment',
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
      'Are you sure you want to delete this investor payment?',
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await deleteInvestorPayment(id);

      toast.success(
        response?.message || 'Investor payment deleted successfully',
      );

      if (payments.length === 1 && page > 1) {
        setPage(prev => prev - 1);
      } else {
        await fetchPayments();
      }
    } catch (error) {
      console.error('Failed to delete investor payment:', error);

      toast.error('Failed to delete investor payment');
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
        title="Investor Payments"
        description="Manage investor payments and investment records."
        buttonText="New Payment"
        onCreate={handleCreate}
        summaryCards={summaryCards}
      />

      {/* TABLE */}

      <InvestorPaymentTable
        payments={payments}
        meta={meta}
        loading={loading}
        deletingId={deletingId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
      />

      {/* MODAL */}

      <InvestorPaymentFormModal
        open={modalOpen}
        payment={selectedPayment}
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
