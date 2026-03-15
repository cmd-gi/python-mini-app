import React, { useEffect, useState } from 'react';
import { History as HistoryIcon, Clock, Trash2, Download, Loader2 } from 'lucide-react';
import { getHistory } from '../services/api';

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistoryItems(data.history);
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Recent Activity</h2>
          <p className="text-gray-600 dark:text-gray-400">View and redownload your processed files.</p>
        </div>
        <button className="text-sm font-medium text-red-500 hover:text-red-600 flex items-center gap-1 pb-1">
          <Trash2 size={16} /> Clear All History
        </button>
      </header>

      <div className="glass rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Tool</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">File Name</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Size</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {historyItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase">
                      {item.tool}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{item.filename}</td>
                  <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                    <Clock size={14} /> {item.date}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{item.size}</td>
                  <td className="px-6 py-4 text-right">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-primary transition-colors inline-block">
                      <Download size={20} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {historyItems.length === 0 && (
          <div className="p-12 text-center">
            <div className="bg-gray-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HistoryIcon size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No recent activity found.</p>
          </div>
        )}
      </div>

      <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl flex items-start gap-4">
        <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg text-amber-600">
          <Clock size={20} />
        </div>
        <div>
          <p className="font-bold text-amber-800 dark:text-amber-200">Guest Files Expiry</p>
          <p className="text-sm text-amber-700 dark:text-amber-300/80">
            You are currently using guest mode. Your files will be automatically deleted after 24 hours.
            <Link to="/signup" className="font-bold underline ml-1">Create an account</Link> to save them permanently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;
