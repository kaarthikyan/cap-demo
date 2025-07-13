import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ManageUsersTable from '@/components/tables/ManageUsers';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'HridhyaTechBasic Table | Admin - HridhyaTechDashboard Template',
  description:
    'This is HridhyaTechBasic Table  page for Admin  Tailwind CSS Admin Dashboard Template',
  // other metadata
};

export default function ManageUsers() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Manage Users" />
      <div className="space-y-6">
        <ComponentCard title="Users Table">
          <ManageUsersTable />
        </ComponentCard>
      </div>
    </div>
  );
}
