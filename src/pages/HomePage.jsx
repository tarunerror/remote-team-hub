import React from 'react';
import TaskBoard from '../components/Dashboard/TaskBoard';
import ChatWindow from '../components/Chat/ChatWindow';

const HomePage = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Welcome to your team workspace
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <TaskBoard />
        </div>
        <div className="h-[calc(100vh-16rem)] sm:h-[calc(100vh-18rem)] lg:h-auto">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default HomePage;