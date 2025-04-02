/**
 * Result of a file analysis
 */
interface AnalysisResult {
  extension: string;
  summary: string;
  fileSize: number;
  mimeType: string;
  metadata?: Record<string, unknown>;
}

/**
 * Interface for file agents
 */
interface FileAgent {
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
class DefaultAgent implements FileAgent {
  // Known binary file types and their descriptions
  private readonly knownBinaryTypes: Record<string, string> = {
    // Archives
    'zip': 'ZIP Archive',
    'rar': 'RAR Archive',
    '7z': '7-Zip Archive',
    'tar': 'Tape Archive',
    'gz': 'Gzip Compressed Archive',
    'bz2': 'BZip2 Compressed Archive',
    
    // Executables
    'exe': 'Windows Executable',
    'msi': 'Windows Installer Package',
    'dll': 'Windows Dynamic Link Library',
    'app': 'macOS Application Bundle',
    'dmg': 'macOS Disk Image',
    'deb': 'Debian Package',
    'rpm': 'Red Hat Package Manager',
    
    // Database
    'db': 'Database File',
    'sqlite': 'SQLite Database',
    'mdb': 'Microsoft Access Database',
    
    // 3D/CAD
    'stl': '3D Model (STL)',
    'obj': '3D Object File',
    'fbx': 'Autodesk FBX 3D Model',
    'blend': 'Blender 3D File',
    'dwg': 'AutoCAD Drawing',
    'dxf': 'Drawing Exchange Format',
    
    // Audio
    'mp3': 'MP3 Audio',
    'wav': 'WAV Audio',
    'flac': 'FLAC Audio',
    'm4a': 'AAC Audio',
    'ogg': 'Ogg Vorbis Audio',
    
    // Video
    'mp4': 'MP4 Video',
    'avi': 'AVI Video',
    'mov': 'QuickTime Video',
    'mkv': 'Matroska Video',
    'webm': 'WebM Video',
    
    // Fonts
    'ttf': 'TrueType Font',
    'otf': 'OpenType Font',
    'woff': 'Web Open Font Format',
    'woff2': 'Web Open Font Format 2',
    
    // Misc application-specific
    'psd': 'Adobe Photoshop Document',
    'ai': 'Adobe Illustrator File',
    'eps': 'Encapsulated PostScript',
    'indd': 'Adobe InDesign Document',
    'aep': 'Adobe After Effects Project',
    'prproj': 'Adobe Premiere Pro Project',
    'sketch': 'Sketch Design File',
    'fig': 'Figma Design File',
    'xd': 'Adobe XD Design Document',
    
    // Source code/programming related
    'so': 'Shared Object Library',
    'class': 'Java Class File',
    'jar': 'Java Archive',
    'pyc': 'Python Compiled Bytecode',
    'wasm': 'WebAssembly Binary',
  };
  
  // Categories for grouping file types
  private readonly fileCategories = [
    { 
      regex: /\.(zip|rar|7z|tar|gz|bz2)$/i, 
      category: 'Archive',
      description: 'Contains multiple compressed files'
    },
    { 
      regex: /\.(exe|msi|dll|app|dmg|deb|rpm)$/i, 
      category: 'Executable',
      description: 'Software installation or program file' 
    },
    { 
      regex: /\.(mp3|wav|flac|m4a|ogg|aac)$/i, 
      category: 'Audio',
      description: 'Sound or music file' 
    },
    { 
      regex: /\.(mp4|avi|mov|mkv|webm|flv|wmv)$/i, 
      category: 'Video',
      description: 'Video or movie file' 
    },
    { 
      regex: /\.(stl|obj|fbx|blend|dwg|dxf|step|stp|iges|igs)$/i, 
      category: '3D/CAD',
      description: '3D model or technical drawing' 
    },
    { 
      regex: /\.(psd|ai|eps|indd|aep|prproj|sketch|fig|xd)$/i, 
      category: 'Design',
      description: 'Design application file' 
    },
    { 
      regex: /\.(ttf|otf|woff|woff2)$/i, 
      category: 'Font',
      description: 'Typography font file' 
    },
    { 
      regex: /\.(db|sqlite|mdb|accdb|dbf)$/i, 
      category: 'Database',
      description: 'Structured data storage file' 
    },
  ];
  
  canHandle(file: File): boolean {
    // Default agent handles all files as fallback
    return true;
  }
  
  async analyze(file: File): Promise<AnalysisResult> {
    // Get file extension
    const extension = file.name.includes('.') 
      ? file.name.split('.').pop()?.toLowerCase() || 'unknown'
      : 'no-extension';
    
    // Find file category
    const fileCategory = this.fileCategories.find(
      category => category.regex.test(file.name)
    );
    
    // Get file description from known types
    const knownType = this.knownBinaryTypes[extension];
    
    // Format file size
    const formattedSize = this.formatFileSize(file.size);
    
    // Generate summary based on available info
    let summary: string;
    if (knownType) {
      summary = `${knownType} (${formattedSize})`;
    } else if (fileCategory) {
      summary = `${fileCategory.category} File: ${fileCategory.description} (${formattedSize})`;
    } else if (file.type && file.type !== 'application/octet-stream') {
      // Use mimetype info if available
      summary = `${this.formatMimeType(file.type)} (${formattedSize})`;
    } else {
      summary = `Unknown binary file (${extension}, ${formattedSize})`;
    }
    
    // Generate metadata based on file properties
    const metadata: Record<string, unknown> = {
      fileType: knownType || fileCategory?.category || 'Unknown Binary',
      lastModified: new Date(file.lastModified).toLocaleString(),
    };
    
    // Add category-specific metadata
    if (fileCategory) {
      metadata.category = fileCategory.category;
      metadata.description = fileCategory.description;
    }
    
    return {
      extension,
      summary,
      fileSize: file.size,
      mimeType: file.type || 'application/octet-stream',
      metadata,
    };
  }
  
  /**
   * Format file size in human-readable form
   */
  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
  
  /**
   * Format MIME type to be more human-readable
   */
  private formatMimeType(mimeType: string): string {
    // Extract the general type and specific subtype
    const [type, subtype] = mimeType.split('/');
    
    // Handle common types
    switch (type) {
      case 'audio':
        return `Audio File (${subtype})`;
      case 'video':
        return `Video File (${subtype})`;
      case 'application':
        // Handle common application subtypes
        switch (subtype) {
          case 'pdf':
            return 'PDF Document';
          case 'zip':
            return 'ZIP Archive';
          case 'x-tar':
            return 'TAR Archive';
          case 'x-gzip':
            return 'GZIP Archive';
          case 'x-7z-compressed':
            return '7-Zip Archive';
          case 'x-msdownload':
            return 'Windows Executable';
          case 'vnd.ms-powerpoint':
            return 'PowerPoint Presentation';
          case 'vnd.openxmlformats-officedocument.presentationml.presentation':
            return 'PowerPoint Presentation (PPTX)';
          default:
            return `${subtype.charAt(0).toUpperCase() + subtype.slice(1)} File`;
        }
      default:
        return mimeType;
    }
  }
}

// Export all types and classes
export type { AnalysisResult, FileAgent };
export { DefaultAgent };