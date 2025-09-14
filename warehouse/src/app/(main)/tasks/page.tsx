// src/app/(main)/tasks/page.tsx
'use client';

import TaskList from '@/components/tasks/TaskList';
import TaskModal from '@/components/tasks/TaskModal';
import React, { useState } from 'react';

export default function TasksPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      
      <TaskList />
      
      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        task={null}
        onSave={() => {
          // Refresh is handled by real-time listener in TaskList
        }}
      />
    </div>
  );
}
