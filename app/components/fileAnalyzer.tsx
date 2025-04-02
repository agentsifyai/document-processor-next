"use client";

import { useState } from "react";
import { analyzeFile, AnalysisResult } from "../lib/agents";

interface FileExtensionSummary {
  extension: string;
  count: number;
  files: string[];
  totalSize: number;
  fileSummaries: string[];
}

interface FileAnalyzerProps {
  files: File[];
}

// Helper function to generate a description for documents
const inferredDescription = (filename: string, summary: string): string => {
  // Try to extract the title if it's in quotes
  let title = "";
  if (summary.includes('"')) {
    title = summary.split('"')[1] || "";
  } else {
    // Fall back to the filename without extension
    title = filename.split(".")[0].replace(/[_-]/g, " ").trim();
  }

  // Try to identify document type from the summary
  let documentType = "Document";
  if (summary.includes("Report")) documentType = "Report";
  else if (summary.includes("Guide")) documentType = "Guide";
  else if (summary.includes("Presentation")) documentType = "Presentation";
  else if (summary.includes("Form")) documentType = "Form";
  else if (summary.includes("Correspondence")) documentType = "Correspondence";
  else if (summary.includes("Letter")) documentType = "Letter";
  else if (summary.includes("Manual")) documentType = "Manual";
  else if (summary.includes("Academic paper")) documentType = "Academic paper";
  else if (summary.includes("Proposal")) documentType = "Proposal";
  else if (summary.includes("Resume/CV")) documentType = "Resume/CV";
  else if (summary.includes("Meeting notes")) documentType = "Meeting notes";
  else if (summary.includes("Draft")) documentType = "Draft";
  else if (summary.includes("Financial document"))
    documentType = "Financial document";
  else if (summary.includes("Financial spreadsheet"))
    documentType = "Financial spreadsheet";
  else if (summary.includes("Financial email"))
    documentType = "Financial email";
  else if (summary.includes("Newsletter/Report"))
    documentType = "Newsletter/Report";
  else if (summary.includes("Meeting invitation"))
    documentType = "Meeting invitation";
  else if (summary.includes("Notification")) documentType = "Notification";
  else if (summary.includes("Confirmation")) documentType = "Confirmation";
  else if (summary.includes("Email with attachment"))
    documentType = "Email with attachment";
  else if (summary.includes("Forwarded email"))
    documentType = "Forwarded email";
  else if (summary.includes("Email reply")) documentType = "Email reply";
  else if (summary.includes("Email")) documentType = "Email";
  else if (summary.includes("Dataset")) documentType = "Dataset";
  else if (summary.includes("Schedule")) documentType = "Schedule";
  else if (summary.includes("List")) documentType = "List";
  else if (summary.includes("Template")) documentType = "Template";
  else if (summary.includes("Calculator")) documentType = "Calculator";
  else if (summary.includes("Spreadsheet")) documentType = "Spreadsheet";
  else if (summary.includes("Legal")) documentType = "Legal document";
  else if (summary.includes("Archive")) documentType = "Archive";
  else if (summary.includes("Video")) documentType = "Video";
  else if (summary.includes("Audio")) documentType = "Audio";
  else if (summary.includes("Executable")) documentType = "Executable";
  else if (summary.includes("Database")) documentType = "Database";
  else if (summary.includes("3D/CAD")) documentType = "3D Model";
  else if (summary.includes("Design")) documentType = "Design File";
  else if (summary.includes("Font")) documentType = "Font File";

  // Create contextual description
  if (documentType === "Report") {
    return `Analysis or findings about ${title.toLowerCase()}.`;
  } else if (documentType === "Guide") {
    return `Instructions or guidance related to ${title.toLowerCase()}.`;
  } else if (documentType === "Presentation") {
    return `Slides or presentation materials about ${title.toLowerCase()}.`;
  } else if (documentType === "Form") {
    return `Template or form for ${title.toLowerCase()}.`;
  } else if (documentType === "Correspondence") {
    return `Communication regarding ${title.toLowerCase()}.`;
  } else if (documentType === "Letter") {
    return `Written correspondence regarding ${title.toLowerCase()}.`;
  } else if (documentType === "Manual") {
    return `Instructions or guidance on how to use or understand ${title.toLowerCase()}.`;
  } else if (documentType === "Academic paper") {
    return `Scholarly work or research on the topic of ${title.toLowerCase()}.`;
  } else if (documentType === "Proposal") {
    return `Suggested plan or concept for ${title.toLowerCase()}.`;
  } else if (documentType === "Resume/CV") {
    return `Professional background and qualifications for ${title.toLowerCase()}.`;
  } else if (documentType === "Meeting notes") {
    return `Record of discussions or decisions from meetings about ${title.toLowerCase()}.`;
  } else if (documentType === "Draft") {
    return `Work-in-progress document about ${title.toLowerCase()}.`;
  } else if (documentType === "Financial document") {
    return `Financial information related to ${title.toLowerCase()}.`;
  } else if (documentType === "Financial spreadsheet") {
    return `Financial figures or calculations related to ${title.toLowerCase()}.`;
  } else if (documentType === "Dataset") {
    return `Collection of data points or information about ${title.toLowerCase()}.`;
  } else if (documentType === "Schedule") {
    return `Timeline or planning information for ${title.toLowerCase()}.`;
  } else if (documentType === "List") {
    return `Categorized items or inventory of ${title.toLowerCase()}.`;
  } else if (documentType === "Template") {
    return `Reusable format or structure for ${title.toLowerCase()}.`;
  } else if (documentType === "Calculator") {
    return `Tool for computing or calculating ${title.toLowerCase()}.`;
  } else if (documentType === "Spreadsheet") {
    return `Tabular data or information about ${title.toLowerCase()}.`;
  } else if (documentType === "Financial email") {
    return `Transaction record or financial information related to ${title.toLowerCase()}.`;
  } else if (documentType === "Newsletter/Report") {
    return `Update or periodic information about ${title.toLowerCase()}.`;
  } else if (documentType === "Meeting invitation") {
    return `Calendar invitation or scheduling information for ${title.toLowerCase()}.`;
  } else if (documentType === "Notification") {
    return `Alert or notification regarding ${title.toLowerCase()}.`;
  } else if (documentType === "Confirmation") {
    return `Verification or confirmation email about ${title.toLowerCase()}.`;
  } else if (documentType === "Email with attachment") {
    return `Email containing documents or files related to ${title.toLowerCase()}.`;
  } else if (documentType === "Forwarded email") {
    return `Message forwarded from another sender about ${title.toLowerCase()}.`;
  } else if (documentType === "Email reply") {
    return `Response to a previous message about ${title.toLowerCase()}.`;
  } else if (documentType === "Email") {
    return `Email message regarding ${title.toLowerCase()}.`;
  } else if (documentType === "Legal document") {
    return `Legal terms or agreement concerning ${title.toLowerCase()}.`;
  } else if (documentType === "Archive") {
    return `Compressed collection of files related to ${title.toLowerCase()}.`;
  } else if (documentType === "Video") {
    return `Video recording or footage of ${title.toLowerCase()}.`;
  } else if (documentType === "Audio") {
    return `Sound recording or audio file of ${title.toLowerCase()}.`;
  } else if (documentType === "Executable") {
    return `Software or program file for ${title.toLowerCase()}.`;
  } else if (documentType === "Database") {
    return `Structured data storage for ${title.toLowerCase()}.`;
  } else if (documentType === "3D Model") {
    return `Three-dimensional model or design of ${title.toLowerCase()}.`;
  } else if (documentType === "Design File") {
    return `Design project or asset for ${title.toLowerCase()}.`;
  } else if (documentType === "Font File") {
    return `Typography or font definition for ${title.toLowerCase()}.`;
  } else {
    return `File containing information about ${title.toLowerCase()}.`;
  }
};

