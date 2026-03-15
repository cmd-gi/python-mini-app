import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import BackgroundRemover from './pages/tools/BackgroundRemover';
import ImageCompressor from './pages/tools/ImageCompressor';
import ImageOCR from './pages/tools/ImageOCR';
import VideoDownloader from './pages/tools/VideoDownloader';
import VideoToMp3 from './pages/tools/VideoToMp3';
import CaptionGenerator from './pages/tools/CaptionGenerator';
import History from './pages/History';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tools/bg-remover" element={<BackgroundRemover />} />
          <Route path="/tools/compressor" element={<ImageCompressor />} />
          <Route path="/tools/ocr" element={<ImageOCR />} />
          <Route path="/tools/youtube" element={<VideoDownloader platform="youtube" />} />
          <Route path="/tools/instagram" element={<VideoDownloader platform="instagram" />} />
          <Route path="/tools/video-to-mp3" element={<VideoToMp3 />} />
          <Route path="/tools/caption-gen" element={<CaptionGenerator />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<AuthPage type="login" />} />
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/signup" element={<AuthPage type="signup" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
