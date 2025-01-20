import React from 'react';
import { Clock, User } from 'lucide-react';

const TaskCard = ({ task }) => {
  const mockTask = {
    title: 'Implement Authentication',
    priority: 'high',
    assignee: 'John Doe',
    dueDate: '2024-03-20',
  };

  const { title, priority, assignee, dueDate } = task || mockTask;

  return (
    <div className="perspective-container">
      <div className="card-3d bg-white border rounded-lg p-4 shadow-sm transform transition-all duration-300">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <span
            className={`px-2 py-1 text-xs rounded-full animate-glow ${
              priority === 'high'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {priority}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1 animate-pulse" />
          <span>{dueDate}</span>
        </div>
        <div className="mt-2 flex items-center">
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center animate-float">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="ml-2 text-sm text-gray-600">{assignee}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;