import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ImageIcon,
  Youtube,
  Instagram,
  Type,
  Maximize,
  Music,
  ArrowUpRight
} from 'lucide-react';

const Dashboard = () => {
  const tools = [
    {
      title: "Background Remover",
      desc: "Instant background removal with AI precision.",
      icon: <ImageIcon size={32} />,
      path: "/tools/bg-remover",
      color: "bg-blue-500",
      delay: 0.1
    },
    {
      title: "YouTube Downloader",
      desc: "Save your favorite videos in up to 1080p.",
      icon: <Youtube size={32} />,
      path: "/tools/youtube",
      color: "bg-red-500",
      delay: 0.2
    },
    {
      title: "Instagram Downloader",
      desc: "Download Reels and posts instantly.",
      icon: <Instagram size={32} />,
      path: "/tools/instagram",
      color: "bg-pink-500",
      delay: 0.3
    },
    {
      title: "AI Caption Generator",
      desc: "Viral captions and hashtags for every post.",
      icon: <Type size={32} />,
      path: "/tools/caption-gen",
      color: "bg-purple-500",
      delay: 0.4
    },
    {
      title: "Image to Text (OCR)",
      desc: "Convert images to editable text effortlessly.",
      icon: <Type size={32} />,
      path: "/tools/ocr",
      color: "bg-amber-500",
      delay: 0.5
    },
    {
      title: "Image Compressor",
      desc: "Optimize images for web without quality loss.",
      icon: <Maximize size={32} />,
      path: "/tools/compressor",
      color: "bg-emerald-500",
      delay: 0.6
    },
    {
      title: "Video to MP3",
      desc: "Extract high-quality audio from any video.",
      icon: <Music size={32} />,
      path: "/tools/video-to-mp3",
      color: "bg-indigo-500",
      delay: 0.7
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome back!</h2>
        <p className="text-gray-600 dark:text-gray-400">What would you like to create today?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: tool.delay }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group"
          >
            <Link to={tool.path} className="block glass p-6 rounded-3xl h-full transition-all group-hover:border-primary/50 group-hover:shadow-2xl">
              <div className={`${tool.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
                {tool.icon}
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{tool.title}</h3>
                <ArrowUpRight className="text-gray-400 group-hover:text-primary transition-colors" size={20} />
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {tool.desc}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
