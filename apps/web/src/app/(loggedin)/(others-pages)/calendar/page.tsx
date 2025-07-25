import Calendar from '@/components/calendar/Calendar';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'HridhyaTechCalender | Admin - HridhyaTechDashboard Template',
  description: 'This is HridhyaTechCalender page for Admin  Tailwind CSS Admin Dashboard Template',
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Calendar" />
      <Calendar />
    </div>
  );
}
