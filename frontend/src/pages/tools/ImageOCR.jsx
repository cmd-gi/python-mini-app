import React, { useState } from 'react';
import FileUploader from '../../components/Tools/FileUploader';
import { extractTextOCR } from '../../services/api';
import { Download, Loader2, Copy, Check } from 'lucide-react';

const ImageOCR = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await extractTextOCR(file);
      setResult(data);
    } catch (err) {
      setError('Failed to extract text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([result.text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "extracted_text.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Image to Text (OCR)</h2>
        <p className="text-gray-600 dark:text-gray-400">Extract editable text from any image instantly.</p>
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
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Extract Text'}
            </button>
          </div>
        )}

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>

      {result && (
        <div className="glass p-8 rounded-3xl animate-in fade-in zoom-in duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Extracted Text</h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Download size={18} />
                Download TXT
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={result.text}
              onChange={(e) => setResult({...result, text: e.target.value})}
              className="w-full h-64 p-6 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl resize-none focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Extracted text will appear here..."
            />
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {setFile(null); setResult(null);}}
              className="px-6 py-2 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              Upload New Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageOCR;
