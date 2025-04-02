/**
 * Base interface for file agents
 */
export interface AnalysisResult {
  extension: string;
  summary: string;
  fileSize: number;
  mimeType: string;
  metadata?: Record<string, any>;
}

export interface FileAgent {
  /**
   * Check if this agent can handle the given file
   */
  canHandle(file: File): boolean;
  
  /**
   * Analyze the file and extract information
   */
  analyze(file: File): Promise<AnalysisResult>;
}

/**
 * Default fallback agent for unsupported file types
 */
export class DefaultAgent implements FileAgent {
  canHandle(file: File): boolean {
    // Default agent handles all files as fallback
    return true;
  }
  
  async analyze(file: File): Promise<AnalysisResult> {
    // Get file extension
    const extension = file.name.includes('.') 
      ? file.name.split('.').pop()?.toLowerCase() || 'unknown'
      : 'no-extension';
      
    return {
      extension,
      summary: `Binary file (${extension})`,
      fileSize: file.size,
      mimeType: file.type || 'application/octet-stream',
    };
  }
}