import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import VideosExample from '@/components/ui/video/VideosExample';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'HridhyaTechVideos | Admin - HridhyaTechDashboard Template',
  description:
    'This is HridhyaTechVideos page for Admin - HridhyaTechTailwind CSS Admin Dashboard Template',
};

export default function VideoPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Videos" />

      <VideosExample />
    </div>
  );
}
