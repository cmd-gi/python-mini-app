import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Youtube,
  Instagram,
  Type,
  Maximize,
  Music,
  History,
  User,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <ImageIcon size={20} />, label: 'BG Remover', path: '/tools/bg-remover' },
    { icon: <Youtube size={20} />, label: 'YouTube Downloader', path: '/tools/youtube' },
    { icon: <Instagram size={20} />, label: 'Insta Downloader', path: '/tools/instagram' },
    { icon: <Type size={20} />, label: 'Caption Gen', path: '/tools/caption-gen' },
    { icon: <Type size={20} />, label: 'Image to Text', path: '/tools/ocr' },
    { icon: <Maximize size={20} />, label: 'Image Compressor', path: '/tools/compressor' },
    { icon: <Music size={20} />, label: 'Video to MP3', path: '/tools/video-to-mp3' },
    { icon: <History size={20} />, label: 'History', path: '/history' },
    { icon: <User size={20} />, label: 'Profile', path: '/profile' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700
        z-50 transition-transform duration-300 ease-in-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex items-center justify-between p-6">
          <NavLink to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CreatorTool
          </NavLink>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              className={({ isActive }) => `
                flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive
                  ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700/50 hover:text-primary'}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
