'use client';
import AdminHeader from '@/components/layouts/admin/AdminHeader';
import UserSidebar from '@/components/layouts/user/UserSidebar';
import { getUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserLayout({
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
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}
      {/* Sidebar */}
      <UserSidebar isOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <AdminHeader toggleSidebar={toggleSidebar} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 ">{children}</div>
      </div>
    </div>
  );
}
