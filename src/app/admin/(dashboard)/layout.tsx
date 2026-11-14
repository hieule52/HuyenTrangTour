import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import '@/app/globals.css';

export const metadata = {
  title: 'Huyền Trang Tour - Admin Dashboard',
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/admin/login');
  }

  return <AdminShell user={session.user}>{children}</AdminShell>;
}

