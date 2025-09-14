// src/app/(main)/dashboard/page.tsx
import Link from 'next/link';
import React from 'react';

const stats = [
  { title: 'Tasks Pending', value: 12, href: '/tasks' },
  { title: 'Shipments in Progress', value: 5, href: '/shipments' },
  { title: 'Complaints Open', value: 2, href: '/complaints' },
];

const navCards = [
  { title: 'Task Manager', href: '/tasks' },
  { title: 'Shipment Monitor', href: '/shipments' },
  { title: 'Complaint Manager', href: '/complaints' },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            href={stat.href}
            key={stat.title}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-700">{stat.title}</h2>
            <p className="text-4xl font-bold text-blue-500 mt-2">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {navCards.map((card) => (
          <Link
            href={card.href}
            key={card.title}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-32"
          >
            <h2 className="text-xl font-semibold text-gray-700">{card.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
