interface OrderSummaryProps {
  totalOrders: number;
  totalPending: number;
  totalShipped: number;
  totalDelivered: number;
  totalCancelled: number;
  totalPartial: number;
}

const OrderSummary = ({
  totalOrders,
  totalPending,
  totalShipped,
  totalDelivered,
  totalCancelled,
  totalPartial,
}: OrderSummaryProps) => {
  const items = [
    { label: 'Total Orders', value: totalOrders },
    { label: 'Pending', value: totalPending },
    { label: 'Shipped', value: totalShipped },
    { label: 'Delivered', value: totalDelivered },
    { label: 'Cancelled', value: totalCancelled },
    { label: 'Partial', value: totalPartial },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map(item => (
        <div key={item.label} className="rounded-md border bg-background p-4">
          <p className="text-sm text-muted-foreground">{item.label}</p>

          <p className="mt-2 text-2xl font-bold">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderSummary;
