"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import JSZip from "jszip";

// Type for our file data that includes the URL
interface TempFileData {
  id: string;
  file: File;
  url: string;
  isExtracted?: boolean;
  parent?: string; // To track nested files
  fullPath?: string; // Store the full file path
}

// Type for tracking zip extraction progress
interface ExtractionProgress {
  processing: boolean;
  message: string;
}

// Component to display a file in the tree
interface FileTreeItemProps {
  fileData: TempFileData;
  allFiles: TempFileData[];
  onRemove: () => void;
  isProcessing: boolean;
  removeFile: (index: number) => void;
  level: number;
}

function FileTreeItem({
  fileData,
  allFiles,
  onRemove,
  isProcessing,
  removeFile,
  level,
}: FileTreeItemProps) {
  const [expanded, setExpanded] = useState(true);
  const isZip = fileData.file.name.toLowerCase().endsWith(".zip");
  const isFolder =
    fileData.file.type === "folder" || fileData.file.name.endsWith("/");

  // Get immediate children - files that have this item as their direct parent
  const childFiles = allFiles.filter(
    (f) =>
      f.parent === fileData.file.name ||
      // Also include files where this folder is their direct parent (with full path)
      (f.parent && f.parent === `${fileData.parent}/${fileData.file.name}`)
  );

  // Check if we have children
  const hasChildren = childFiles.length > 0;

  return (
    <div>
      <div className={`p-3 flex items-center ${level > 0 ? "bg-gray-50" : ""}`}>
        {/* Indentation with vertical lines for better visual hierarchy */}
        {level > 0 && (
          <div className="flex-shrink-0 flex">
            {Array.from({ length: level }).map((_, i) => (
              <div key={i} className="w-4 flex justify-center relative">
                <div className="border-l border-gray-300 h-full absolute top-0 bottom-0"></div>
              </div>
            ))}
          </div>
        )}

        {/* Branch line to the current item */}
        {level > 0 && (
          <div className="w-3 h-0.5 bg-gray-300 flex-shrink-0 -ml-1.5"></div>
        )}

        {/* Expand/collapse button for folders or zip files with content */}
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mr-1 text-gray-500 w-6 h-6 flex items-center justify-center"
            aria-label={expanded ? "Collapse" : "Expand"}
            disabled={isProcessing}
          >
            {expanded ? "▼" : "►"}
          </button>
        )}

        {/* Spacer if no expand button */}
        {!hasChildren && <div className="w-6"></div>}

        {/* File icon - different for folders and zips */}
        <Image
          src={isFolder ? "/file.svg" : isZip ? "/file.svg" : "/file.svg"}
          alt={isFolder ? "Folder" : isZip ? "Zip Archive" : "Document"}
          width={isFolder || isZip ? 18 : 16}
          height={isFolder || isZip ? 18 : 16}
          className="mr-2"
        />

        {/* File name */}
        <span
          className={`text-sm ${isZip || isFolder ? "font-medium" : ""} ${
            isFolder ? "text-blue-700" : ""
          }`}
        >
          {fileData.file.name}
          {isFolder && !fileData.file.name.endsWith("/") ? "/" : ""}
        </span>

        {/* File size - only for real files */}
        {fileData.file.size > 0 && (
          <span className="text-xs text-gray-500 ml-2">
            {(fileData.file.size / 1024).toFixed(0)} KB
          </span>
        )}

        {/* Show indicator for folders */}
        {isFolder && <span className="text-xs text-gray-500 ml-2">Folder</span>}

        {/* Display full file path on hover */}
        {fileData.fullPath && (
          <span className="text-xs text-gray-500 ml-2 hidden group-hover:block">
            {fileData.fullPath}
          </span>
        )}

        {/* Remove button */}
        <button
          onClick={onRemove}
          className="ml-auto text-sm text-gray-500 hover:text-red-600"
          aria-label="Remove file"
          disabled={isProcessing}
        >
          ✕
        </button>
      </div>

      {/* Show child files when expanded */}
      {expanded && hasChildren && (
        <div className="border-t border-gray-100">
          {/* Render all child items recursively */}
          {childFiles.map((childFile, childIndex) => {
            const index = allFiles.findIndex((f) => f.id === childFile.id);

            // For folders and nested elements, render recursively
            if (
              childFile.file.type === "folder" ||
              childFile.file.name.endsWith("/")
            ) {
              return (
                <FileTreeItem
                  key={`child-folder-${childIndex}`}
                  fileData={childFile}
                  allFiles={allFiles}
                  onRemove={() => removeFile(index)}
                  isProcessing={isProcessing}
                  removeFile={removeFile}
                  level={level + 1}
                />
              );
            }

            // For regular files
            return (
              <div
                key={`child-${childIndex}`}
                className="py-1 px-3 flex items-center"
              >
                {/* Indentation with vertical lines */}
                <div className="flex-shrink-0 flex">
                  {Array.from({ length: level + 1 }).map((_, i) => (
                    <div key={i} className="w-4 flex justify-center relative">
                      <div className="border-l border-gray-300 h-full absolute top-0 bottom-0"></div>
                    </div>
                  ))}
                </div>
                {/* Branch line to the current item */}
                <div className="w-3 h-0.5 bg-gray-300 flex-shrink-0 -ml-1.5"></div>

                <Image
                  src="/file.svg"
                  alt="Document"
                  width={14}
                  height={14}
                  className="mr-2"
                />
                <span className="text-xs">{childFile.file.name}</span>
                {childFile.file.size > 0 && (
                  <span className="text-xs text-gray-500 ml-2">
                    {(childFile.file.size / 1024).toFixed(0)} KB
                  </span>
                )}
                <button
                  onClick={() => removeFile(index)}
                  className="ml-auto text-xs text-gray-500 hover:text-red-600"
                  aria-label="Remove file"
                  disabled={isProcessing}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface UploadFileProps {
  onFilesChange?: (files: File[]) => void;
}

export default function UploadFile({ onFilesChange }: UploadFileProps = {}) {
  const [uploadedFiles, setUploadedFiles] = useState<TempFileData[]>([]);
  const [extractionProgress, setExtractionProgress] =
    useState<ExtractionProgress>({
      processing: false,
      message: "",
    });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // This effect will clean up file URLs when component unmounts or page refreshes
  useEffect(() => {
    return () => {
      // Revoke all object URLs to prevent memory leaks
      uploadedFiles.forEach((fileData) => {
        URL.revokeObjectURL(fileData.url);
      });
    };
  }, [uploadedFiles]);
  
  // Notify parent component when files change
  useEffect(() => {
    if (onFilesChange) {
      const allFiles = uploadedFiles.map(fileData => fileData.file);
      onFilesChange(allFiles);
    }
  }, [uploadedFiles, onFilesChange]);

  // Log all file paths whenever uploadedFiles changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      logAllFilePaths();
    }
  }, [uploadedFiles]);

  // Function to log all file paths to console
  const logAllFilePaths = () => {
    console.log("=== ALL AVAILABLE FILES AND PATHS ===");

    // Create an array to store file paths with their details
    const filePaths = uploadedFiles.map((file) => {
      const path = getFullFilePath(file);
      return {
        name: file.file.name,
        path: path,
        size:
          file.file.size > 0
            ? `${(file.file.size / 1024).toFixed(0)} KB`
            : "N/A",
        type:
          file.file.type ||
          (file.file.name.endsWith("/") || file.file.type === "folder"
            ? "folder"
            : "unknown"),
      };
    });

    // Log the complete file listing
    console.table(filePaths);

    // Also create a simple path-only listing
    const simplePaths = filePaths.map((f) => f.path);
    console.log("All file paths (simplified):", simplePaths);

    return filePaths;
  };

  // Helper function to get the full path for a file
  const getFullFilePath = (fileData: TempFileData): string => {
    // If we've already calculated the full path, return it
    if (fileData.fullPath) return fileData.fullPath;

    // If no parent, this is a root file
    if (!fileData.parent) return fileData.file.name;

    // Otherwise, build the path from parent and filename
    return `${fileData.parent}/${fileData.file.name}`;
  };

  // Removes a single file
  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index].url);
      // Remove the file from the array
      return prev.filter((_, i) => i !== index);
    });
  };

  // Clears all files
  const clearAllFiles = () => {
    // Revoke all URLs to prevent memory leaks
    uploadedFiles.forEach((fileData) => {
      URL.revokeObjectURL(fileData.url);
    });
    setUploadedFiles([]);
  };

  // Generate a unique ID for files
  const generateFileId = (file: File): string => {
    return `file-${Date.now()}-${Math.random().toString(36).slice(2)}-${
      file.name
    }`;
  };

  // Processes files, extracting zip files as needed
  const processFiles = async (files: File[]) => {
    setExtractionProgress({ processing: true, message: "Processing files..." });

    const tempFiles: TempFileData[] = [];

    for (const file of files) {
      // Check if it's a zip file
      if (file.name.toLowerCase().endsWith(".zip")) {
        await extractZipFile(file, tempFiles);
      } else {
        // Regular file
        tempFiles.push({
          id: generateFileId(file),
          file,
          url: URL.createObjectURL(file),
          fullPath: file.name,
        });
      }
    }

    setExtractionProgress({ processing: false, message: "" });
    setUploadedFiles((prev) => [...prev, ...tempFiles]);
  };

  // Recursive function to extract zip files, including nested ones
  const extractZipFile = async (
    zipFile: File,
    tempFiles: TempFileData[],
    parentName?: string
  ) => {
    try {
      setExtractionProgress({
        processing: true,
        message: `Extracting ${zipFile.name}${
          parentName ? ` from ${parentName}` : ""
        }...`,
      });

      // Read the zip file
      const zipData = await JSZip.loadAsync(await zipFile.arrayBuffer());

      // Track folders to create hierarchical structure
      const folders: Record<string, boolean> = {};

      // First pass: identify all directories
      Object.keys(zipData.files).forEach((filename) => {
        const parts = filename.split("/");
        // Remove the last part (file or empty string for directories)
        parts.pop();

        // Register all parent folders
        let path = "";
        for (const part of parts) {
          path = path ? `${path}/${part}` : part;
          folders[path] = true;
        }
      });

      // Calculate the full path for the zip file
      const zipFullPath = parentName
        ? `${parentName}/${zipFile.name}`
        : zipFile.name;

      // Add the zip file itself so we can display it as the root
      tempFiles.push({
        id: generateFileId(zipFile),
        file: zipFile,
        url: URL.createObjectURL(zipFile),
        isExtracted: false,
        parent: parentName,
        fullPath: zipFullPath,
      });

      // Create folder entries for all directories
      for (const folderPath of Object.keys(folders)) {
        // Get the name of this folder (last part of the path)
        const pathParts = folderPath.split("/");
        const folderName = pathParts[pathParts.length - 1];

        // Determine the parent path
        const parentPath =
          pathParts.length > 1
            ? `${zipFile.name}/${pathParts.slice(0, -1).join("/")}`
            : zipFile.name;

        // Create a File object for this folder
        const folderFile = new File([], folderName, { type: "folder" });

        // Calculate full path for the folder
        const folderFullPath = `${zipFullPath}/${folderPath}`;

        // Add the folder to tempFiles
        tempFiles.push({
          id: generateFileId(folderFile),
          file: folderFile,
          url: "",
          isExtracted: true,
          parent: parentPath,
          fullPath: folderFullPath,
        });
      }

      // Process each file in the zip
      for (const [filename, zipEntry] of Object.entries(zipData.files)) {
        // Skip directories
        if (zipEntry.dir) continue;

        const pathParts = filename.split("/");
        const actualFileName = pathParts.pop() || filename;
        const folderPath = pathParts.join("/");

        // Get the file data
        const content = await zipEntry.async("blob");

        // Create a File object from the extracted content
        const extractedFile = new File([content], actualFileName, {
          type: content.type || "application/octet-stream",
        });

        // Full path for displaying in UI
        const displayPath = folderPath
          ? `${zipFile.name}/${folderPath}`
          : zipFile.name;

        // Full file path including all parent zips
        const fullFilePath = `${zipFullPath}/${filename}`;

        // Check if this is a nested zip file
        if (actualFileName.toLowerCase().endsWith(".zip")) {
          // Process nested zip file
          await extractZipFile(extractedFile, tempFiles, displayPath);
        } else {
          // Regular file from zip
          tempFiles.push({
            id: generateFileId(extractedFile),
            file: extractedFile,
            url: URL.createObjectURL(extractedFile),
            isExtracted: true,
            parent: displayPath,
            fullPath: fullFilePath,
          });
        }
      }
    } catch (error) {
      console.error("Error extracting zip file:", error);
      setExtractionProgress({
        processing: false,
        message: `Error extracting ${zipFile.name}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });

      // Add the zip file itself if extraction fails
      tempFiles.push({
        id: generateFileId(zipFile),
        file: zipFile,
        url: URL.createObjectURL(zipFile),
        fullPath: parentName ? `${parentName}/${zipFile.name}` : zipFile.name,
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      await processFiles(selectedFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      await processFiles(droppedFiles);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Add a function to manually log all files to console
  const logFileStructure = () => {
    const fileStructure = logAllFilePaths();
    alert(
      `Logged ${fileStructure.length} files to console. Press F12 to view details.`
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div
        className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${
          !extractionProgress.processing
            ? "cursor-pointer hover:bg-gray-50 transition-colors"
            : ""
        }`}
        onDragOver={
          !extractionProgress.processing
            ? handleDragOver
            : (e) => e.preventDefault()
        }
        onDrop={
          !extractionProgress.processing
            ? handleDrop
            : (e) => e.preventDefault()
        }
        onClick={!extractionProgress.processing ? handleClick : undefined}
      >
        {extractionProgress.processing ? (
          <div className="animate-pulse">
            <div className="h-12 w-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-700">
              {extractionProgress.message}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Please wait while we process your files...
            </p>
          </div>
        ) : (
          <>
            <Image
              src="/file.svg"
              alt="Upload"
              width={48}
              height={48}
              className="mx-auto mb-4"
            />
            <h3 className="text-lg font-medium text-gray-700">
              Upload Documents
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Drag & drop files here or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Zip files will be automatically extracted (including nested zip
              files)
            </p>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept=".pdf,.doc,.docx,.txt,.zip"
          disabled={extractionProgress.processing}
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-md font-medium text-gray-700">
              Uploaded Documents ({uploadedFiles.length})
            </h4>
            <div className="flex space-x-3">
              <button
                onClick={logFileStructure}
                className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-600 rounded"
                disabled={extractionProgress.processing}
              >
                Log Files to Console
              </button>
              <button
                onClick={clearAllFiles}
                className="text-sm text-red-600 hover:text-red-800"
                disabled={extractionProgress.processing}
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Display files in a hierarchical structure */}
          <div className="border rounded-lg divide-y">
            {/* First show root files (no parent) */}
            {uploadedFiles
              .filter((f) => !f.parent)
              .map((fileData, index) => (
                <FileTreeItem
                  key={`file-${index}`}
                  fileData={fileData}
                  allFiles={uploadedFiles}
                  onRemove={() => removeFile(index)}
                  isProcessing={extractionProgress.processing}
                  removeFile={removeFile}
                  level={0}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
