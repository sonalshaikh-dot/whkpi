// src/app/(main)/shipments/page.tsx
'use client';

import ShipmentList from '@/components/shipments/ShipmentList';
import ShipmentModal from '@/components/shipments/ShipmentModal';
import React, { useState } from 'react';

export default function ShipmentsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-6">Shipment Monitoring</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Shipment
        </button>
      </div>
      
      <ShipmentList />
      
      <ShipmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        shipment={null}
        onSave={() => {
          // Refresh is handled by real-time listener in ShipmentList
        }}
      />
    </div>
  );
}
