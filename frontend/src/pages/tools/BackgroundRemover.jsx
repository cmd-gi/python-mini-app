import React, { useState } from 'react';
import FileUploader from '../../components/Tools/FileUploader';
import { removeBackground } from '../../services/api';
import { Download, Loader2, Image as ImageIcon } from 'lucide-react';

const BackgroundRemover = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await removeBackground(file);
      setResult(data);
    } catch (err) {
      setError('Failed to remove background. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Background Remover</h2>
        <p className="text-gray-600 dark:text-gray-400">Upload an image to remove its background instantly using AI.</p>
      </div>

      <div className="glass p-8 rounded-3xl">
        <FileUploader
          onFileSelect={setFile}
          selectedFile={file}
          accept={{'image/*': ['.png', '.jpg', '.jpeg', '.webp']}}
        />

        {file && !result && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleProcess}
              disabled={loading}
              className="btn-primary flex items-center gap-2 min-w-[200px] justify-center"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Remove Background'}
            </button>
          </div>
        )}

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>

      {result && (
        <div className="glass p-8 rounded-3xl animate-in fade-in zoom-in duration-500">
          <h3 className="text-xl font-bold mb-6 text-center">Result Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 text-center">Original</p>
              <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 border dark:border-slate-700">
                <img src={URL.createObjectURL(file)} alt="Original" className="w-full h-auto max-h-[400px] object-contain" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 text-center">Background Removed</p>
              <div className="rounded-2xl overflow-hidden bg-checkered bg-slate-200 dark:bg-slate-700 border dark:border-slate-700 relative group">
                <img src={result.result} alt="Result" className="w-full h-auto max-h-[400px] object-contain" />
              </div>
            </div>
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
              <Download size={18} /> Download PNG
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundRemover;
