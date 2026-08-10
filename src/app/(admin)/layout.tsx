'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/utils/auth';
import AdminSidebar from '@/components/layouts/admin/shared/AdminSidebar';
import AdminHeader from '@/components/layouts/admin/shared/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="flex h-screen overflow-x-auto overflow-y-hidden">
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}
      {/* Sidebar */}
      <AdminSidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Navbar */}
        <AdminHeader toggleSidebar={toggleSidebar} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-auto">{children}</div>
      </div>
    </div>
  );
}
