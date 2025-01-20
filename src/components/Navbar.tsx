import React from 'react';
import { useSelector } from 'react-redux';
import { Bell, Settings, User, Menu } from 'lucide-react';
import { RootState } from '../store';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="bg-white shadow-lg animate-gradient sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-white lg:hidden hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <div className="flex items-center ml-2 sm:ml-4 lg:ml-0">
              <div className="animate-float">
                <img
                  src="/logo.svg"
                  alt="Remote Team Hub"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
              </div>
              <h1 className="ml-2 text-lg sm:text-xl font-semibold text-white text-3d hidden sm:block">
                Remote Team Hub
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            <button
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-white animate-pulse" />
            </button>
            <button
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-white animate-spin-slow" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-white hidden sm:block">
                {user?.name}
              </span>
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/20 flex items-center justify-center animate-float">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;