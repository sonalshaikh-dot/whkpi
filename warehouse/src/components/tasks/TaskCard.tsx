// src/components/tasks/TaskCard.tsx
import React from 'react';
import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Not Started': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm">{task.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Assigned to:</span>
          <span className="font-medium">{task.assignedTo}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Due Date:</span>
          <span className="font-medium">{task.dueDate}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Priority:</span>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)} mr-2`}></div>
            <span className="font-medium">{task.priority}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Progress:</span>
          <span className="font-medium">{task.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${task.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
