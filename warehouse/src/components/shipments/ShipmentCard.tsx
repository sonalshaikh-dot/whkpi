// src/components/shipments/ShipmentCard.tsx
import React from 'react';
import { Shipment } from '@/types';

interface ShipmentCardProps {
  shipment: Shipment;
  onEdit: (shipment: Shipment) => void;
  onDelete: (shipmentId: string) => void;
}

export default function ShipmentCard({ shipment, onEdit, onDelete }: ShipmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Arrived': return 'text-green-600 bg-green-100';
      case 'In Transit': return 'text-blue-600 bg-blue-100';
      case 'Cleared': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{shipment.source}</h3>
          <p className="text-sm text-gray-600">{shipment.invoice}</p>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(shipment)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(shipment.id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">BL No:</span>
          <span className="font-medium">{shipment.blNo}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">ETA:</span>
          <span className="font-medium">{shipment.eta}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">W/H ETA:</span>
          <span className="font-medium">{shipment.whEta}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Containers:</span>
          <span className="font-medium">{shipment.containers}</span>
        </div>
        
        <div className="text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Total Lines:</span>
            <span className="font-medium">{shipment.totalLines}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Total Cases:</span>
            <span className="font-medium">{shipment.totalCases}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Bulk/Dom:</span>
            <span className="font-medium">{shipment.bulkLines}/{shipment.domLines}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm pt-2">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(shipment.status)}`}>
            {shipment.status}
          </span>
        </div>
      </div>
    </div>
  );
}