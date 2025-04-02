import { FileAgent, AnalysisResult } from './base-agent';

/**
 * Agent for Excel files
 * Browser-compatible version
 */
export class ExcelAgent implements FileAgent {
  // List of Excel file extensions
  private readonly excelExtensions = ['xlsx', 'xls', 'xlsm', 'xlsb', 'csv'];
  
  canHandle(file: File): boolean {
    // Check if it's an Excel file by extension or mime type
    const extension = file.name.includes('.') 
      ? file.name.split('.').pop()?.toLowerCase() || ''
      : '';
      
    return this.excelExtensions.includes(extension) || 
           file.type === 'application/vnd.ms-excel' ||
           file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
           file.type === 'text/csv';
  }
  
  async analyze(file: File): Promise<AnalysisResult> {
    // Get file details
    const fileName = file.name;
    const fileSize = file.size;
    const extension = fileName.includes('.') 
      ? fileName.split('.').pop()?.toLowerCase() || 'xlsx'
      : 'xlsx';
    
    // Calculate size description
    const sizeInKB = fileSize / 1024;
    const sizeDescription = sizeInKB >= 1024 
      ? `${(sizeInKB / 1024).toFixed(2)} MB` 
      : `${sizeInKB.toFixed(2)} KB`;
    
    // Extract title from filename
    const baseFileName = fileName.replace(/\.(xlsx|xls|xlsm|xlsb|csv)$/i, '');
    const inferredTitle = baseFileName
      .replace(/[_-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    // Determine spreadsheet type based on filename patterns
    let spreadsheetType = "Spreadsheet";
    
    if (/report|analysis|analytics|stats|statistics|metrics|kpi|dashboard/i.test(baseFileName)) {
      spreadsheetType = "Report";
    } else if (/budget|financial|finance|expense|revenue|profit|loss|cost|price/i.test(baseFileName)) {
      spreadsheetType = "Financial spreadsheet";
    } else if (/data|dataset|database|sample|set/i.test(baseFileName)) {
      spreadsheetType = "Dataset";
    } else if (/schedule|calendar|timeline|plan|planning|project/i.test(baseFileName)) {
      spreadsheetType = "Schedule";
    } else if (/list|inventory|catalog|products|items/i.test(baseFileName)) {
      spreadsheetType = "List";
    } else if (/template|form|worksheet/i.test(baseFileName)) {
      spreadsheetType = "Template";
    } else if (/calc|calculator|formula/i.test(baseFileName)) {
      spreadsheetType = "Calculator";
    }
    
    // Generate a contextual description
    let description = "";
    
    if (spreadsheetType === "Report") {
      description = `Data analysis or metrics about ${inferredTitle.toLowerCase()}.`;
    } else if (spreadsheetType === "Financial spreadsheet") {
      description = `Financial figures or calculations related to ${inferredTitle.toLowerCase()}.`;
    } else if (spreadsheetType === "Dataset") {
      description = `Collection of data points or information about ${inferredTitle.toLowerCase()}.`;
    } else if (spreadsheetType === "Schedule") {
      description = `Timeline or planning information for ${inferredTitle.toLowerCase()}.`;
    } else if (spreadsheetType === "List") {
      description = `Categorized items or inventory of ${inferredTitle.toLowerCase()}.`;
    } else if (spreadsheetType === "Template") {
      description = `Reusable format or structure for ${inferredTitle.toLowerCase()}.`;
    } else if (spreadsheetType === "Calculator") {
      description = `Tool for computing or calculating ${inferredTitle.toLowerCase()}.`;
    } else {
      description = `Tabular data or information about ${inferredTitle.toLowerCase()}.`;
    }
    
    // Estimate rows and columns based on file size (very rough approximation)
    // Assuming average Excel cell takes ~20 bytes (varies widely depending on content)
    const estimatedCells = Math.max(10, Math.floor(fileSize / 20));
    const estimatedRows = Math.max(5, Math.ceil(Math.sqrt(estimatedCells)));
    const estimatedColumns = Math.max(3, Math.ceil(estimatedCells / estimatedRows));
    
    // Build summary
    const summary = `"${inferredTitle}" - ${spreadsheetType} (est. ${estimatedRows}×${estimatedColumns}, ${sizeDescription})`;
    
    return {
      extension,
      summary,
      fileSize,
      mimeType: file.type || `application/${extension === 'csv' ? 'csv' : 'vnd.ms-excel'}`,
      metadata: {
        inferredTitle,
        spreadsheetType,
        description,
        estimatedRows,
        estimatedColumns,
        sizeDescription,
        analyzed: true
      }
    };
  }
}