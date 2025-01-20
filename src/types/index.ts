export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'online' | 'offline' | 'busy';
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId?: string;
  channelId?: string;
  createdAt: string;
  type: 'text' | 'file';
  parentId?: string;
}

export interface Channel {
  id: string;
  name: string;
  members: string[];
  type: 'group' | 'direct';
  createdAt: string;
}