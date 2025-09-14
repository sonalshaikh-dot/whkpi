// src/types.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  startDate: string;
  dueDate: string;
  completionDate?: string;
  progress: number;
  remarks?: string;
  attachments?: string[];
}

export interface Shipment {
  id: string;
  source: string;
  invoice: string;
  blNo: string;
  eta: string;
  whEta: string;
  containers: string;
  totalLines: number;
  totalCases: number;
  bulkLines: number;
  domLines: number;
  status: 'In Transit' | 'Arrived' | 'Cleared';
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  reportedBy: string;
  date: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  attachments?: string[];
}
