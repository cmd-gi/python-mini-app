import React from 'react';
import { Menu, User, Bell } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 z-30 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 lg:block hidden">
          Creator Toolkit
        </h1>
      </div>

      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400 relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
          <div className="h-full w-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
