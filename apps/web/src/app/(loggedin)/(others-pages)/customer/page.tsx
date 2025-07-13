'use client';
import React from 'react';
// Update the import path below if the actual location is different
import AddCustomerForm from '@/components/erm/AddCustomerForm';

const AddCustomerPage = () => {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Add New Customer</h1>
      <AddCustomerForm />
    </div>
  );
};

export default AddCustomerPage;
