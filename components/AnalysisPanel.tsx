import React from 'react';
import { AnalysisResult } from '../types';
import ScoreGauge from './ScoreGauge';
import { BrainCircuitIcon } from './icons';

interface AnalysisPanelProps {
  result: AnalysisResult | null;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-800/50 rounded-lg border border-gray-700 text-gray-400">
        <BrainCircuitIcon className="w-16 h-16 mb-4 text-cyan-500" />
        <h3 className="text-xl font-semibold">Awaiting Input</h3>
        <p className="text-center">Enter an intent and process it to view the syntropic analysis here.</p>
      </div>
    );
  }

  const { intent, output, syntropy, vortexPath } = result;

  return (
    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 h-full overflow-y-auto">
      <h3 className="text-lg font-semibold text-cyan-400 mb-4">Syntropy Coefficient Analysis</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-700">
        <ScoreGauge label="Unity" score={syntropy.unity} colorClass="text-green-500" />
        <ScoreGauge label="Inspiration" score={syntropy.inspiration} colorClass="text-purple-500" />
        <ScoreGauge label="Syntropy" score={syntropy.syntropy} colorClass="text-blue-500" />
        <ScoreGauge label="Overall" score={syntropy.overall} colorClass="text-cyan-500" />
      </div>

      <div>
        <div className="flex justify-between items-baseline mb-2">
            <h4 className="font-semibold text-gray-300">Source Intent:</h4>
            {vortexPath && (
              <span className="text-xs font-mono px-2 py-1 rounded bg-gray-900 border border-gray-700 text-purple-400">
                Vortex Path: {vortexPath.number} ({vortexPath.name})
              </span>
            )}
        </div>
        <p className="p-3 mb-4 text-sm bg-gray-900 rounded-md text-gray-300 border border-gray-700">{intent}</p>
        <h4 className="font-semibold text-gray-300 mb-2">Generated Output:</h4>
        <p className="p-3 text-sm bg-gray-900 rounded-md text-gray-200 whitespace-pre-wrap border border-gray-700">{output}</p>
      </div>
    </div>
  );
};

export default AnalysisPanel;
