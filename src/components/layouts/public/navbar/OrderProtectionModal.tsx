'use client';
import React from 'react';
import { X, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const OrderProtectionModal = ({ isOpen, setIsOpen }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute left-0 right-0 top-full z-50 bg-white border-t shadow-2xl"
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className="container mx-auto px-6 py-10 relative"
        onMouseEnter={() => setIsOpen(true)}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Order Protection Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg hover:shadow-md transition">
            <ShieldCheck className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
            <p className="text-sm text-gray-600">
              Your payments are protected with advanced encryption.
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-md transition">
            <Truck className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="font-semibold text-lg mb-2">On-time Delivery</h3>
            <p className="text-sm text-gray-600">
              Guaranteed delivery within promised time.
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-md transition">
            <RefreshCcw className="h-8 w-8 text-orange-500 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Refund Policy</h3>
            <p className="text-sm text-gray-600">
              Easy refund if product doesn’t match expectations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProtectionModal;
