// src/app/(main)/layout.tsx
import Sidebar from '@/components/layout/Sidebar';
import React from 'react';
import { auth } from '@/lib/firebase';
import { redirect } from 'next/navigation';

// Very small server-side guard placeholder; for a production app you'd use
// cookies / session (e.g. NextAuth or Firebase Admin) rather than client SDK.
// For now we just always render; upgrade later.

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
