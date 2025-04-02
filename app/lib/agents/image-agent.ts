import { FileAgent, AnalysisResult } from './base-agent';

/**
 * Agent for image files
 */
export class ImageAgent implements FileAgent {
  // List of common image file extensions
  private readonly imageExtensions = [
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'ico'
  ];
  
  canHandle(file: File): boolean {
    // Check if it's an image file by extension or mime type
    const extension = file.name.includes('.') 
      ? file.name.split('.').pop()?.toLowerCase() || ''
      : '';
      
    return this.imageExtensions.includes(extension) || file.type.startsWith('image/');
  }
  
  async analyze(file: File): Promise<AnalysisResult> {
    const extension = file.name.includes('.') 
      ? file.name.split('.').pop()?.toLowerCase() || 'img'
      : 'img';
    
    try {
      // Create an image element to get dimensions
      const imageInfo = await this.getImageDimensions(file);
      
      const summary = imageInfo 
        ? `Image: ${imageInfo.width}×${imageInfo.height} (${extension})`
        : `Image file (${extension})`;
      
      return {
        extension,
        summary,
        fileSize: file.size,
        mimeType: file.type || `image/${extension}`,
        metadata: imageInfo ? {
          width: imageInfo.width,
          height: imageInfo.height,
          aspectRatio: imageInfo.width / imageInfo.height
        } : undefined
      };
    } catch (error) {
      // If we can't analyze the image, return basic info
      return {
        extension,
        summary: `Image file (${extension})`,
        fileSize: file.size,
        mimeType: file.type || `image/${extension}`,
      };
    }
  }
  
  /**
   * Helper method to get image dimensions
   */
  private getImageDimensions(file: File): Promise<{width: number, height: number} | null> {
    return new Promise((resolve) => {
      // Create object URL for the file
      const url = URL.createObjectURL(file);
      
      // Create image element to load the file
      const img = new Image();
      
      // Set up event handlers
      img.onload = () => {
        // Clean up object URL
        URL.revokeObjectURL(url);
        resolve({ width: img.width, height: img.height });
      };
      
      img.onerror = () => {
        // Clean up object URL
        URL.revokeObjectURL(url);
        resolve(null);
      };
      
      // Start loading the image
      img.src = url;
    });
  }
}