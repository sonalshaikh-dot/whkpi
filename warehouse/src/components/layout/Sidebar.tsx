// src/components/layout/Sidebar.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/tasks', label: 'Task Manager' },
  { href: '/shipments', label: 'Shipment Monitoring' },
  { href: '/complaints', label: 'Complaint Manager' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white text-gray-800 p-4">
      <div className="text-2xl font-bold mb-8">WH-KPI</div>
      <nav>
        <ul>
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block p-2 rounded-lg transition-colors ${
                    active ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
