import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Clock, AlertCircle } from 'lucide-react';

const mockTasks = [
  {
    id: '1',
    title: 'Implement Authentication',
    status: 'todo',
    priority: 'high',
    assignee: 'John Doe',
    dueDate: '2024-03-20',
  },
  {
    id: '2',
    title: 'Design Dashboard UI',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Jane Smith',
    dueDate: '2024-03-18',
  },
];

const Dashboard = () => {
  const columns = ['Todo', 'In Progress', 'Done'];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Track your team's progress and manage tasks
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {columns.map((column) => (
          <div
            key={column}
            className="bg-white rounded-lg shadow-sm sm:shadow p-3 sm:p-4"
          >
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4">{column}</h3>
            <div className="space-y-2 sm:space-y-3">
              {mockTasks
                .filter(
                  (task) =>
                    task.status === column.toLowerCase().replace(' ', '-')
                )
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border rounded-lg p-2.5 sm:p-3 shadow-sm hover:shadow transition-shadow duration-200"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-1.5 sm:gap-2 mb-2">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base flex-grow">
                        {task.title}
                      </h4>
                      <span
                        className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full ${
                          task.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{task.dueDate}</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs sm:text-sm">{task.assignee[0]}</span>
                      </div>
                      <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-600 truncate">
                        {task.assignee}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;