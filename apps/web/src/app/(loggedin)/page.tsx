import type { Metadata } from 'next';
import { ERMMetrics } from '@/components/erm/ERMMetrics';
import React from 'react';
import MonthlyTarget from '@/components/erm/MonthlyTarget';
import MonthlySalesChart from '@/components/erm/MonthlySalesChart';
import StatisticsChart from '@/components/erm/StatisticsChart';
import RecentOrders from '@/components/erm/RecentOrders';
// import DemographicCard from "@/components/erm/DemographicCard";

export const metadata: Metadata = {
  title: 'HridhyaTech ERP Dashboard | HridhyaTech Dashboard',
  description: 'This is HridhyaTech Home for HridhyaTech Dashboard',
};

export default async function ERM() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <ERMMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      {/* <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div> */}

      <div className="col-span-12">
        <RecentOrders />
      </div>
    </div>
  );
}
