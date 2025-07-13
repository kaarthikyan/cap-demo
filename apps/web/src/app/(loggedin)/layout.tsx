// ✅ This is a Server Component (NO "use client")
import React from 'react';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SharedLayout from './SharedLayout';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get('token')?.value;
  const user = token ? verifyToken(token) : null;
  let isAdmin = false;

  if (user) {
    if (user.role === 'admin') {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
  } else {
    redirect('/signin');
  }

  return <SharedLayout isAdmin={isAdmin}>{children}</SharedLayout>;
}
