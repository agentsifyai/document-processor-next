import { FileScanner, DefaultScanner, ScanResult } from './base-scanner';
import { TextScanner } from './text-scanner';
import { PdfScanner } from './pdf-scanner';
import { ImageScanner } from './image-scanner';

// Create scanner registry with all available scanners
const scanners: FileScanner[] = [
  new TextScanner(),
  new PdfScanner(),
  new ImageScanner(),
  // Add more scanners here as they're implemented
  
  // DefaultScanner is the fallback and should be last
  new DefaultScanner()
];

/**
 * Find the appropriate scanner for a file
 */
export function getScannerForFile(file: File): FileScanner {
  // Find the first scanner that can handle this file
  return scanners.find(scanner => scanner.canHandle(file)) || new DefaultScanner();
}

/**
 * Scan a file using the appropriate scanner
 */
export async function scanFile(file: File): Promise<ScanResult> {
  const scanner = getScannerForFile(file);
  return scanner.scan(file);
}

// Export all types and classes
export { FileScanner, DefaultScanner, ScanResult };
export { TextScanner } from './text-scanner';
export { PdfScanner } from './pdf-scanner';
export { ImageScanner } from './image-scanner';