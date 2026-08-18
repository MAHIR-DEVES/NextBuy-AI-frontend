import { notFound } from 'next/navigation';
import Image from 'next/image';

import OrderActions from '../OrderActions';
import { Order, OrderItem } from '@/types/orders';
import { FaWhatsapp } from 'react-icons/fa';
import { HistoryStat } from '../HistoryStat';

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const getOrderById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/orders/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  const result = await res.json();

  return result.data;
};

const orderHistory = async (phone: string) => {
  const url = `${BASE_URL}/orders/customer-history?phone=${encodeURIComponent(phone)}`;

  const res = await fetch(url, {
    cache: 'no-store',
  });
  const text = await res.text();

  if (!res.ok) {
    return null;
  }

  const result = JSON.parse(text);

  return result.data;
};

const OrderDetailsPage = async ({ params }: OrderDetailsPageProps) => {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }
  const history = await orderHistory(order.phone);

  const summary = history?.summary;

  const successRate =
    summary && summary.totalOrders > 0
      ? ((summary.totalDelivered / summary.totalOrders) * 100).toFixed(0)
      : '0';

  return (
    <main className=" space-y-6 p-4 md:p-6 print:p-0">
      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-sm text-muted-foreground">Order #{order.id}</p>
        </div>

        <OrderActions orderId={order.id} currentStatus={order.status} />
      </div>

      {/* Printable Content */}
      <div id="order-details-print">
        {/* Order Information */}
        <section className="rounded-md border bg-background p-5">
          <h2 className="mb-4 text-lg font-semibold">Order Information</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem label="Order ID" value={order.id} />

            <InfoItem label="Status" value={order.status} />

            <InfoItem
              label="Order Date"
              value={new Date(order.createdAt).toLocaleString()}
            />

            <InfoItem
              label="Shipping"
              value={order.isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka'}
            />
          </div>
        </section>
        {/* Customer Order Summary */}
        {history?.summary && (
          <section className="mt-6 rounded-md border bg-background p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Customer Order History
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <HistoryStat
                label="Total Orders"
                value={history.summary.totalOrders}
              />

              <HistoryStat
                label="Delivered"
                value={history.summary.totalDelivered}
              />

              <HistoryStat
                label="Cancelled"
                value={history.summary.totalCancelled}
              />

              <HistoryStat label="Success Rate" value={`${successRate}%`} />
            </div>
          </section>
        )}

        {/* Customer Information */}
        <section className="mt-6 rounded-md border bg-background p-5">
          <h2 className="mb-4 text-lg font-semibold">Customer Information</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem
              label="Name"
              value={order.name || order.user?.name || '-'}
            />

            <InfoItem label="Email" value={order.user?.email || '-'} />

            <div>
              <p className="text-xs font-medium text-muted-foreground">Phone</p>

              <a
                href={`https://wa.me/${order.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-green-600 transition-colors hover:text-green-700 hover:underline"
              >
                <FaWhatsapp className="h-5 w-5" />
                <span>{order.phone}</span>
              </a>
            </div>

            <InfoItem label="District (Zila)" value={order.district || '-'} />

            <InfoItem label="Thana / Upazila" value={order.thana || '-'} />

            <InfoItem label="Address" value={order.address || '-'} />
          </div>

          <div className="mt-5 border-t pt-4">
            <p className="text-sm font-medium">Order Notes</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {order.note || 'No notes provided'}
            </p>
          </div>
        </section>

        {/* Order Items */}
        <section className="mt-6 rounded-md border bg-background">
          <div className="border-b p-5">
            <h2 className="text-lg font-semibold">Order Items</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-5 py-3 text-left">Product</th>

                  <th className="px-5 py-3 text-left">Color</th>

                  <th className="px-5 py-3 text-left">Size</th>

                  <th className="px-5 py-3 text-center">Quantity</th>

                  <th className="px-5 py-3 text-right">Price</th>

                  <th className="px-5 py-3 text-right">Subtotal</th>

                  <th className="px-5 py-3 text-center">Current Stock</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {order.items?.map((item: OrderItem) => (
                  <tr key={item.id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {item.product?.thumbnail && (
                          <Image
                            src={item.product.thumbnail}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-md border object-cover"
                          />
                        )}

                        <div>
                          <p className="max-w-[300px] font-medium">
                            {item.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {item.product?.brand || '-'}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">{item.color || '-'}</td>

                    <td className="px-5 py-4">{item.size || '-'}</td>

                    <td className="px-5 py-4 text-center">{item.quantity}</td>

                    <td className="px-5 py-4 text-right">
                      ৳{Number(item.price).toFixed(2)}
                    </td>

                    <td className="px-5 py-4 text-right font-medium">
                      ৳{(Number(item.price) * item.quantity).toFixed(2)}
                    </td>

                    <td className="px-5 py-4 text-center">
                      {item.product?.stock ?? '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment & Shipping */}
        <section className="mt-6 rounded-md border bg-background p-5">
          <h2 className="mb-5 text-lg font-semibold">
            Payment & Shipping Summary
          </h2>

          <div className="ml-auto max-w-md space-y-3">
            <SummaryRow
              label="Subtotal"
              value={`৳${getSubtotal(order).toFixed(2)}`}
            />

            <SummaryRow
              label="Shipping"
              value={`${
                order.isInsideDhaka ? 'ঢাকার ভেতরে' : 'ঢাকার বাইরে'
              } (৳${Number(order.shippingFee).toFixed(2)})`}
            />

            <div className="border-t pt-3">
              <SummaryRow
                label="Total"
                value={`৳${Number(order.total).toFixed(2)}`}
                bold
              />
            </div>

            <SummaryRow label="Payment Method" value="Cash on Delivery" />
          </div>
        </section>
      </div>
    </main>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs font-medium text-muted-foreground">{label}</p>

    <p className="mt-1 break-words text-sm font-medium">{value}</p>
  </div>
);

const SummaryRow = ({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <div
    className={`flex items-center justify-between gap-4 ${
      bold ? 'text-base font-bold' : 'text-sm'
    }`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const getSubtotal = (order: Order): number => {
  return order.items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );
};

export default OrderDetailsPage;
