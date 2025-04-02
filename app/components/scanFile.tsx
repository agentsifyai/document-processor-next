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

interface ScanFileProps {
  files: File[];
}

export default function ScanFile({ files }: ScanFileProps) {
  const [extensionSummary, setExtensionSummary] = useState<
    FileExtensionSummary[]
  >([]);
  const [scanning, setScanning] = useState<boolean>(false);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [scanComplete, setScanComplete] = useState<boolean>(false);

  const scanFiles = async (filesToScan: File[]) => {
    setScanning(true);

    // Create a map to track extensions
    const extensionMap = new Map<string, FileExtensionSummary>();
    let totalScannedFiles = 0;
    let completedScans = 0;

    // Process files
    const totalFiles = filesToScan.length;

    try {
      // Analyze each file
      for (const file of filesToScan) {
        // Use our agent infrastructure to analyze the file
        const analysisResult: AnalysisResult = await analyzeFile(file);
        const extension = analysisResult.extension.toLowerCase();

        // Update or create extension entry
        if (extensionMap.has(extension)) {
          const summary = extensionMap.get(extension)!;
          summary.count += 1;
          summary.files.push(file.name);
          summary.totalSize += file.size;
          summary.fileSummaries.push(`${file.name}: ${analysisResult.summary}`);
        } else {
          extensionMap.set(extension, {
            extension,
            count: 1,
            files: [file.name],
            totalSize: file.size,
            fileSummaries: [`${file.name}: ${analysisResult.summary}`],
          });
        }

        // Update progress
        completedScans++;
        totalScannedFiles++;
      }
    } catch (error) {
      console.error("Error scanning files:", error);
    } finally {
      // Convert map to array and sort by frequency
      const summaryArray = Array.from(extensionMap.values()).sort(
        (a, b) => b.count - a.count
      );

      setExtensionSummary(summaryArray);
      setTotalFiles(totalScannedFiles);
      setScanning(false);
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

  // Handler to start scan
  const handleStartScan = () => {
    setScanComplete(false);
    setExtensionSummary([]);
    setTotalFiles(0);

    if (files.length > 0) {
      scanFiles(files);
      setScanComplete(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">File Analysis</h2>

        {files.length > 0 && !scanning && (
          <button
            onClick={handleStartScan}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={scanning}
          >
            Start Scan
          </button>
        )}
      </div>

      {!scanComplete && !scanning && (
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
              ? `${files.length} files ready to scan. Click "Start Scan" to analyze.`
              : "No files available to scan. Please upload files first."}
          </p>
        </div>
      )}

      {scanning && (
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mr-3"></div>
          <p>Scanning files...</p>
        </div>
      )}

      {scanComplete && extensionSummary.length > 0 && (
        <>
          <div className="mb-4 p-3 bg-gray-50 rounded">
            <p className="text-sm">
              Total files scanned:{" "}
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
                    {summary.fileSummaries.map((fileSummary, index) => (
                      <li
                        key={`${summary.extension}-${index}`}
                        className="mb-2"
                      >
                        <div className="mb-1">{fileSummary}</div>
                      </li>
                    ))}
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
