(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_components_uploadFile_tsx_c51d9706._.js", {

"[project]/app/components/uploadFile.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>UploadFile)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jszip$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jszip/lib/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
function FileTreeItem({ fileData, allFiles, onRemove, isProcessing, removeFile, level }) {
    _s();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const isZip = fileData.file.name.toLowerCase().endsWith(".zip");
    const isFolder = fileData.file.type === 'folder' || fileData.file.name.endsWith('/');
    // Get immediate children - files that have this item as their direct parent
    const childFiles = allFiles.filter((f)=>f.parent === fileData.file.name || f.parent && f.parent === `${fileData.parent}/${fileData.file.name}`);
    // Check if we have children
    const hasChildren = childFiles.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `p-3 flex items-center ${level > 0 ? "bg-gray-50" : ""}`,
                children: [
                    level > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 flex",
                        children: Array.from({
                            length: level
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-4 flex justify-center relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-l border-gray-300 h-full absolute top-0 bottom-0"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/uploadFile.tsx",
                                    lineNumber: 63,
                                    columnNumber: 17
                                }, this)
                            }, i, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    level > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-3 h-0.5 bg-gray-300 flex-shrink-0 -ml-1.5"
                    }, void 0, false, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    hasChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setExpanded(!expanded),
                        className: "mr-1 text-gray-500 w-6 h-6 flex items-center justify-center",
                        "aria-label": expanded ? "Collapse" : "Expand",
                        disabled: isProcessing,
                        children: expanded ? "▼" : "►"
                    }, void 0, false, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    !hasChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-6"
                    }, void 0, false, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 87,
                        columnNumber: 26
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: isFolder ? "/file.svg" : isZip ? "/file.svg" : "/file.svg",
                        alt: isFolder ? "Folder" : isZip ? "Zip Archive" : "Document",
                        width: isFolder || isZip ? 18 : 16,
                        height: isFolder || isZip ? 18 : 16,
                        className: "mr-2"
                    }, void 0, false, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-sm ${isZip || isFolder ? "font-medium" : ""} ${isFolder ? "text-blue-700" : ""}`,
                        children: [
                            fileData.file.name,
                            isFolder && !fileData.file.name.endsWith('/') ? '/' : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    fileData.file.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-500 ml-2",
                        children: [
                            (fileData.file.size / 1024).toFixed(0),
                            " KB"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    isFolder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-500 ml-2",
                        children: "Folder"
                    }, void 0, false, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onRemove,
                        className: "ml-auto text-sm text-gray-500 hover:text-red-600",
                        "aria-label": "Remove file",
                        disabled: isProcessing,
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/uploadFile.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            expanded && hasChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-100",
                children: childFiles.map((childFile, childIndex)=>{
                    const index = allFiles.findIndex((f)=>f.id === childFile.id);
                    // For folders and nested elements, render recursively
                    if (childFile.file.type === 'folder' || childFile.file.name.endsWith('/')) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileTreeItem, {
                            fileData: childFile,
                            allFiles: allFiles,
                            onRemove: ()=>removeFile(index),
                            isProcessing: isProcessing,
                            removeFile: removeFile,
                            level: level + 1
                        }, `child-folder-${childIndex}`, false, {
                            fileName: "[project]/app/components/uploadFile.tsx",
                            lineNumber: 140,
                            columnNumber: 17
                        }, this);
                    }
                    // For regular files
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-1 px-3 flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0 flex",
                                children: Array.from({
                                    length: level + 1
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-4 flex justify-center relative",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-l border-gray-300 h-full absolute top-0 bottom-0"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/uploadFile.tsx",
                                            lineNumber: 165,
                                            columnNumber: 23
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/app/components/uploadFile.tsx",
                                        lineNumber: 161,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 159,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-0.5 bg-gray-300 flex-shrink-0 -ml-1.5"
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 170,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/file.svg",
                                alt: "Document",
                                width: 14,
                                height: 14,
                                className: "mr-2"
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 172,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs",
                                children: childFile.file.name
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 179,
                                columnNumber: 17
                            }, this),
                            childFile.file.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-500 ml-2",
                                children: [
                                    (childFile.file.size / 1024).toFixed(0),
                                    " KB"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 181,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>removeFile(index),
                                className: "ml-auto text-xs text-gray-500 hover:text-red-600",
                                "aria-label": "Remove file",
                                disabled: isProcessing,
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 185,
                                columnNumber: 17
                            }, this)
                        ]
                    }, `child-${childIndex}`, true, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 154,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/app/components/uploadFile.tsx",
                lineNumber: 130,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/uploadFile.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(FileTreeItem, "NZEs4N34I2vU569ODzuIjdsqMlo=");
_c = FileTreeItem;
function UploadFile() {
    _s1();
    const [uploadedFiles, setUploadedFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [extractionProgress, setExtractionProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        processing: false,
        message: ""
    });
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // This effect will clean up file URLs when component unmounts or page refreshes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UploadFile.useEffect": ()=>{
            return ({
                "UploadFile.useEffect": ()=>{
                    // Revoke all object URLs to prevent memory leaks
                    uploadedFiles.forEach({
                        "UploadFile.useEffect": (fileData)=>{
                            URL.revokeObjectURL(fileData.url);
                        }
                    }["UploadFile.useEffect"]);
                }
            })["UploadFile.useEffect"];
        }
    }["UploadFile.useEffect"], [
        uploadedFiles
    ]);
    // Removes a single file
    const removeFile = (index)=>{
        setUploadedFiles((prev)=>{
            // Revoke the URL to prevent memory leaks
            URL.revokeObjectURL(prev[index].url);
            // Remove the file from the array
            return prev.filter((_, i)=>i !== index);
        });
    };
    // Clears all files
    const clearAllFiles = ()=>{
        // Revoke all URLs to prevent memory leaks
        uploadedFiles.forEach((fileData)=>{
            URL.revokeObjectURL(fileData.url);
        });
        setUploadedFiles([]);
    };
    // Generate a unique ID for files
    const generateFileId = (file, parent)=>{
        return `file-${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
    };
    // Processes files, extracting zip files as needed
    const processFiles = async (files)=>{
        setExtractionProgress({
            processing: true,
            message: "Processing files..."
        });
        const tempFiles = [];
        for (const file of files){
            // Check if it's a zip file
            if (file.name.toLowerCase().endsWith(".zip")) {
                await extractZipFile(file, tempFiles);
            } else {
                // Regular file
                tempFiles.push({
                    id: generateFileId(file),
                    file,
                    url: URL.createObjectURL(file)
                });
            }
        }
        setExtractionProgress({
            processing: false,
            message: ""
        });
        setUploadedFiles((prev)=>[
                ...prev,
                ...tempFiles
            ]);
    };
    // Recursive function to extract zip files, including nested ones
    const extractZipFile = async (zipFile, tempFiles, parentName)=>{
        try {
            setExtractionProgress({
                processing: true,
                message: `Extracting ${zipFile.name}${parentName ? ` from ${parentName}` : ""}...`
            });
            // Read the zip file
            const zipData = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jszip$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].loadAsync(await zipFile.arrayBuffer());
            // Track folders to create hierarchical structure
            const folders = {};
            // First pass: identify all directories
            Object.keys(zipData.files).forEach((filename)=>{
                const parts = filename.split("/");
                // Remove the last part (file or empty string for directories)
                parts.pop();
                // Register all parent folders
                let path = "";
                for (const part of parts){
                    path = path ? `${path}/${part}` : part;
                    folders[path] = true;
                }
            });
            // Add the zip file itself so we can display it as the root
            tempFiles.push({
                id: generateFileId(zipFile, parentName),
                file: zipFile,
                url: URL.createObjectURL(zipFile),
                isExtracted: false,
                parent: parentName
            });
            // Create folder entries for all directories
            for (const folderPath of Object.keys(folders)){
                // Get the name of this folder (last part of the path)
                const pathParts = folderPath.split('/');
                const folderName = pathParts[pathParts.length - 1];
                // Determine the parent path
                const parentPath = pathParts.length > 1 ? `${zipFile.name}/${pathParts.slice(0, -1).join('/')}` : zipFile.name;
                // Create a File object for this folder
                const folderFile = new File([], folderName, {
                    type: 'folder'
                });
                // Add the folder to tempFiles
                tempFiles.push({
                    id: generateFileId(folderFile, `${parentPath}/${folderName}`),
                    file: folderFile,
                    url: '',
                    isExtracted: true,
                    parent: parentPath
                });
            }
            // Process each file in the zip
            for (const [filename, zipEntry] of Object.entries(zipData.files)){
                // Skip directories
                if (zipEntry.dir) continue;
                const pathParts = filename.split("/");
                const actualFileName = pathParts.pop() || filename;
                const folderPath = pathParts.join("/");
                // Get the file data
                const content = await zipEntry.async("blob");
                // Create a File object from the extracted content
                const extractedFile = new File([
                    content
                ], actualFileName, {
                    type: content.type || "application/octet-stream"
                });
                // Full path for displaying in UI
                const displayPath = folderPath ? `${zipFile.name}/${folderPath}` : zipFile.name;
                // Check if this is a nested zip file
                if (actualFileName.toLowerCase().endsWith(".zip")) {
                    // Process nested zip file
                    await extractZipFile(extractedFile, tempFiles, displayPath);
                } else {
                    // Regular file from zip
                    tempFiles.push({
                        id: generateFileId(extractedFile, displayPath),
                        file: extractedFile,
                        url: URL.createObjectURL(extractedFile),
                        isExtracted: true,
                        parent: displayPath
                    });
                }
            }
        } catch (error) {
            console.error("Error extracting zip file:", error);
            setExtractionProgress({
                processing: false,
                message: `Error extracting ${zipFile.name}: ${error instanceof Error ? error.message : String(error)}`
            });
            // Add the zip file itself if extraction fails
            tempFiles.push({
                id: generateFileId(zipFile),
                file: zipFile,
                url: URL.createObjectURL(zipFile)
            });
        }
    };
    const handleFileChange = async (e)=>{
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            await processFiles(selectedFiles);
        }
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
    };
    const handleDrop = async (e)=>{
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            await processFiles(droppedFiles);
        }
    };
    const handleClick = ()=>{
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${!extractionProgress.processing ? "cursor-pointer hover:bg-gray-50 transition-colors" : ""}`,
                onDragOver: !extractionProgress.processing ? handleDragOver : (e)=>e.preventDefault(),
                onDrop: !extractionProgress.processing ? handleDrop : (e)=>e.preventDefault(),
                onClick: !extractionProgress.processing ? handleClick : undefined,
                children: [
                    extractionProgress.processing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-pulse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-12 w-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto mb-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 440,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-medium text-gray-700",
                                children: extractionProgress.message
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 441,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mt-1",
                                children: "Please wait while we process your files..."
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 444,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 439,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/file.svg",
                                alt: "Upload",
                                width: 48,
                                height: 48,
                                className: "mx-auto mb-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 450,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-medium text-gray-700",
                                children: "Upload Documents"
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 457,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mt-1",
                                children: "Drag & drop files here or click to browse"
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 460,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 mt-2",
                                children: "Zip files will be automatically extracted (including nested zip files)"
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 463,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "file",
                        ref: fileInputRef,
                        onChange: handleFileChange,
                        className: "hidden",
                        multiple: true,
                        accept: ".pdf,.doc,.docx,.txt,.zip",
                        disabled: extractionProgress.processing
                    }, void 0, false, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 469,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/uploadFile.tsx",
                lineNumber: 420,
                columnNumber: 7
            }, this),
            uploadedFiles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-md font-medium text-gray-700",
                                children: [
                                    "Uploaded Documents (",
                                    uploadedFiles.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 483,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: clearAllFiles,
                                className: "text-sm text-red-600 hover:text-red-800",
                                disabled: extractionProgress.processing,
                                children: "Clear All"
                            }, void 0, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 486,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 482,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border rounded-lg divide-y",
                        children: uploadedFiles.filter((f)=>!f.parent).map((fileData, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileTreeItem, {
                                fileData: fileData,
                                allFiles: uploadedFiles,
                                onRemove: ()=>removeFile(index),
                                isProcessing: extractionProgress.processing,
                                removeFile: removeFile,
                                level: 0
                            }, `file-${index}`, false, {
                                fileName: "[project]/app/components/uploadFile.tsx",
                                lineNumber: 501,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/uploadFile.tsx",
                        lineNumber: 496,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/uploadFile.tsx",
                lineNumber: 481,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/uploadFile.tsx",
        lineNumber: 419,
        columnNumber: 5
    }, this);
}
_s1(UploadFile, "AqG+nDQAGHqXz6OcXmipygaedK4=");
_c1 = UploadFile;
var _c, _c1;
__turbopack_context__.k.register(_c, "FileTreeItem");
__turbopack_context__.k.register(_c1, "UploadFile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_components_uploadFile_tsx_c51d9706._.js.map