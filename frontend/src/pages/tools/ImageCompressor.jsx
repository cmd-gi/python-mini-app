import React, { useState } from 'react';
import FileUploader from '../../components/Tools/FileUploader';
import { compressImage } from '../../services/api';
import { Download, Loader2, Maximize } from 'lucide-react';

const ImageCompressor = () => {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(70);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await compressImage(file, quality);
      setResult(data);
    } catch (err) {
      setError('Failed to compress image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Image Compressor</h2>
        <p className="text-gray-600 dark:text-gray-400">Optimize your images by reducing file size without losing much quality.</p>
      </div>

      <div className="glass p-8 rounded-3xl">
        <FileUploader
          onFileSelect={setFile}
          selectedFile={file}
          accept={{'image/*': ['.png', '.jpg', '.jpeg', '.webp']}}
        />

        {file && !result && (
          <div className="mt-8 space-y-6">
            <div className="max-w-xs mx-auto space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                Compression Quality: <span className="text-primary font-bold">{quality}%</span>
              </label>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Small Size</span>
                <span>High Quality</span>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleProcess}
                disabled={loading}
                className="btn-primary flex items-center gap-2 min-w-[200px] justify-center"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Compress Image'}
              </button>
            </div>
          </div>
        )}

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>

      {result && (
        <div className="glass p-8 rounded-3xl animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
             <div>
               <h3 className="text-xl font-bold">Optimization Summary</h3>
               <p className="text-gray-500 text-sm">Reduced by {((1 - result.compressed_size / result.original_size) * 100).toFixed(1)}%</p>
             </div>
             <div className="flex gap-4">
                <div className="text-center px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-xl">
                  <p className="text-xs text-gray-500">Original</p>
                  <p className="font-bold">{formatSize(result.original_size)}</p>
                </div>
                <div className="text-center px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
                  <p className="text-xs text-primary">Compressed</p>
                  <p className="font-bold text-primary">{formatSize(result.compressed_size)}</p>
                </div>
             </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 border dark:border-slate-700">
            <img src={result.result} alt="Compressed" className="w-full h-auto max-h-[500px] object-contain mx-auto" />
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => {setFile(null); setResult(null);}}
              className="px-6 py-2 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              Upload New
            </button>
            <a
              href={result.result}
              download={result.filename}
              className="btn-primary flex items-center gap-2"
            >
              <Download size={18} /> Download Optimized Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
