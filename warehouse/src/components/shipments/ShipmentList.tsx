// src/components/shipments/ShipmentList.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Shipment } from '@/types';
import ShipmentCard from './ShipmentCard';
import ShipmentModal from './ShipmentModal';
import ShipmentFilters from './ShipmentFilters';

export default function ShipmentList() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [view, setView] = useState('table'); // 'table' or 'card'
  const [showModal, setShowModal] = useState(false);
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);
  const [filters, setFilters] = useState({
    source: '',
    status: '',
    dateRange: '',
    search: '',
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'shipments'), (snapshot) => {
      const shipmentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Shipment));
      setShipments(shipmentsData);
    });
    return () => unsubscribe();
  }, []);

  // Get unique sources for filter dropdown
  const sources = useMemo(() => {
    const sourcesList = shipments.map(shipment => shipment.source).filter(Boolean);
    return [...new Set(sourcesList)].sort();
  }, [shipments]);

  // Filter shipments based on current filters
  const filteredShipments = useMemo(() => {
    return shipments.filter(shipment => {
      const matchesSource = !filters.source || shipment.source === filters.source;
      const matchesStatus = !filters.status || shipment.status === filters.status;
      const matchesSearch = !filters.search || 
        shipment.invoice.toLowerCase().includes(filters.search.toLowerCase()) ||
        shipment.blNo.toLowerCase().includes(filters.search.toLowerCase()) ||
        shipment.source.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesSource && matchesStatus && matchesSearch;
    });
  }, [shipments, filters]);

  const handleEdit = (shipment: Shipment) => {
    setEditingShipment(shipment);
    setShowModal(true);
  };

  const handleDelete = async (shipmentId: string) => {
    if (confirm('Are you sure you want to delete this shipment?')) {
      try {
        await deleteDoc(doc(db, 'shipments', shipmentId));
      } catch (error) {
        console.error('Error deleting shipment:', error);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingShipment(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Arrived': return 'text-green-600 bg-green-100';
      case 'In Transit': return 'text-blue-600 bg-blue-100';
      case 'Cleared': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div>
      <ShipmentFilters 
        filters={filters}
        onFiltersChange={setFilters}
        sources={sources}
      />

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Showing {filteredShipments.length} of {shipments.length} shipments
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setView('table')} 
            className={`px-3 py-1 rounded ${view === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Table
          </button>
          <button 
            onClick={() => setView('card')} 
            className={`px-3 py-1 rounded ${view === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Card
          </button>
        </div>
      </div>

      {view === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredShipments.map(shipment => (
            <ShipmentCard 
              key={shipment.id} 
              shipment={shipment} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BL No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">W/H ETA</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Containers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lines/Cases</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShipments.map(shipment => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{shipment.source}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{shipment.invoice}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{shipment.blNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{shipment.eta}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{shipment.whEta}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{shipment.containers}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="text-xs">
                        <div>Total: {shipment.totalLines} lines, {shipment.totalCases} cases</div>
                        <div>Bulk: {shipment.bulkLines} | Dom: {shipment.domLines}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleEdit(shipment)}
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(shipment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredShipments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No shipments found matching your filters.
              </div>
            )}
          </div>
        </div>
      )}

      <ShipmentModal
        isOpen={showModal}
        onClose={handleModalClose}
        shipment={editingShipment}
        onSave={() => {
          // Refresh handled by onSnapshot
        }}
      />
    </div>
  );
}