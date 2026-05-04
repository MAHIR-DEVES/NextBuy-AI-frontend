import { AdminNavbar } from "@/components/layouts/admin-navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminNavbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
