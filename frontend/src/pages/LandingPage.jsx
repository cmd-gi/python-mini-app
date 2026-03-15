import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    { title: "Background Remover", desc: "Remove backgrounds from any image instantly using AI.", icon: <Zap className="text-primary" /> },
    { title: "Video Downloader", desc: "Download high-quality videos from YouTube and Instagram.", icon: <Zap className="text-secondary" /> },
    { title: "AI Caption Gen", desc: "Generate engaging captions and hashtags for your posts.", icon: <Zap className="text-accent" /> },
    { title: "Image to Text", desc: "Extract text from images accurately with powerful OCR.", icon: <Zap className="text-primary" /> },
    { title: "Image Compressor", desc: "Reduce file size without losing quality.", icon: <Zap className="text-secondary" /> },
    { title: "Video to MP3", desc: "Convert any video to high-quality audio files.", icon: <Zap className="text-accent" /> },
  ];

  const faqs = [
    { q: "Is it free to use?", a: "Yes! You can use all our tools for free. Registered users get access to history and larger file limits." },
    { q: "Are my files private?", a: "Absolutely. Guest files are automatically deleted after 24 hours. We never share your data." },
    { q: "Do I need to create an account?", a: "No, you can start using tools immediately as a guest." }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-secondary/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-primary uppercase bg-primary/10 rounded-full">
              The All-in-One Creator Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
              All Creator Tools in <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">One Powerful Place</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Remove backgrounds, download videos, generate captions and extract text instantly.
              Everything you need to supercharge your creative workflow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard" className="btn-primary flex items-center gap-2 px-8 py-4 text-lg">
                Start Using Tools <ArrowRight size={20} />
              </Link>
              <a href="#features" className="px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
                Explore Features
              </a>
            </div>
          </motion.div>

          {/* Hero Preview Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="glass rounded-2xl p-2 border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-slate-800 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                 <div className="grid grid-cols-3 gap-4 p-8 w-full h-full opacity-50">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="bg-slate-700 rounded-lg animate-pulse"></div>
                    ))}
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl scale-110">
                       <Zap size={64} className="text-primary mb-4 mx-auto" />
                       <p className="text-2xl font-bold text-white">Interactive Dashboard Preview</p>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-gray-50/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Utilities</h2>
            <p className="text-gray-600 dark:text-gray-400">Everything you need to streamline your production.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-2xl hover:border-primary/50 transition-all cursor-default"
              >
                <div className="mb-4 p-3 bg-white dark:bg-slate-800 rounded-xl w-fit shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">1</div>
              <h4 className="text-xl font-bold mb-2">Upload or Paste</h4>
              <p className="text-gray-600 dark:text-gray-400">Upload your image/video or paste a URL to get started.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">2</div>
              <h4 className="text-xl font-bold mb-2">Process Instantly</h4>
              <p className="text-gray-600 dark:text-gray-400">Our AI-powered engine processes your request in seconds.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">3</div>
              <h4 className="text-xl font-bold mb-2">Download Result</h4>
              <p className="text-gray-600 dark:text-gray-400">Preview and download your high-quality result immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-gray-50/50 dark:bg-slate-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">FAQ</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl">
                <h5 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-secondary" /> {faq.q}
                </h5>
                <p className="text-gray-600 dark:text-gray-400 pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CreatorTool
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="text-sm text-gray-500">
            © 2024 Creator Toolkit. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
