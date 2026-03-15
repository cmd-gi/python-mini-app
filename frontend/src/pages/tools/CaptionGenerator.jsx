import React, { useState } from 'react';
import FileUploader from '../../components/Tools/FileUploader';
import { generateCaption } from '../../services/api';
import { Loader2, Copy, Check, Hash, MessageSquare } from 'lucide-react';

const CaptionGenerator = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [hashtagsCopied, setHashtagsCopied] = useState(false);

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await generateCaption(file);
      setResult(data);
    } catch (err) {
      setError('Failed to generate captions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, index = null) => {
    navigator.clipboard.writeText(text);
    if (index !== null) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setHashtagsCopied(true);
      setTimeout(() => setHashtagsCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">AI Caption Generator</h2>
        <p className="text-gray-600 dark:text-gray-400">Generate creative captions and viral hashtags for your images.</p>
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
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Generate Captions'}
            </button>
          </div>
        )}

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in zoom-in duration-500">
          <div className="space-y-6">
             <div className="rounded-3xl overflow-hidden border dark:border-slate-700 shadow-xl">
               <img src={URL.createObjectURL(file)} alt="Upload" className="w-full h-auto" />
             </div>

             <button
                onClick={() => {setFile(null); setResult(null);}}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 text-gray-500 hover:border-primary hover:text-primary transition-all font-medium"
              >
                Upload Different Image
              </button>
          </div>

          <div className="space-y-6">
            <div className="glass p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <MessageSquare size={20} />
                <h3 className="font-bold text-lg">Caption Ideas</h3>
              </div>

              {result.captions.map((caption, idx) => (
                <div key={idx} className="relative group p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border dark:border-slate-700 hover:border-primary/50 transition-all">
                  <p className="text-gray-700 dark:text-gray-200 pr-10">{caption}</p>
                  <button
                    onClick={() => copyToClipboard(caption, idx)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors"
                  >
                    {copiedIndex === idx ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </div>

            <div className="glass p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-secondary">
                  <Hash size={20} />
                  <h3 className="font-bold text-lg">Hashtags</h3>
                </div>
                <button
                  onClick={() => copyToClipboard(result.hashtags.join(' '))}
                  className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                >
                  {hashtagsCopied ? <Check size={14} /> : <Copy size={14} />}
                  {hashtagsCopied ? 'Copied All' : 'Copy All'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {result.hashtags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-secondary/10 text-secondary-dark dark:text-secondary rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptionGenerator;