export default function FileAnalyzer({ files }: FileAnalyzerProps) {
  const [extensionSummary, setExtensionSummary] = useState<
    FileExtensionSummary[]
  >([]);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  // Used to display the total number of files analyzed
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);

  const analyzeFiles = async (filesToAnalyze: File[]) => {
    setAnalyzing(true);

    // Create a map to track extensions
    const extensionMap = new Map<string, FileExtensionSummary>();
    let totalAnalyzedFiles = 0;
    // Variable to track individual file completion (not used in UI but helps with debugging)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let completedAnalyses = 0;

    // Process files
    const totalFiles = filesToAnalyze.length;

    try {
      // Analyze each file
      for (const file of filesToAnalyze) {
        // Use our agent infrastructure to analyze the file
        const analysisResult: AnalysisResult = await analyzeFile(file);
        const extension = analysisResult.extension.toLowerCase();

        // Update or create extension entry
        if (extensionMap.has(extension)) {
          const summary = extensionMap.get(extension)!;
          summary.count += 1;
          summary.files.push(file.name);
          summary.totalSize += file.size;

          // Create rich summary with metadata if available
          let summaryText = `${file.name}: ${analysisResult.summary}`;

          // Add extra metadata for different file types based on what's available
          if (analysisResult.metadata) {
            const meta = analysisResult.metadata;

            // Handle document type files (PDF, Word)
            if (
              [
                "pdf",
                "doc",
                "docx",
                "docm",
                "dotx",
                "dotm",
                "odt",
                "rtf",
              ].includes(extension)
            ) {
              if (meta.documentType) {
                summaryText += ` | Type: ${meta.documentType}`;
              }
              if (meta.estimatedPages) {
                summaryText += ` | ~${meta.estimatedPages} page${
                  meta.estimatedPages !== 1 ? "s" : ""
                }`;
              }
              if (meta.estimatedWordCount) {
                summaryText += ` | ~${meta.estimatedWordCount.toLocaleString()} words`;
              }
              if (meta.estimatedReadingMinutes) {
                summaryText += ` | ~${meta.estimatedReadingMinutes} min read`;
              }
              // For PDF files specifically, add topics if available
              if (
                extension === "pdf" &&
                typeof meta.topics === "string" &&
                meta.topics.trim().length > 0
              ) {
                summaryText += ` | Topics: ${meta.topics}`;
              }
              // Indicate if content was analyzed by AI
              if (extension === "pdf" && meta.contentAnalyzed) {
                summaryText += ` | AI Analyzed`;
              }
            }
            // Handle spreadsheet files
            else if (
              ["xlsx", "xls", "xlsm", "xlsb", "csv"].includes(extension)
            ) {
              if (meta.spreadsheetType) {
                summaryText += ` | Type: ${meta.spreadsheetType}`;
              }
              if (meta.estimatedRows && meta.estimatedColumns) {
                summaryText += ` | ~${meta.estimatedRows}×${meta.estimatedColumns} cells`;
              }
            }
            // Handle email files
            else if (["msg", "eml"].includes(extension)) {
              if (meta.emailType) {
                summaryText += ` | Type: ${meta.emailType}`;
              }
              if (meta.inferredSender) {
                summaryText += ` | From: ${meta.inferredSender}`;
              }
              if (meta.inferredDate) {
                summaryText += ` | Date: ${meta.inferredDate}`;
              }
            }
            // Handle image files
            else if (
              [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "bmp",
                "webp",
                "tiff",
                "tif",
                "svg",
                "ico",
              ].includes(extension)
            ) {
              if (meta.category) {
                summaryText += ` | Type: ${meta.category}`;
              }
              if (meta.dimensions) {
                summaryText += ` | ${meta.dimensions}`;
              }
              if (meta.colorMode) {
                summaryText += ` | ${meta.colorMode}`;
              }
            }
            // Handle binary and other files from default agent
            else {
              if (meta.fileType) {
                summaryText += ` | Type: ${meta.fileType}`;
              }
              if (meta.category) {
                summaryText += ` | Category: ${meta.category}`;
              }
              if (typeof meta.lastModified === "string") {
                summaryText += ` | Modified: ${
                  meta.lastModified.split(",")[0]
                }`;
              }
            }

            // Add description if available for all file types
            if (meta.description) {
              summaryText += ` | ${meta.description}`;
            }
          }

          summary.fileSummaries.push(summaryText);
        } else {
          // Format summary with metadata if available
          let summaryText = `${file.name}: ${analysisResult.summary}`;

          // Add extra metadata for different file types based on what's available
          if (analysisResult.metadata) {
            const meta = analysisResult.metadata;

            // Handle document type files (PDF, Word)
            if (
              [
                "pdf",
                "doc",
                "docx",
                "docm",
                "dotx",
                "dotm",
                "odt",
                "rtf",
              ].includes(extension)
            ) {
              if (meta.documentType) {
                summaryText += ` | Type: ${meta.documentType}`;
              }
              if (meta.estimatedPages) {
                summaryText += ` | ~${meta.estimatedPages} page${
                  meta.estimatedPages !== 1 ? "s" : ""
                }`;
              }
              if (meta.estimatedWordCount) {
                summaryText += ` | ~${meta.estimatedWordCount.toLocaleString()} words`;
              }
              if (meta.estimatedReadingMinutes) {
                summaryText += ` | ~${meta.estimatedReadingMinutes} min read`;
              }
              // For PDF files specifically, add topics if available
              if (
                extension === "pdf" &&
                typeof meta.topics === "string" &&
                meta.topics.trim().length > 0
              ) {
                summaryText += ` | Topics: ${meta.topics}`;
              }
              // Indicate if content was analyzed by AI
              if (extension === "pdf" && meta.contentAnalyzed) {
                summaryText += ` | AI Analyzed`;
              }
            }
            // Handle spreadsheet files
            else if (
              ["xlsx", "xls", "xlsm", "xlsb", "csv"].includes(extension)
            ) {
              if (meta.spreadsheetType) {
                summaryText += ` | Type: ${meta.spreadsheetType}`;
              }
              if (meta.estimatedRows && meta.estimatedColumns) {
                summaryText += ` | ~${meta.estimatedRows}×${meta.estimatedColumns} cells`;
              }
            }
            // Handle email files
            else if (["msg", "eml"].includes(extension)) {
              if (meta.emailType) {
                summaryText += ` | Type: ${meta.emailType}`;
              }
              if (meta.inferredSender) {
                summaryText += ` | From: ${meta.inferredSender}`;
              }
              if (meta.inferredDate) {
                summaryText += ` | Date: ${meta.inferredDate}`;
              }
            }
            // Handle image files
            else if (
              [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "bmp",
                "webp",
                "tiff",
                "tif",
                "svg",
                "ico",
              ].includes(extension)
            ) {
              if (meta.category) {
                summaryText += ` | Type: ${meta.category}`;
              }
              if (meta.dimensions) {
                summaryText += ` | ${meta.dimensions}`;
              }
              if (meta.colorMode) {
                summaryText += ` | ${meta.colorMode}`;
              }
            }
            // Handle binary and other files from default agent
            else {
              if (meta.fileType) {
                summaryText += ` | Type: ${meta.fileType}`;
              }
              if (meta.category) {
                summaryText += ` | Category: ${meta.category}`;
              }
              if (typeof meta.lastModified === "string") {
                summaryText += ` | Modified: ${
                  meta.lastModified.split(",")[0]
                }`;
              }
            }

            // Add description if available for all file types
            if (meta.description) {
              summaryText += ` | ${meta.description}`;
            }
          }

          extensionMap.set(extension, {
            extension,
            count: 1,
            files: [file.name],
            totalSize: file.size,
            fileSummaries: [summaryText],
          });
        }

        // Update progress
        completedAnalyses++;
        totalAnalyzedFiles++;
      }
    } catch (error) {
      console.error("Error analyzing files:", error);
    } finally {
      // Convert map to array and sort by frequency
      const summaryArray = Array.from(extensionMap.values()).sort(
        (a, b) => b.count - a.count
      );

      setExtensionSummary(summaryArray);
      setTotalFiles(totalAnalyzedFiles);
      setAnalyzing(false);
    }
  };

  // Format file size
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  // Get appropriate badge color based on file type
  const getBadgeColor = (extension: string, metadataType: string): string => {
    // Document files (PDF, Word)
    if (
      ["pdf", "doc", "docx", "docm", "dotx", "dotm", "odt", "rtf"].includes(
        extension
      )
    ) {
      if (metadataType.includes("page")) return "bg-red-50 text-red-700";
      if (metadataType.includes("words")) return "bg-red-50 text-red-700";
      if (metadataType.includes("read")) return "bg-red-50 text-red-700";
      if (metadataType.startsWith("Type:")) return "bg-red-100 text-red-800";
      if (metadataType.startsWith("Topics:")) return "bg-red-50 text-red-600";
      if (metadataType.includes("AI Analyzed"))
        return "bg-purple-100 text-purple-800 font-semibold";
    }

    // Spreadsheet files
    if (["xlsx", "xls", "xlsm", "xlsb", "csv"].includes(extension)) {
      if (metadataType.includes("cells")) return "bg-green-50 text-green-700";
      if (metadataType.startsWith("Type:"))
        return "bg-green-100 text-green-800";
    }

    // Email files
    if (["msg", "eml"].includes(extension)) {
      if (metadataType.startsWith("From:"))
        return "bg-yellow-50 text-yellow-700";
      if (metadataType.startsWith("Date:"))
        return "bg-yellow-50 text-yellow-700";
      if (metadataType.startsWith("Type:"))
        return "bg-yellow-100 text-yellow-800";
    }

    // Image files
    if (
      [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "webp",
        "tiff",
        "tif",
        "svg",
        "ico",
      ].includes(extension)
    ) {
      if (metadataType.includes("×")) return "bg-purple-50 text-purple-700";
      if (metadataType.includes("RGB") || metadataType.includes("CMYK"))
        return "bg-purple-50 text-purple-700";
      if (metadataType.startsWith("Type:"))
        return "bg-purple-100 text-purple-800";
    }

    // Archive files
    if (["zip", "rar", "7z", "tar", "gz", "bz2"].includes(extension)) {
      return "bg-orange-50 text-orange-700";
    }

    // Executable files
    if (["exe", "msi", "dll", "app", "dmg", "deb", "rpm"].includes(extension)) {
      return "bg-slate-100 text-slate-700";
    }

    // Media files
    if (
      ["mp4", "avi", "mov", "mkv", "mp3", "wav", "flac"].includes(extension)
    ) {
      return "bg-indigo-50 text-indigo-700";
    }

    // Default for other types
    if (
      metadataType.startsWith("Type:") ||
      metadataType.startsWith("Category:")
    ) {
      return "bg-blue-100 text-blue-800";
    }

    return "bg-blue-50 text-blue-700";
  };

  // Handler to start analysis
  const handleStartAnalysis = () => {
    setAnalysisComplete(false);
    setExtensionSummary([]);
    setTotalFiles(0);

    if (files.length > 0) {
      analyzeFiles(files);
      setAnalysisComplete(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">File Analysis</h2>

        {files.length > 0 && !analyzing && (
          <button
            onClick={handleStartAnalysis}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={analyzing}
          >
            Start Analysis
          </button>
        )}
      </div>

      {!analysisComplete && !analyzing && (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="text-blue-500 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
            </svg>
          </div>
          <p className="text-gray-600 text-center">
            {files.length > 0
              ? `${files.length} files ready to analyze. Click "Start Analysis" to begin.`
              : "No files available to analyze. Please upload files first."}
          </p>
        </div>
      )}

      {analyzing && (
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mr-3"></div>
          <p>Analyzing files...</p>
        </div>
      )}

      {analysisComplete && extensionSummary.length > 0 && (
        <>
          <div className="mb-4 p-3 bg-gray-50 rounded">
            <p className="text-sm">
              Total files analyzed:{" "}
              <span className="font-medium">{totalFiles}</span>
            </p>
            <p className="text-sm">
              Unique file types:{" "}
              <span className="font-medium">{extensionSummary.length}</span>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-gray-600">
                    Extension
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-600">
                    Count
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-600">
                    Total Size
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {extensionSummary.map((summary) => (
                  <tr key={summary.extension} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">
                      .{summary.extension}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{summary.count}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {formatSize(summary.totalSize)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-700 mb-2">
              File Details
            </h3>
            <div className="bg-gray-50 rounded p-3 max-h-60 overflow-y-auto">
              {extensionSummary.map((summary) => (
                <div key={`${summary.extension}-details`} className="mb-6">
                  <p className="font-medium text-sm text-gray-800 mb-1">
                    .{summary.extension} files:
                  </p>
                  <ul className="list-disc pl-5 text-xs text-gray-600">
                    {summary.fileSummaries.map((fileSummary, index) => {
                      // Split the summary at the first colon to separate filename from summary
                      const colonIndex = fileSummary.indexOf(":");
                      const filename =
                        colonIndex > 0
                          ? fileSummary.substring(0, colonIndex)
                          : "";
                      const summaryContent =
                        colonIndex > 0
                          ? fileSummary.substring(colonIndex + 1)
                          : fileSummary;

                      // Split additional metadata that uses the pipe separator
                      const metadataParts = summaryContent
                        ? summaryContent.split("|")
                        : [];
                      const mainSummary = metadataParts[0] || "";
                      const additionalInfo = metadataParts.slice(1);

                      return (
                        <li
                          key={`${summary.extension}-${index}`}
                          className="mb-3 pb-2 border-b border-gray-100"
                        >
                          <div className="font-medium text-blue-600 mb-1">
                            {filename}
                          </div>

                          {/* Format summary for all files */}
                          <div className="text-gray-700 mb-1 ml-1">
                            {mainSummary.includes('"') ? (
                              <>
                                <span className="font-semibold">
                                  {mainSummary.split('"')[1]}
                                </span>
                                <span>{mainSummary.split('"')[2] || ""}</span>
                              </>
                            ) : (
                              mainSummary
                            )}
                          </div>

                          {/* Generate description for all file types if possible */}
                          {additionalInfo.some((info) =>
                            info.trim().startsWith("Type:")
                          ) && (
                            <div className="text-gray-600 text-xs italic ml-1 mb-2 max-w-md">
                              <span className="font-medium">Description:</span>{" "}
                              {
                                // Check if this is an AI-analyzed PDF
                                additionalInfo.some((info) =>
                                  info.includes("AI Analyzed")
                                )
                                  ? // Just display the actual description
                                    additionalInfo.some((info) =>
                                      info.includes("Topics:")
                                    )
                                    ? "AI-generated summary of document content."
                                    : inferredDescription(filename, mainSummary)
                                  : // Otherwise use the inferred description
                                    inferredDescription(filename, mainSummary)
                              }
                            </div>
                          )}

                          {/* Show additional metadata in a structured way if present */}
                          {additionalInfo.length > 0 && (
                            <div className="ml-1 mt-1 flex flex-wrap gap-2">
                              {additionalInfo.map((info, i) => (
                                <span
                                  key={i}
                                  className={`inline-block px-2 py-1 rounded text-xs ${getBadgeColor(
                                    summary.extension,
                                    info.trim()
                                  )}`}
                                >
                                  {info.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
