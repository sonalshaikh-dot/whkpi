// src/components/tasks/TaskList.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Task } from '@/types';
import TaskCard from './TaskCard';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState('list'); // 'list' or 'card'

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => setView('list')} className={`mr-2 px-3 py-1 rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>List</button>
        <button onClick={() => setView('card')} className={`px-3 py-1 rounded ${view === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Card</button>
      </div>
      {view === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Assigned To</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Priority</th>
                <th className="p-4 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{task.title}</td>
                  <td className="p-4">{task.assignedTo}</td>
                  <td className="p-4">{task.status}</td>
                  <td className="p-4">{task.priority}</td>
                  <td className="p-4">{task.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
