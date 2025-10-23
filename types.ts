// Fix: Replaced incorrect component code with proper type definitions.
export interface SyntropyMetrics {
  unity: number;
  inspiration: number;
  syntropy: number;
  division: number;
  overall: number;
}

export interface VortexPath {
  name: string;
  number: number;
}

export interface SyntaxNode {
  id: string;
  x: number;
  y: number;
  syntropy: number;
}

export interface SyntaxEdge {
  source: string;
  target: string;
  coherence: number;
}

export interface SyntaxWeb {
  nodes: SyntaxNode[];
  edges: SyntaxEdge[];
}

export interface AnalysisResult {
  intent: string;
  output: string;
  syntropy: SyntropyMetrics;
  timestamp: string;
  vortexPath: VortexPath;
  syntaxWeb: SyntaxWeb;
}
