// src/app/(main)/complaints/page.tsx
'use client';

import ComplaintList from '@/components/complaints/ComplaintList';
import ComplaintModal from '@/components/complaints/ComplaintModal';
import React, { useState } from 'react';

export default function ComplaintsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-6">Complaint Manager</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Complaint
        </button>
      </div>
      
      <ComplaintList />
      
      <ComplaintModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        complaint={null}
        onSave={() => {
          // Refresh is handled by real-time listener in ComplaintList
        }}
      />
    </div>
  );
}
