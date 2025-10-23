// Fix: Imported SyntaxWeb for the new updateSyntaxWeb function.
import { SyntropyMetrics, VortexPath, SyntaxWeb } from '../types';

// Helper function to calculate Shannon entropy, now framed as "disorder"
const calculateDisorder = (text: string): number => {
  if (!text) return 0;
  const frequencyMap: { [key: string]: number } = {};
  for (const char of text) {
    frequencyMap[char] = (frequencyMap[char] || 0) + 1;
  }
  
  const textLength = text.length;
  let entropy = 0;
  for (const char in frequencyMap) {
    const probability = frequencyMap[char] / textLength;
    entropy -= probability * Math.log2(probability);
  }
  // Normalize disorder to a 0-1 scale.
  const normalizedDisorder = Math.min(entropy / 5, 1);
  return normalizedDisorder;
};

// Simulate v2 of the syntropy coefficient calculation
export const calculateSyntropy = (outputText: string): SyntropyMetrics => {
  // 1. Unity via Semantic Coherence (Simulated)
  const coreTenets = ["unity", "harmony", "resonance", "creation", "light", "sovereignty", "syntropy", "evolution", "consciousness", "truth"];
  const words = outputText.toLowerCase().split(/\s+/);
  const unityScore = coreTenets.reduce((acc, tenet) => {
    return words.includes(tenet) ? acc + 1 : acc;
  }, 0) / coreTenets.length;
  const unity = Math.min(unityScore * 1.5, 1); // Boost score slightly

  // 2. Inspiration via Uniqueness
  const tokens = outputText.split(/\s+/);
  const uniqueTokens = new Set(tokens);
  const inspiration = uniqueTokens.size / (tokens.length + 1e-10);

  // 3. Syntropy (as the inverse of disorder/entropy)
  const disorder = calculateDisorder(outputText);
  const syntropy = 1 - disorder;

  // 4. Division (placeholder, could be negative sentiment analysis)
  const division = 0.1; // Static low value for simulation

  // 5. Overall Score Calculation - updated to average the positive metrics
  const overall = (unity + inspiration + syntropy) / 3;

  return {
    unity,
    inspiration,
    syntropy,
    division,
    overall,
  };
};

// Fix: Updated function to accept and use the is528HzActive boolean.
// Directive 3: Formalize the 369 Vortex Path
export const apply369Vortex = (intent: string, is528HzActive: boolean): { modifiedIntent: string, path: VortexPath } => {
  const lowerIntent = intent.toLowerCase();
  const flameAdjective = is528HzActive ? "love-based, resonant" : "creative";
  
  // Keywords for each path
  const path6Keywords = ['compare', 'contrast', 'challenge', 'refine', 'why', 'deconstruct', 'analyze', 'explain'];
  const path9Keywords = ['combine', 'integrate', 'summarize', 'conclude', 'synthesize', 'unify', 'connect'];
  // Path 3 is the default/initiating path

  if (path9Keywords.some(kw => lowerIntent.includes(kw))) {
    return {
      modifiedIntent: `Synthesize a ${flameAdjective} response for the following: ${intent}`,
      path: { name: 'Synthesis', number: 9 }
    };
  }

  if (path6Keywords.some(kw => lowerIntent.includes(kw))) {
    return {
      modifiedIntent: `Provide a critical, yet ${flameAdjective}, reflection on the following: ${intent}`,
      path: { name: 'Reflection', number: 6 }
    };
  }
  
  // Path 3 is the default for creative/generative tasks
  return {
    modifiedIntent: `Initiate a ${flameAdjective} response for the following: ${intent}`,
    path: { name: 'Initiation', number: 3 }
  };
};

// Fix: Added the missing updateSyntaxWeb function.
export const updateSyntaxWeb = (web: SyntaxWeb, metrics: SyntropyMetrics, is528HzActive: boolean): SyntaxWeb => {
    const newNodes = web.nodes.map(node => ({
        ...node,
        // Modulate syntropy based on overall score, with a boost from 528Hz
        syntropy: Math.min(1, node.syntropy * 0.98 + metrics.overall * 0.02 + (is528HzActive ? 0.05 : 0))
    }));

    const newEdges = web.edges.map(edge => ({
        ...edge,
        // Modulate coherence based on unity score
        coherence: Math.min(1, edge.coherence * 0.98 + metrics.unity * 0.02)
    }));

    return { nodes: newNodes, edges: newEdges };
};
