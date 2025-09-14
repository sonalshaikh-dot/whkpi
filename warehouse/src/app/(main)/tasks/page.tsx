// src/app/(main)/tasks/page.tsx
import TaskList from '@/components/tasks/TaskList';
import React from 'react';

export default function TasksPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Add Task
        </button>
      </div>
      <TaskList />
    </div>
  );
}
