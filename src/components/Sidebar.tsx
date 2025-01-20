import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Video,
  FileText,
  BarChart,
  X,
  User,
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
    <div className="bg-theme-foreground glass h-full shadow-lg perspective-container w-[280px]">
      <div className="h-full flex flex-col card-3d">
        <div className="flex items-center justify-between p-3 sm:p-4 lg:hidden border-b border-white/10">
          <span className="font-semibold text-theme">Menu</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-theme" />
          </button>
        </div>
        <div className="flex-1 flex flex-col pt-4 sm:pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-3 sm:px-4">
            <div className="animate-float">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="ml-2 text-lg font-semibold text-theme glow-text">
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
                  `group flex items-center px-2 py-1.5 sm:py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-secondary text-white glow'
                      : 'text-theme hover:bg-white/10'
                  }`
                }
              >
                <item.icon className={`mr-3 h-5 w-5 ${
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