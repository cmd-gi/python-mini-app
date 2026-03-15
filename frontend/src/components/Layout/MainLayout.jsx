import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`
        flex flex-col min-h-screen transition-all duration-300
        lg:ml-64
      `}>
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 mt-16 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>

        <footer className="py-6 px-8 border-t border-gray-200 dark:border-slate-800 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Creator Toolkit. Built for modern creators.
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
