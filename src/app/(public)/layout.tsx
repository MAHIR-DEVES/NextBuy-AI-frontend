import { PublicNavbar } from "@/components/layouts/public-navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
