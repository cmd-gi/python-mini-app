import React, { useState } from 'react';
import { downloadYoutube, downloadInstagram } from '../../services/api';
import { Download, Loader2, Youtube, Instagram, Link as LinkIcon, ExternalLink } from 'lucide-react';

const VideoDownloader = ({ platform }) => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isYoutube = platform === 'youtube';

  const handleProcess = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = isYoutube ? await downloadYoutube(url) : await downloadInstagram(url);
      setResult(data);
    } catch (err) {
      setError(`Failed to fetch ${isYoutube ? 'YouTube' : 'Instagram'} video. Please check the URL and try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          {isYoutube ? 'YouTube Downloader' : 'Instagram Downloader'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Paste the video link below to download in high quality.
        </p>
      </div>

      <div className="glass p-8 rounded-3xl">
        <form onSubmit={handleProcess} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              {isYoutube ? <Youtube size={20} /> : <Instagram size={20} />}
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={`Paste ${isYoutube ? 'YouTube' : 'Instagram'} link here...`}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 px-8 py-4 justify-center"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Fetch Video'}
          </button>
        </form>

        {error && <p className="mt-4 text-center text-red-500 text-sm">{error}</p>}
      </div>

      {result && (
        <div className="glass p-8 rounded-3xl animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
               <div className="rounded-2xl overflow-hidden shadow-lg border dark:border-slate-700">
                 <img src={result.thumbnail} alt="Thumbnail" className="w-full h-auto" />
               </div>
            </div>
            <div className="flex-1 space-y-6">
               <div>
                 <h3 className="text-xl font-bold mb-1">{result.title}</h3>
                 {result.duration && <p className="text-sm text-gray-500">Duration: {Math.floor(result.duration / 60)}:{(result.duration % 60).toString().padStart(2, '0')}</p>}
                 {result.message && <p className="text-sm text-amber-500 italic mt-2">{result.message}</p>}
               </div>

               <div className="space-y-3">
                 <p className="font-semibold text-sm uppercase tracking-wider text-gray-400">Available Downloads</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   {result.formats ? result.formats.map((f, i) => (
                     <a
                       key={i}
                       href={f.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl hover:border-primary transition-all group"
                     >
                       <span className="font-medium">{f.resolution || 'Auto'} ({f.ext})</span>
                       <Download size={18} className="text-gray-400 group-hover:text-primary" />
                     </a>
                   )) : (
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-xl hover:bg-primary/20 transition-all"
                    >
                      <span className="font-medium text-primary">Download Video</span>
                      <ExternalLink size={18} className="text-primary" />
                    </a>
                   )}
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDownloader;
