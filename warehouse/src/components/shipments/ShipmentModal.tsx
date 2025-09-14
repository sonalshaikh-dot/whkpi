// src/components/shipments/ShipmentModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Shipment } from '@/types';

interface ShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment?: Shipment | null;
  onSave: () => void;
}

export default function ShipmentModal({ isOpen, onClose, shipment, onSave }: ShipmentModalProps) {
  const [formData, setFormData] = useState({
    source: '',
    invoice: '',
    blNo: '',
    eta: '',
    whEta: '',
    containers: '',
    totalLines: 0,
    totalCases: 0,
    bulkLines: 0,
    domLines: 0,
    status: 'In Transit' as 'In Transit' | 'Arrived' | 'Cleared',
  });

  useEffect(() => {
    if (shipment) {
      setFormData({
        source: shipment.source,
        invoice: shipment.invoice,
        blNo: shipment.blNo,
        eta: shipment.eta,
        whEta: shipment.whEta,
        containers: shipment.containers,
        totalLines: shipment.totalLines,
        totalCases: shipment.totalCases,
        bulkLines: shipment.bulkLines,
        domLines: shipment.domLines,
        status: shipment.status,
      });
    } else {
      setFormData({
        source: '',
        invoice: '',
        blNo: '',
        eta: '',
        whEta: '',
        containers: '',
        totalLines: 0,
        totalCases: 0,
        bulkLines: 0,
        domLines: 0,
        status: 'In Transit',
      });
    }
  }, [shipment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (shipment) {
        // Update existing shipment
        const shipmentRef = doc(db, 'shipments', shipment.id);
        await updateDoc(shipmentRef, formData);
      } else {
        // Add new shipment
        await addDoc(collection(db, 'shipments'), formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving shipment:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{shipment ? 'Edit Shipment' : 'Add New Shipment'}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source *
              </label>
              <input
                type="text"
                required
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice *
              </label>
              <input
                type="text"
                required
                value={formData.invoice}
                onChange={(e) => setFormData({ ...formData, invoice: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BL No *
              </label>
              <input
                type="text"
                required
                value={formData.blNo}
                onChange={(e) => setFormData({ ...formData, blNo: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Shipment['status'] })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="In Transit">In Transit</option>
                <option value="Arrived">Arrived</option>
                <option value="Cleared">Cleared</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ETA
              </label>
              <input
                type="date"
                value={formData.eta}
                onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                W/H ETA
              </label>
              <input
                type="date"
                value={formData.whEta}
                onChange={(e) => setFormData({ ...formData, whEta: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Containers × Size
              </label>
              <input
                type="text"
                placeholder="e.g., 2 × 40ft"
                value={formData.containers}
                onChange={(e) => setFormData({ ...formData, containers: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Lines
              </label>
              <input
                type="number"
                min="0"
                value={formData.totalLines}
                onChange={(e) => setFormData({ ...formData, totalLines: parseInt(e.target.value) || 0 })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Cases
              </label>
              <input
                type="number"
                min="0"
                value={formData.totalCases}
                onChange={(e) => setFormData({ ...formData, totalCases: parseInt(e.target.value) || 0 })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bulk Lines
              </label>
              <input
                type="number"
                min="0"
                value={formData.bulkLines}
                onChange={(e) => setFormData({ ...formData, bulkLines: parseInt(e.target.value) || 0 })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dom Lines
              </label>
              <input
                type="number"
                min="0"
                value={formData.domLines}
                onChange={(e) => setFormData({ ...formData, domLines: parseInt(e.target.value) || 0 })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {shipment ? 'Update Shipment' : 'Create Shipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}