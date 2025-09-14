// src/components/complaints/ComplaintList.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Complaint } from '@/types';
import ComplaintCard from './ComplaintCard';
import ComplaintModal from './ComplaintModal';
import ComplaintFilters from './ComplaintFilters';

export default function ComplaintList() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [view, setView] = useState('list'); // 'list' or 'card'
  const [showModal, setShowModal] = useState(false);
  const [editingComplaint, setEditingComplaint] = useState<Complaint | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    search: '',
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'complaints'), (snapshot) => {
      const complaintsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Complaint));
      setComplaints(complaintsData);
    });
    return () => unsubscribe();
  }, []);

  // Filter complaints based on current filters
  const filteredComplaints = useMemo(() => {
    return complaints.filter(complaint => {
      const matchesStatus = !filters.status || complaint.status === filters.status;
      const matchesSearch = !filters.search || 
        complaint.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        complaint.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        complaint.reportedBy.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }, [complaints, filters]);

  const handleEdit = (complaint: Complaint) => {
    setEditingComplaint(complaint);
    setShowModal(true);
  };

  const handleDelete = async (complaintId: string) => {
    if (confirm('Are you sure you want to delete this complaint?')) {
      try {
        await deleteDoc(doc(db, 'complaints', complaintId));
      } catch (error) {
        console.error('Error deleting complaint:', error);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingComplaint(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Open': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div>
      <ComplaintFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Showing {filteredComplaints.length} of {complaints.length} complaints
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setView('list')} 
            className={`px-3 py-1 rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            List
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
          {filteredComplaints.map(complaint => (
            <ComplaintCard 
              key={complaint.id} 
              complaint={complaint} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComplaints.map(complaint => (
                <tr key={complaint.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{complaint.title}</div>
                    <div className="text-sm text-gray-500">{complaint.description}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{complaint.reportedBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{complaint.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => handleEdit(complaint)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(complaint.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredComplaints.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No complaints found matching your filters.
            </div>
          )}
        </div>
      )}

      <ComplaintModal
        isOpen={showModal}
        onClose={handleModalClose}
        complaint={editingComplaint}
        onSave={() => {
          // Refresh handled by onSnapshot
        }}
      />
    </div>
  );
}