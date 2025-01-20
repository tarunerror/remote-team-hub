import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Video,
  FileText,
  BarChart,
  X,
} from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
    { icon: Video, label: 'Video Calls', path: '/video' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: BarChart, label: 'Analytics', path: '/analytics' },
  ];

  return (
    <div className="bg-white h-full shadow-lg perspective-container w-[280px]">
      <div className="h-full flex flex-col card-3d">
        <div className="flex items-center justify-between p-3 sm:p-4 lg:hidden border-b">
          <span className="font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 flex flex-col pt-4 sm:pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-3 sm:px-4">
            <div className="animate-float">
              <img
                className="h-6 w-6 sm:h-8 sm:w-8"
                src="/logo.svg"
                alt="Remote Team Hub"
              />
            </div>
            <span className="ml-2 text-base sm:text-lg font-semibold text-gray-900 text-3d">
              Team Hub
            </span>
          </div>
          <nav className="mt-4 sm:mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-1.5 sm:py-2 text-sm font-medium rounded-md transition-all duration-300 card-3d ${
                    isActive
                      ? 'animate-gradient text-white animate-glow'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className={`mr-3 h-4 w-4 sm:h-5 sm:w-5 ${
                  location.pathname === item.path ? 'animate-float' : ''
                }`} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;