import { FileAgent, AnalysisResult } from "./base-agent";

/**
 * Agent for text files
 */
export class TextAgent implements FileAgent {
  // List of text-based file extensions this agent can handle
  private readonly textExtensions = [
    "txt",
    "md",
    "markdown",
    "csv",
    "json",
    "xml",
    "html",
    "htm",
    "css",
    "js",
    "ts",
    "jsx",
    "tsx",
    "log",
    "yml",
    "yaml",
    "toml",
    "ini",
    "cfg",
    "conf",
  ];

  canHandle(file: File): boolean {
    // Check if it's a text file by extension or mime type
    const extension = file.name.includes(".")
      ? file.name.split(".").pop()?.toLowerCase() || ""
      : "";

    return (
      this.textExtensions.includes(extension) ||
      file.type.startsWith("text/") ||
      file.type === "application/json"
    );
  }

  async analyze(file: File): Promise<AnalysisResult> {
    const extension = file.name.includes(".")
      ? file.name.split(".").pop()?.toLowerCase() || "txt"
      : "txt";

    try {
      // Read the file as text
      const text = await file.text();

      // Count lines, words, characters
      const lines = text.split(/\r\n|\r|\n/).length;
      const words = text.split(/\s+/).filter((word) => word.length > 0).length;
      const chars = text.length;

      // Generate a brief summary (first ~100 chars)
      const previewText = text.substring(0, 100).replace(/\r\n|\r|\n/g, " ");
      const summary =
        text.length > 100
          ? `${previewText}... (${lines} lines, ${words} words, ${chars} chars)`
          : `${previewText} (${lines} lines, ${words} words, ${chars} chars)`;

      return {
        extension,
        summary,
        fileSize: file.size,
        mimeType: file.type || `text/${extension}`,
        metadata: {
          lines,
          words,
          characters: chars,
        },
      };
    } catch {
      // If we can't read as text, fall back to basic info
      return {
        extension,
        summary: `Text file (could not analyze content)`,
        fileSize: file.size,
        mimeType: file.type || `text/${extension}`,
      };
    }
  }
}
