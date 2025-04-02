import { FileAgent, AnalysisResult } from './base-agent';

/**
 * Agent for Microsoft Word documents
 * Browser-compatible version
 */
export class WordAgent implements FileAgent {
  // List of Word file extensions
  private readonly wordExtensions = ['doc', 'docx', 'docm', 'dotx', 'dotm', 'odt', 'rtf'];
  
  canHandle(file: File): boolean {
    // Check if it's a Word file by extension or mime type
    const extension = file.name.includes('.') 
      ? file.name.split('.').pop()?.toLowerCase() || ''
      : '';
      
    return this.wordExtensions.includes(extension) || 
           file.type === 'application/msword' ||
           file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
           file.type === 'application/vnd.oasis.opendocument.text' ||
           file.type === 'application/rtf';
  }
  
  async analyze(file: File): Promise<AnalysisResult> {
    // Get file details
    const fileName = file.name;
    const fileSize = file.size;
    const extension = fileName.includes('.') 
      ? fileName.split('.').pop()?.toLowerCase() || 'docx'
      : 'docx';
    
    // Calculate size description
    const sizeInKB = fileSize / 1024;
    const sizeDescription = sizeInKB >= 1024 
      ? `${(sizeInKB / 1024).toFixed(2)} MB` 
      : `${sizeInKB.toFixed(2)} KB`;
    
    // Extract title from filename
    const baseFileName = fileName.replace(/\.(doc|docx|docm|dotx|dotm|odt|rtf)$/i, '');
    const inferredTitle = baseFileName
      .replace(/[_-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    // Determine document type based on filename patterns
    let documentType = "Document";
    
    if (/report|analysis|study|assessment|evaluation|review/i.test(baseFileName)) {
      documentType = "Report";
    } else if (/letter|memo|email|message|correspondence/i.test(baseFileName)) {
      documentType = "Letter";
    } else if (/manual|guide|tutorial|instruction|how[\s-]to/i.test(baseFileName)) {
      documentType = "Manual";
    } else if (/essay|paper|article|publication|thesis|dissertation/i.test(baseFileName)) {
      documentType = "Academic paper";
    } else if (/proposal|pitch|business|plan|strategy/i.test(baseFileName)) {
      documentType = "Proposal";
    } else if (/contract|agreement|legal|terms|policy/i.test(baseFileName)) {
      documentType = "Legal document";
    } else if (/resume|cv|curriculum|vitae|bio/i.test(baseFileName)) {
      documentType = "Resume/CV";
    } else if (/minutes|agenda|meeting|notes|summary/i.test(baseFileName)) {
      documentType = "Meeting notes";
    } else if (/template|form|worksheet/i.test(baseFileName)) {
      documentType = "Template";
    } else if (/draft|outline|wip|todo/i.test(baseFileName)) {
      documentType = "Draft";
    }
    
    // Generate a contextual description
    let description = "";
    
    if (documentType === "Report") {
      description = `Detailed analysis or findings about ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Letter") {
      description = `Written correspondence regarding ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Manual") {
      description = `Instructions or guidance on how to use or understand ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Academic paper") {
      description = `Scholarly work or research on the topic of ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Proposal") {
      description = `Suggested plan or concept for ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Legal document") {
      description = `Legally binding terms or agreements related to ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Resume/CV") {
      description = `Professional background and qualifications for ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Meeting notes") {
      description = `Record of discussions or decisions from meetings about ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Template") {
      description = `Standardized format or structure for creating ${inferredTitle.toLowerCase()} documents.`;
    } else if (documentType === "Draft") {
      description = `Work-in-progress document about ${inferredTitle.toLowerCase()}.`;
    } else {
      description = `Text document containing information about ${inferredTitle.toLowerCase()}.`;
    }
    
    // Estimate pages and word count based on file size
    // Assumptions: 
    // - Average Word document has about 500 words per page
    // - Average size per page: 15KB (can vary widely depending on formatting, images, etc.)
    const estimatedPages = Math.max(1, Math.ceil(sizeInKB / 15));
    const estimatedWordCount = estimatedPages * 500;
    
    // Estimate reading time (average reading speed: 200-250 words per minute)
    const estimatedReadingMinutes = Math.ceil(estimatedWordCount / 200);
    
    // Build summary
    const summary = `"${inferredTitle}" - ${documentType} (est. ${estimatedPages} page${estimatedPages !== 1 ? 's' : ''}, ${sizeDescription})`;
    
    return {
      extension,
      summary,
      fileSize,
      mimeType: file.type || `application/${extension === 'odt' ? 'vnd.oasis.opendocument.text' : 'msword'}`,
      metadata: {
        inferredTitle,
        documentType,
        description,
        estimatedPages,
        estimatedWordCount,
        estimatedReadingMinutes,
        sizeDescription,
        analyzed: true
      }
    };
  }
}