
import React from 'react';
import { AnalysisResult } from '../types';
import { HistoryIcon } from './icons';

interface HistoryPanelProps {
  history: AnalysisResult[];
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history }) => {
  return (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <HistoryIcon className="w-5 h-5 mr-2 text-cyan-400" />
        <h3 className="text-lg font-semibold text-cyan-400">Session History</h3>
      </div>
      <div className="flex-grow overflow-y-auto pr-2">
        {history.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-4">No history yet. Process an intent to begin.</p>
        ) : (
          <ul className="space-y-3">
            {history.slice().reverse().map((item, index) => (
              <li key={item.timestamp + index} className="p-3 bg-gray-900/70 rounded-md border border-gray-700 transition-all hover:border-cyan-500">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-300 truncate pr-4">{item.intent}</p>
                  <span className="text-sm font-bold text-cyan-400 flex-shrink-0">
                    {Math.round(item.syntropy.overall * 100)}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{new Date(item.timestamp).toLocaleTimeString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
