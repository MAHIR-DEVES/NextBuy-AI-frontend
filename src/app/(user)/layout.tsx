import { UserNavbar } from "@/components/layouts/user-navbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <UserNavbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
