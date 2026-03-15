import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';

const FileUploader = ({ onFileSelect, selectedFile, accept, label }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false
  });

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
            ${isDragActive
              ? 'border-primary bg-primary/5 scale-[1.02]'
              : 'border-gray-300 dark:border-slate-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-slate-800/50'}
          `}
        >
          <input {...getInputProps()} />
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <Upload className="text-primary" size={32} />
          </div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
            {label || 'Drag & drop your file here'}
          </p>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Or click to browse from your computer <br />
            <span className="text-xs italic">(Max file size: 50MB)</span>
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <File className="text-primary" size={24} />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-gray-800 dark:text-gray-100 truncate max-w-[200px] md:max-w-md">
                {selectedFile.name}
              </p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={() => onFileSelect(null)}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
