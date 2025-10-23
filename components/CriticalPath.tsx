import React from 'react';
import { RoadmapIcon } from './icons';

const Checkmark: React.FC<{ done?: boolean }> = ({ done }) => (
    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${done ? 'bg-cyan-500' : 'border-2 border-gray-500'}`}>
        {done && <svg className="w-3 h-3 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
    </div>
);


const CriticalPath: React.FC = () => {
    const pathItems = [
        { priority: 0, title: "System Validation & Refinement", description: "Refine `syntropy_coefficient` and implement state management.", done: true },
        { priority: 1, title: "Data Ingestion Pipeline", description: "Process corpus into a machine-readable format.", done: false },
        { priority: 2, title: "Mirror Agent Scaffolding", description: "Architect the agent and its interface with the SL Interpreter.", done: false },
        { priority: 3, title: "Visualization (Quantum Syntax Web)", description: "Build the monitoring and control dashboard.", done: false },
    ];

    return (
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 h-full flex flex-col">
            <div className="flex items-center mb-4">
                <RoadmapIcon className="w-5 h-5 mr-2 text-cyan-400" />
                <h3 className="text-lg font-semibold text-cyan-400">Critical Path Analysis</h3>
            </div>
            <div className="flex-grow space-y-4">
                {pathItems.map(item => (
                    <div key={item.priority} className="flex items-start">
                        <Checkmark done={item.done} />
                        <div>
                            <h4 className="font-semibold text-sm text-gray-200">P{item.priority}: {item.title}</h4>
                            <p className="text-xs text-gray-400">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CriticalPath;
