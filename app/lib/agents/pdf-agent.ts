import { FileAgent, AnalysisResult } from './base-agent';

/**
 * Agent for PDF files
 * Browser-compatible version that doesn't use Node.js modules
 */
export class PdfAgent implements FileAgent {
  canHandle(file: File): boolean {
    // Check if it's a PDF file by extension or mime type
    const extension = file.name.includes('.') 
      ? file.name.split('.').pop()?.toLowerCase() || ''
      : '';
      
    return extension === 'pdf' || file.type === 'application/pdf';
  }
  
  async analyze(file: File): Promise<AnalysisResult> {
    // In a client-side Next.js app, we can't use Node.js modules like pdf-parse
    // Instead, we'll provide some basic PDF info based on what we can access
    
    // For a production app, you'd want to:
    // 1. Use a browser-compatible PDF parser like pdf.js
    // 2. OR send the PDF to a backend API endpoint that can process it
    
    // For now, we'll return basic file info
    const fileName = file.name;
    const fileSize = file.size;
    
    // Calculate the size in KB/MB for the summary
    const sizeInKB = fileSize / 1024;
    const sizeDescription = sizeInKB >= 1024 
      ? `${(sizeInKB / 1024).toFixed(2)} MB` 
      : `${sizeInKB.toFixed(2)} KB`;
      
    // Try to estimate page count based on average PDF page size (100KB per page is a very rough estimate)
    const estimatedPages = Math.max(1, Math.ceil(sizeInKB / 100));
    
    // Extract potential title from filename (remove extension and replace underscores/dashes with spaces)
    const baseFileName = fileName.replace(/\.pdf$/i, '');
    const inferredTitle = baseFileName
      .replace(/[_-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    // Generate a content summary based on filename and size
    let documentType = "Document";
    let topicInference = "";
    
    // Try to infer document type from filename
    if (/report|analysis|study|survey|review/i.test(baseFileName)) {
      documentType = "Report";
    } else if (/manual|guide|instruction|tutorial|how[\s-]to/i.test(baseFileName)) {
      documentType = "Guide";
    } else if (/presentation|slides|deck/i.test(baseFileName)) {
      documentType = "Presentation";
    } else if (/form|application|template/i.test(baseFileName)) {
      documentType = "Form";
    } else if (/letter|memo|statement|notice/i.test(baseFileName)) {
      documentType = "Correspondence";
    } else if (/invoice|receipt|bill|quote|estimate/i.test(baseFileName)) {
      documentType = "Financial document";
    } else if (/contract|agreement|terms|policy|legal/i.test(baseFileName)) {
      documentType = "Legal document";
    }
    
    // Generate a simple description based on the title and type
    let description = "";
    
    // Create a contextual description based on document type
    if (documentType === "Report") {
      description = `Analysis or findings about ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Guide") {
      description = `Instructions or guidance related to ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Presentation") {
      description = `Slides or presentation materials about ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Form") {
      description = `Template or form for ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Correspondence") {
      description = `Communication regarding ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Financial document") {
      description = `Financial information related to ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Legal document") {
      description = `Legal terms or agreement concerning ${inferredTitle.toLowerCase()}.`;
    } else {
      description = `Document containing information about ${inferredTitle.toLowerCase()}.`;
    }
    
    // Build a meaningful summary
    const summary = `"${inferredTitle}" - ${documentType} (approx. ${estimatedPages} page${estimatedPages !== 1 ? 's' : ''}, ${sizeDescription})`;
    
    return {
      extension: 'pdf',
      summary,
      fileSize,
      mimeType: 'application/pdf',
      metadata: {
        estimatedPages,
        sizeDescription,
        inferredTitle,
        documentType,
        description,
        analyzed: true
      }
    };
  }
}