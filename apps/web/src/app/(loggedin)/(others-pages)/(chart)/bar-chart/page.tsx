import BarChartOne from '@/components/charts/bar/BarChartOne';
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'HridhyaTech Bar Chart | HridhyaTech Dashboard',
  description: 'This is HridhyaTech Bar Chart page for HridhyaTech Dashboard',
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div className="space-y-6">
        <ComponentCard title="Bar Chart 1">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
