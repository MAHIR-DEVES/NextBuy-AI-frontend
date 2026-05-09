'use client';

import { useEffect, useState } from 'react';
import { getAllOrders } from '@/services/orders.service';
import { Order } from '@/types/order.type';
import Image from 'next/image';
import { User2Icon } from 'lucide-react';

const Page = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllOrders();
        setOrders(res?.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* LOADING SPINNER */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Profile</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-t">
                  {/* profile */}
                  <td className="p-3">
                    {order?.user?.avatar ? (
                      <Image
                        src={order.user.avatar}
                        alt={order.user.name || 'user'}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <User2Icon className="w-10 h-10 text-gray-500" />
                    )}
                  </td>
                  {/* CUSTOMER */}
                  <td className="p-3">
                    <div className="font-medium">{order.user?.name}</div>
                    <div className="text-xs text-gray-500">
                      {order.user?.email}
                    </div>
                  </td>

                  {/* PHONE */}
                  <td className="p-3">{order.phone}</td>

                  {/* ITEMS */}
                  <td className="p-3">
                    {order.items.map(item => (
                      <div key={item.id} className="text-xs">
                        {item.name} × {item.quantity}
                      </div>
                    ))}
                  </td>

                  {/* TOTAL */}
                  <td className="p-3 font-semibold text-orange-600">
                    ${order.total}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-700'
                          : order.status === 'DELIVERED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="p-3 text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
