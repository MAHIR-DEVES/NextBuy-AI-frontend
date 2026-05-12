'use client';

import { useMemo, useState } from 'react';
import { IProduct } from '@/types/products.type';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { singleOrder } from '@/services/orders.service';
import { toast } from 'sonner';

type Props = {
  open: boolean;
  onClose: () => void;
  product: IProduct;
};

const BuyNowModal = ({ open, onClose, product }: Props) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    isInsideDhaka: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;

    const { name, value, type, checked } = target;

    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  //  pricing
  const shippingFee = form.isInsideDhaka ? 60 : 120;

  const subtotal = useMemo(() => {
    return product.price * quantity;
  }, [product.price, quantity]);

  const totalPrice = subtotal + shippingFee;

  //  ORDER HANDLER
  const handleOrder = async () => {
    try {
      setLoading(true);

      const payload = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        isInsideDhaka: form.isInsideDhaka,
        productId: product.id,
        quantity,
      };

      const res = await singleOrder(payload);

      console.log('ORDER RESPONSE:', res);

      toast.success('Order placed successfully!');
      onClose();
    } catch (error) {
      console.log(error);
      toast.error('Order failed!');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white  max-w-lg rounded-2xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-orange-500 text-white p-4">
          <h2 className="text-lg font-semibold">Confirm Your Order</h2>
          <p className="text-sm opacity-90">Review before checkout</p>
        </div>

        <div className="p-5 space-y-5">
          {/* PRODUCT CARD */}
          <div className="flex gap-4 border rounded-xl p-4 bg-gray-50">
            <Image
              src={product.thumbnail}
              alt={product.name}
              width={70}
              height={70}
              className="rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-gray-800">{product.name}</p>
              <p className="text-sm text-gray-500">Price: ${product.price}</p>
              <div className="flex  font-bold text-lg border-t mt-2 pt-2">
                <span>Total: </span>
                <span className="text-orange-600 ml-2">${totalPrice}</span>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="text-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 border rounded flex items-center justify-center"
                >
                  <Minus size={14} />
                </button>

                <span className="w-6 font-semibold">{quantity}</span>

                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 border rounded flex items-center justify-center"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="space-y-3">
            <input
              name="name"
              placeholder="Your Name"
              className="w-full border p-2 rounded-lg"
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              className="w-full border p-2 rounded-lg"
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Address"
              className="w-full border p-2 rounded-lg"
              onChange={handleChange}
            />
          </div>

          {/* DELIVERY */}
          <div className="border rounded-lg p-3 space-y-2">
            <p className="font-medium text-sm">Delivery Area</p>

            <label className="flex justify-between text-sm">
              <span>Inside Dhaka (৳60)</span>
              <input
                type="radio"
                checked={form.isInsideDhaka}
                onChange={() =>
                  setForm(prev => ({ ...prev, isInsideDhaka: true }))
                }
              />
            </label>

            <label className="flex justify-between text-sm">
              <span>Outside Dhaka (৳120)</span>
              <input
                type="radio"
                checked={!form.isInsideDhaka}
                onChange={() =>
                  setForm(prev => ({ ...prev, isInsideDhaka: false }))
                }
              />
            </label>
          </div>

          {/* TOTAL */}
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>${shippingFee}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t mt-2 pt-2">
              <span>Total</span>
              <span className="text-orange-600">${totalPrice}</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
              Cancel
            </button>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold"
            >
              {loading ? 'Processing...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;
