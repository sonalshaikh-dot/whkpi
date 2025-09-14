// src/components/complaints/ComplaintCard.tsx
import React from 'react';
import { Complaint } from '@/types';

interface ComplaintCardProps {
  complaint: Complaint;
  onEdit: (complaint: Complaint) => void;
  onDelete: (complaintId: string) => void;
}

export default function ComplaintCard({ complaint, onEdit, onDelete }: ComplaintCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Open': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(complaint)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(complaint.id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm">{complaint.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Reported by:</span>
          <span className="font-medium">{complaint.reportedBy}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Date:</span>
          <span className="font-medium">{complaint.date}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm pt-2">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
            {complaint.status}
          </span>
        </div>
      </div>
    </div>
  );
}