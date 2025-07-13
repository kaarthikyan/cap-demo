import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ProductsTable from '@/components/tables/Products';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'HridhyaTechBasic Table | Admin - HridhyaTechDashboard Template',
  description:
    'This is HridhyaTechBasic Table  page for Admin  Tailwind CSS Admin Dashboard Template',
  // other metadata
};

export default function Products() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Products" />
      <div className="space-y-6">
        <ComponentCard title="Products Table">
          <ProductsTable />
        </ComponentCard>
      </div>
    </div>
  );
}
