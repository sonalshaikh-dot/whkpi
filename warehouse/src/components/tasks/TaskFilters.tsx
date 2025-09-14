// src/components/tasks/TaskFilters.tsx
'use client';

import React from 'react';

interface TaskFiltersProps {
  filters: {
    status: string;
    priority: string;
    assignedTo: string;
    search: string;
  };
  onFiltersChange: (filters: {
    status: string;
    priority: string;
    assignedTo: string;
    search: string;
  }) => void;
  assignedUsers: string[];
}

export default function TaskFilters({ filters, onFiltersChange, assignedUsers }: TaskFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned To
          </label>
          <select
            value={filters.assignedTo}
            onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Users</option>
            {assignedUsers.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}