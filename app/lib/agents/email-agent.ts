import { FileAgent, AnalysisResult } from './base-agent';

/**
 * Agent for Email files (primarily .msg Outlook files)
 * Browser-compatible version
 */
export class EmailAgent implements FileAgent {
  // List of email file extensions
  private readonly emailExtensions = ['msg', 'eml'];
  
  canHandle(file: File): boolean {
    // Check if it's an email file by extension or mime type
    const extension = file.name.includes('.') 
      ? file.name.split('.').pop()?.toLowerCase() || ''
      : '';
      
    return this.emailExtensions.includes(extension) || 
           file.type === 'application/vnd.ms-outlook' ||
           file.type === 'message/rfc822';
  }
  
  async analyze(file: File): Promise<AnalysisResult> {
    // Get file details
    const fileName = file.name;
    const fileSize = file.size;
    const extension = fileName.includes('.') 
      ? fileName.split('.').pop()?.toLowerCase() || 'msg'
      : 'msg';
    
    // Calculate size description
    const sizeInKB = fileSize / 1024;
    const sizeDescription = sizeInKB >= 1024 
      ? `${(sizeInKB / 1024).toFixed(2)} MB` 
      : `${sizeInKB.toFixed(2)} KB`;
    
    // Extract potential subject from filename (remove extension and clean up)
    const baseFileName = fileName.replace(/\.(msg|eml)$/i, '');
    
    // Try to analyze file name to extract potential metadata
    let inferredSubject = baseFileName;
    let inferredSender = '';
    let inferredRecipient = '';
    let inferredDate = '';
    
    // Common email filename patterns:
    // 1. "From - Subject"
    // 2. "Subject - Date"
    // 3. "From_To_Date_Subject"
    
    // Pattern 1: "From - Subject" or "From: Subject"
    const fromPattern = /^([^-:]+)[-:]\s*(.+)$/i;
    const fromMatch = baseFileName.match(fromPattern);
    if (fromMatch) {
      inferredSender = fromMatch[1].trim();
      inferredSubject = fromMatch[2].trim();
    }
    
    // Pattern 2: Look for dates in the filename
    const datePattern = /\b(\d{1,2}[-./]\d{1,2}[-./]\d{2,4}|\d{4}[-./]\d{1,2}[-./]\d{1,2})\b/;
    const dateMatch = baseFileName.match(datePattern);
    if (dateMatch) {
      inferredDate = dateMatch[1];
      // Remove date from subject if it's part of it
      inferredSubject = inferredSubject.replace(dateMatch[0], '').trim();
    }
    
    // Clean up and format the subject nicely
    inferredSubject = inferredSubject
      .replace(/^(re|fwd|fw):\s*/i, '') // Remove Re: or Fwd: prefixes
      .replace(/[_-]/g, ' ')           // Replace underscores and dashes with spaces
      .replace(/\s+/g, ' ')            // Normalize spaces
      .trim();
      
    // Capitalize the first letter of each word in the subject
    inferredSubject = inferredSubject
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    // Determine email type based on filename and patterns
    let emailType = "Email";
    
    if (/invoice|receipt|payment|bill|statement|order|purchase/i.test(baseFileName)) {
      emailType = "Financial email";
    } else if (/report|update|summary|newsletter|digest/i.test(baseFileName)) {
      emailType = "Newsletter/Report";
    } else if (/meeting|invite|calendar|schedule|appointment/i.test(baseFileName)) {
      emailType = "Meeting invitation";
    } else if (/alert|notification|reminder|notice/i.test(baseFileName)) {
      emailType = "Notification";
    } else if (/confirm|verification|activate|validate/i.test(baseFileName)) {
      emailType = "Confirmation";
    } else if (/attachment|document|file|sent/i.test(baseFileName)) {
      emailType = "Email with attachment";
    } else if (/fwd|fw|forward/i.test(baseFileName)) {
      emailType = "Forwarded email";
    } else if (/reply|re:/i.test(baseFileName)) {
      emailType = "Email reply";
    }
    
    // Generate a contextual description
    let description = "";
    
    if (emailType === "Financial email") {
      description = `Transaction record or financial information related to ${inferredSubject.toLowerCase()}.`;
    } else if (emailType === "Newsletter/Report") {
      description = `Update or periodic information about ${inferredSubject.toLowerCase()}.`;
    } else if (emailType === "Meeting invitation") {
      description = `Calendar invitation or scheduling information for ${inferredSubject.toLowerCase()}.`;
    } else if (emailType === "Notification") {
      description = `Alert or notification regarding ${inferredSubject.toLowerCase()}.`;
    } else if (emailType === "Confirmation") {
      description = `Verification or confirmation email about ${inferredSubject.toLowerCase()}.`;
    } else if (emailType === "Email with attachment") {
      description = `Email containing documents or files related to ${inferredSubject.toLowerCase()}.`;
    } else if (emailType === "Forwarded email") {
      description = `Message forwarded from another sender about ${inferredSubject.toLowerCase()}.`;
    } else if (emailType === "Email reply") {
      description = `Response to a previous message about ${inferredSubject.toLowerCase()}.`;
    } else {
      description = `Email message regarding ${inferredSubject.toLowerCase()}.`;
    }
    
    // Add sender/recipient info if available
    if (inferredSender) {
      description += ` From: ${inferredSender}.`;
    }
    if (inferredRecipient) {
      description += ` To: ${inferredRecipient}.`;
    }
    if (inferredDate) {
      description += ` Date: ${inferredDate}.`;
    }
    
    // Estimate email content size
    // Typical email has around 50-200 words per KB, but varies greatly with attachments
    // For simplicity, we'll use a conservative estimate
    const estimatedWordCount = Math.max(20, Math.round(sizeInKB * 20));
    
    // Build summary, including inferred metadata when available
    let summary = `"${inferredSubject}" - ${emailType}`;
    
    // Add date if available
    if (inferredDate) {
      summary += ` (${inferredDate})`;
    }
    
    // Add sender if available
    if (inferredSender) {
      summary += ` from ${inferredSender}`;
    }
    
    // Add size
    summary += ` (${sizeDescription})`;
    
    return {
      extension,
      summary,
      fileSize,
      mimeType: file.type || `application/${extension === 'eml' ? 'octet-stream' : 'vnd.ms-outlook'}`,
      metadata: {
        inferredSubject,
        emailType,
        inferredSender,
        inferredRecipient,
        inferredDate,
        description,
        estimatedWordCount,
        sizeDescription,
        analyzed: true
      }
    };
  }
}