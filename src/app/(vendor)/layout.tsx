import { VendorNavbar } from '@/components/layouts/vendor/vendor-navbar';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <VendorNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
