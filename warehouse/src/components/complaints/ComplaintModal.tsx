// src/components/complaints/ComplaintModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Complaint } from '@/types';

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaint?: Complaint | null;
  onSave: () => void;
}

export default function ComplaintModal({ isOpen, onClose, complaint, onSave }: ComplaintModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reportedBy: '',
    date: '',
    status: 'Open' as 'Open' | 'In Progress' | 'Resolved',
  });

  useEffect(() => {
    if (complaint) {
      setFormData({
        title: complaint.title,
        description: complaint.description,
        reportedBy: complaint.reportedBy,
        date: complaint.date,
        status: complaint.status,
      });
    } else {
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        title: '',
        description: '',
        reportedBy: '',
        date: today,
        status: 'Open',
      });
    }
  }, [complaint]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (complaint) {
        // Update existing complaint
        const complaintRef = doc(db, 'complaints', complaint.id);
        await updateDoc(complaintRef, formData);
      } else {
        // Add new complaint
        await addDoc(collection(db, 'complaints'), formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving complaint:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{complaint ? 'Edit Complaint' : 'Add New Complaint'}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reported By *
              </label>
              <input
                type="text"
                required
                value={formData.reportedBy}
                onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Complaint['status'] })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
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
              {complaint ? 'Update Complaint' : 'Create Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}