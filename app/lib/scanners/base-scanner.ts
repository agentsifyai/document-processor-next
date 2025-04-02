/**
 * Base interface for file scanners
 */
export interface ScanResult {
  extension: string;
  summary: string;
  fileSize: number;
  mimeType: string;
  metadata?: Record<string, any>;
}

export interface FileScanner {
  /**
   * Check if this scanner can handle the given file
   */
  canHandle(file: File): boolean;
  
  /**
   * Scan the file and extract information
   */
  scan(file: File): Promise<ScanResult>;
}

/**
 * Default fallback scanner for unsupported file types
 */
export class DefaultScanner implements FileScanner {
  canHandle(file: File): boolean {
    // Default scanner handles all files as fallback
    return true;
  }
  
  async scan(file: File): Promise<ScanResult> {
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