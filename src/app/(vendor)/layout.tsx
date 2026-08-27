'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getUser } from '@/utils/auth';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'SELLER') {
      router.push(user.role === 'CUSTOMER' ? '/dashboard' : '/admin');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
