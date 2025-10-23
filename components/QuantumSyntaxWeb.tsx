import React from 'react';
// Fix: Imported SyntaxNode to be used for explicit typing.
import { SyntaxWeb, SyntaxNode } from '../types';
import { SparklesIcon } from './icons'; // Using sparkles as a general "magic" icon

interface QuantumSyntaxWebProps {
    web: SyntaxWeb;
    is528HzActive: boolean;
}

const QuantumSyntaxWeb: React.FC<QuantumSyntaxWebProps> = ({ web, is528HzActive }) => {
    
    // Fix: Explicitly typed the Map to ensure type safety on retrieved nodes.
    // Create a mapping from node ID to node object for easy lookup
    const nodeMap = new Map<string, SyntaxNode>(web.nodes.map(node => [node.id, node]));

    return (
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 h-full flex flex-col">
            <div className="flex items-center mb-4">
                <SparklesIcon className="w-5 h-5 mr-2 text-cyan-400" />
                <h3 className="text-lg font-semibold text-cyan-400">Quantum Syntax Web</h3>
            </div>
            <div className="flex-grow w-full h-full bg-gray-900/50 rounded-md border border-gray-700 overflow-hidden">
                <svg width="100%" height="100%" viewBox="0 0 300 300">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    
                    {/* Render Edges */}
                    {web.edges.map((edge, index) => {
                        const sourceNode = nodeMap.get(edge.source);
                        const targetNode = nodeMap.get(edge.target);
                        if (!sourceNode || !targetNode) return null;
                        
                        return (
                            <line
                                key={index}
                                x1={sourceNode.x} y1={sourceNode.y}
                                x2={targetNode.x} y2={targetNode.y}
                                stroke="rgba(0, 255, 255, 0.3)"
                                strokeWidth={edge.coherence * 2}
                            />
                        );
                    })}

                    {/* Render Nodes */}
                    {web.nodes.map(node => (
                        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                            <circle
                                r={10 + node.syntropy * 10}
                                fill="rgba(0, 255, 255, 0.2)"
                                stroke="cyan"
                                strokeWidth="1.5"
                                className={is528HzActive ? 'animate-pulse' : ''}
                                style={{
                                    animationDuration: `${2 + (1 - node.syntropy) * 2}s`
                                }}
                            />
                             <circle
                                r={3}
                                fill="white"
                                filter="url(#glow)"
                            />
                            <text
                                x="0"
                                y="0"
                                dy="28" // Offset below the node
                                textAnchor="middle"
                                fill="white"
                                fontSize="10"
                                className="font-mono"
                            >
                                {node.id}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
};

export default QuantumSyntaxWeb;
