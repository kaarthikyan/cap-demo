// ✅ This is a Server Component (NO "use client")
import React from 'react';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get('token')?.value;
  const user = token ? verifyToken(token) : null;

  if (user?.role !== 'admin') {
    redirect('/error-404');
  }

  return <>{children}</>;
}
