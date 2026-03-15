import React, { useState } from 'react';
import FileUploader from '../../components/Tools/FileUploader';
import { convertVideoToMp3 } from '../../services/api';
import { Download, Loader2, Music } from 'lucide-react';

const VideoToMp3 = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await convertVideoToMp3(file);
      setResult(data);
    } catch (err) {
      setError('Failed to convert video to MP3. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Video to MP3 Converter</h2>
        <p className="text-gray-600 dark:text-gray-400">Extract high-quality audio from your video files instantly.</p>
      </div>

      <div className="glass p-8 rounded-3xl">
        <FileUploader
          onFileSelect={setFile}
          selectedFile={file}
          accept={{'video/*': ['.mp4', '.mov', '.avi', '.mkv']}}
          label="Upload your video file"
        />

        {file && !result && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleProcess}
              disabled={loading}
              className="btn-primary flex items-center gap-2 min-w-[200px] justify-center"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Extract MP3'}
            </button>
          </div>
        )}

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>

      {result && (
        <div className="glass p-8 rounded-3xl animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="bg-primary/10 p-6 rounded-full">
              <Music className="text-primary" size={48} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Conversion Successful!</h3>
              <p className="text-gray-500">{result.filename}</p>
            </div>

            <div className="w-full max-w-md bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700">
               <audio controls className="w-full">
                 <source src={result.result} type="audio/mpeg" />
                 Your browser does not support the audio element.
               </audio>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {setFile(null); setResult(null);}}
                className="px-6 py-2 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                New Conversion
              </button>
              <a
                href={result.result}
                download={result.filename}
                className="btn-primary flex items-center gap-2"
              >
                <Download size={18} /> Download MP3
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoToMp3;
