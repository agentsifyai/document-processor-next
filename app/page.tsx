"use client";

import { useState } from "react";
import UploadFile from "./components/uploadFile";
import FileAnalyzer from "./components/fileAnalyzer";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Document Processor</h1>
      
      <div className="grid grid-cols-1 gap-8 md:gap-12">
        <UploadFile onFilesChange={setUploadedFiles} />
        
        {uploadedFiles.length > 0 && (
          <FileAnalyzer files={uploadedFiles} />
        )}
      </div>
    </div>
  );
}
