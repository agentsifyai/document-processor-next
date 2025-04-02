import { FileAgent, DefaultAgent, AnalysisResult } from './base-agent';
import { TextAgent } from './text-agent';
import { PdfAgent } from './pdf-agent';
import { ImageAgent } from './image-agent';

// Create agent registry with all available agents
const agents: FileAgent[] = [
  new TextAgent(),
  new PdfAgent(),
  new ImageAgent(),
  // Add more agents here as they're implemented
  
  // DefaultAgent is the fallback and should be last
  new DefaultAgent()
];

/**
 * Find the appropriate agent for a file
 */
export function getAgentForFile(file: File): FileAgent {
  // Find the first agent that can handle this file
  return agents.find(agent => agent.canHandle(file)) || new DefaultAgent();
}

/**
 * Analyze a file using the appropriate agent
 */
export async function analyzeFile(file: File): Promise<AnalysisResult> {
  const agent = getAgentForFile(file);
  return agent.analyze(file);
}

// Export all types and classes
export { FileAgent, DefaultAgent, AnalysisResult };
export { TextAgent } from './text-agent';
export { PdfAgent } from './pdf-agent';
export { ImageAgent } from './image-agent';