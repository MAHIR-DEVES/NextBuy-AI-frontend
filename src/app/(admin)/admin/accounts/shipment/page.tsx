'use client';

import { useCallback, useEffect, useState } from 'react';

import { toast } from 'sonner';

import AccountPageHeader from '@/components/layouts/admin/accounts/shared/AccountPageHeader';

import ShipmentFormModal from '@/components/layouts/admin/accounts/shipment/ShipmentFormModal';

import ShipmentTable from '@/components/layouts/admin/accounts/shipment/ShipmentTable';

import {
  createShipment,
  deleteShipment,
  getAllShipments,
  updateShipment,
} from '@/services/accounts/shipment.service';

import {
  Shipment,
  ShipmentMeta,
  ShipmentPayload,
  ShipmentSummary,
} from '@/types/accounts/shipment.types';
import { Box, Package, Truck, Wallet } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

const initialMeta: ShipmentMeta = {
  total: 0,
  page: 1,
  limit: ITEMS_PER_PAGE,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

const initialSummary: ShipmentSummary = {
  totalShipments: 0,
  paid: 0,
  unpaid: 0,
  processing: 0,
  completed: 0,
  totalAmount: 0,
  totalShippingCharge: 0,
  totalQuantity: 0,
  totalWeight: 0,
};

const Page = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  const [meta, setMeta] = useState<ShipmentMeta>(initialMeta);

  const [summary, setSummary] = useState<ShipmentSummary>(initialSummary);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null,
  );

  const [submitLoading, setSubmitLoading] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ==============================
  // FETCH
  // ==============================

  const fetchShipments = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getAllShipments({
        page,
        limit: ITEMS_PER_PAGE,
      });

      setShipments(Array.isArray(response?.data) ? response.data : []);

      if (response?.meta) {
        setMeta(response.meta);
      }

      if (response?.summary) {
        setSummary(response.summary);
      }
    } catch (error) {
      console.error('Failed to fetch shipments:', error);

      toast.error('Failed to load shipments');

      setShipments([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  // ==============================
  // SUMMARY CARDS
  // ==============================

  const summaryCards = [
    {
      label: 'Total Shipments',
      value: summary.totalShipments,
      icon: Package,
    },

    {
      label: 'Total Amount',
      value: `৳${Number(summary.totalAmount).toLocaleString()}`,
      className: '',
      icon: Wallet,
    },
    {
      label: 'Shipping Charge',
      value: `৳${Number(summary.totalShippingCharge).toLocaleString()}`,
      className: '',
      icon: Truck,
    },
    {
      label: 'Total Quantity',
      value: summary.totalQuantity,
      className: '',
      icon: Box,
    },
  ];
  // ==============================
  // CREATE
  // ==============================

  const handleCreate = () => {
    setSelectedShipment(null);
    setModalOpen(true);
  };

  // ==============================
  // EDIT
  // ==============================

  const handleEdit = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setModalOpen(true);
  };

  // ==============================
  // CLOSE MODAL
  // ==============================

  const handleCloseModal = () => {
    if (submitLoading) return;

    setModalOpen(false);
    setSelectedShipment(null);
  };

  // ==============================
  // CREATE / UPDATE
  // ==============================

  const handleSubmit = async (payload: ShipmentPayload) => {
    try {
      setSubmitLoading(true);

      if (selectedShipment) {
        const response = await updateShipment(selectedShipment.id, payload);

        toast.success(response?.message || 'Shipment updated successfully');
      } else {
        const response = await createShipment(payload);

        toast.success(response?.message || 'Shipment created successfully');
      }

      setModalOpen(false);
      setSelectedShipment(null);

      await fetchShipments();
    } catch (error) {
      console.error('Failed to save shipment:', error);

      toast.error(
        selectedShipment
          ? 'Failed to update shipment'
          : 'Failed to create shipment',
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
      'Are you sure you want to delete this shipment?',
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await deleteShipment(id);

      toast.success(response?.message || 'Shipment deleted successfully');

      if (shipments.length === 1 && page > 1) {
        setPage(prev => prev - 1);
      } else {
        await fetchShipments();
      }
    } catch (error) {
      console.error('Failed to delete shipment:', error);

      toast.error('Failed to delete shipment');
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
        title="Shipments"
        description="Manage shipment records and shipping information."
        buttonText="New Shipment"
        onCreate={handleCreate}
        summaryCards={summaryCards}
      />

      {/* TABLE */}

      <ShipmentTable
        shipments={shipments}
        meta={meta}
        loading={loading}
        deletingId={deletingId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
      />

      {/* MODAL */}

      <ShipmentFormModal
        open={modalOpen}
        shipment={selectedShipment}
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
