'use client';

import { X } from 'lucide-react';

import SteadfastWithdrawalForm from './SteadfastWithdrawalForm';

import {
  SteadfastWithdrawal,
  SteadfastWithdrawalPayload,
} from '@/types/accounts/steadfast-withdrawal.types';

interface SteadfastWithdrawalFormModalProps {
  open: boolean;
  withdrawal: SteadfastWithdrawal | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: SteadfastWithdrawalPayload) => Promise<void>;
}

const SteadfastWithdrawalFormModal = ({
  open,
  withdrawal,
  loading = false,
  onClose,
  onSubmit,
}: SteadfastWithdrawalFormModalProps) => {
  if (!open) {
    return null;
  }

  const isEdit = Boolean(withdrawal);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={e => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border bg-background shadow-xl">
        {/* HEADER */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              {isEdit
                ? 'Edit Steadfast Withdrawal'
                : 'New Steadfast Withdrawal'}
            </h2>

            <p className="mt-0.5 text-xs text-muted-foreground">
              {isEdit
                ? 'Update withdrawal information.'
                : 'Add a new Steadfast withdrawal.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-md p-2 hover:bg-muted disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* FORM */}

        <div className="p-5">
          <SteadfastWithdrawalForm
            withdrawal={withdrawal}
            loading={loading}
            onSubmit={onSubmit}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default SteadfastWithdrawalFormModal;
