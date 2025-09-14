// src/components/tasks/TaskCard.tsx
import { Task } from '@/types';

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className={`px-2 py-1 text-xs rounded-full ${
          task.status === 'Completed' ? 'bg-green-200 text-green-800' :
          task.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
          'bg-gray-200 text-gray-800'
        }`}>
          {task.status}
        </span>
        <span className={`font-bold text-sm ${
          task.priority === 'High' ? 'text-red-500' :
          task.priority === 'Medium' ? 'text-yellow-500' :
          'text-green-500'
        }`}>
          {task.priority}
        </span>
      </div>
    </div>
  );
}
