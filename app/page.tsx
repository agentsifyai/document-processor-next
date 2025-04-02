"use client";

import { useState, useEffect } from "react";
import UploadFile from "./components/uploadFile";
import FileAnalyzer from "./components/fileAnalyzer";
import ErrorBoundary from "./components/errorBoundary";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [hasOpenAiKey, setHasOpenAiKey] = useState<boolean>(false);

  useEffect(() => {
    // Check if OpenAI API key is configured
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    setHasOpenAiKey(!!apiKey && apiKey.length > 10);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Document Processor</h1>
      
      {!hasOpenAiKey && (
        <div className="max-w-2xl mx-auto mb-6 bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-amber-800 mb-2">
            <span className="mr-2">⚠️</span>
            AI-powered PDF analysis not available
          </h2>
          <p className="text-amber-700 text-sm">
            To enable AI-powered document summaries, please add your OpenAI API key to a <code className="bg-amber-100 px-1 py-0.5 rounded">.env.local</code> file in the project root. See the README for setup instructions.
          </p>
        </div>
      )}
      
      <ErrorBoundary>
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          <UploadFile onFilesChange={setUploadedFiles} />
          
          {uploadedFiles.length > 0 && (
            <FileAnalyzer files={uploadedFiles} />
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
}