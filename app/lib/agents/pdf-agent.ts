import type { FileAgent, AnalysisResult } from "./base-agent";
import OpenAI from "openai";

/**
 * Agent for PDF files with enhanced AI capabilities
 * Uses OpenAI to generate detailed summaries from PDF content
 */
export class PdfAgent implements FileAgent {
  private openai: OpenAI | null = null;

  constructor() {
    // Initialize OpenAI if API key is available
    if (typeof window !== "undefined") {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";
      if (apiKey) {
        this.openai = new OpenAI({
          apiKey,
          dangerouslyAllowBrowser: true, // Allow browser usage (be careful with this in production)
        });
      }
    }
  }

  canHandle(file: File): boolean {
    // Check if it's a PDF file by extension or mime type
    const extension = file.name.includes(".")
      ? file.name.split(".").pop()?.toLowerCase() || ""
      : "";

    return extension === "pdf" || file.type === "application/pdf";
  }

  /**
   * Extract basic information from a PDF file
   * This implementation doesn't rely on PDF.js due to worker loading issues
   */
  private async extractPdfInfo(file: File): Promise<string> {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return "PDF analysis only available in browser environment.";
    }

    try {
      // Basic approach - read the file header to verify it's a PDF
      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer).subarray(0, 8);
      const isPdf = String.fromCharCode(...data).startsWith("%PDF");

      if (isPdf) {
        // Estimate page count based on file size (very rough estimate)
        const sizeInKB = file.size / 1024;
        const estimatedPages = Math.max(1, Math.ceil(sizeInKB / 100));

        // Extract potential title from filename
        const baseFileName = file.name.replace(/\.pdf$/i, "");
        const inferredTitle = baseFileName
          .replace(/[_-]/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        const metadata =
          `PDF document titled "${inferredTitle}" with approximately ${estimatedPages} pages. ` +
          `Size: ${
            sizeInKB >= 1024
              ? (sizeInKB / 1024).toFixed(2) + " MB"
              : sizeInKB.toFixed(2) + " KB"
          }. ` +
          `Filename: ${file.name}`;

        return metadata;
      } else {
        return `Could not verify this as a valid PDF file: ${file.name}`;
      }
    } catch (error) {
      console.error("Error analyzing PDF:", error);
      return `Unable to analyze this PDF file: ${file.name}`;
    }
  }

  /**
   * Parse OpenAI's response into a structured format
   */
  private parseAiResponse(
    content: string,
    fileName: string,
    defaultResponse: { summary: string; topics: string[]; docType: string }
  ): { summary: string; topics: string[]; docType: string } {
    let parsedResponse;

    try {
      // Try to parse as JSON first
      parsedResponse = JSON.parse(content);
    } catch (e) {
      // If parsing fails, try to extract structured data from text
      console.error("Failed to parse OpenAI response as JSON:", e);

      // Simple extraction if the response isn't valid JSON
      const summaryMatch = content.match(/summary["\s:]+([^"]+)/i);
      const topicsMatch = content.match(/topics["\s:]+([^"]+)/i);
      const typeMatch =
        content.match(/document_type["\s:]+([^"]+)/i) ||
        content.match(/document type["\s:]+([^"]+)/i);

      parsedResponse = {
        summary: summaryMatch
          ? summaryMatch[1].trim()
          : defaultResponse.summary,
        topics: topicsMatch ? topicsMatch[1].trim() : "",
        document_type: typeMatch
          ? typeMatch[1].trim()
          : defaultResponse.docType,
      };
    }

    // Handle various possible response formats
    const summary = parsedResponse.summary || defaultResponse.summary;

    // Handle topics field - could be string or array
    let topics: string[] = [];
    if (Array.isArray(parsedResponse.topics)) {
      topics = parsedResponse.topics;
    } else if (typeof parsedResponse.topics === "string") {
      topics = parsedResponse.topics.split(",").map((t: string) => t.trim());
    } else {
      topics = defaultResponse.topics;
    }

    // Get document type
    const docType =
      parsedResponse.document_type ||
      parsedResponse.documentType ||
      parsedResponse.docType ||
      defaultResponse.docType;

    return {
      summary,
      topics,
      docType,
    };
  }

  /**
   * Generate an AI-powered summary using OpenAI
   */
  private async generateAiSummary(
    pdfInfo: string,
    fileName: string
  ): Promise<{ summary: string; topics: string[]; docType: string }> {
    // Default response if AI is not available
    const defaultResponse = {
      summary: `This appears to be a PDF document named "${fileName}".`,
      topics: ["document"],
      docType: "Document",
    };

    // If OpenAI is not initialized or there's no info, return default
    if (!this.openai || !pdfInfo || pdfInfo.trim().length < 10) {
      return defaultResponse;
    }

    try {
      // Use the model specified in env vars or default to gpt-3.5-turbo
      const model = process.env.NEXT_PUBLIC_OPENAI_MODEL || "gpt-3.5-turbo";

      // Prepare messages for the API call - with the correct types
      const messages = [
        {
          role: "system" as const,
          content:
            "You are a document analysis expert. Based on the PDF filename and metadata, make an educated guess about the document content. Return your analysis as a JSON object with fields for summary, topics, and document_type.",
        },
        {
          role: "user" as const,
          content: `Based on this PDF file information, provide your best guess analysis in JSON format with these fields:
          1. "summary": A concise but detailed guess about the content (3-5 sentences)
          2. "topics": Likely main topics or keywords (comma-separated)
          3. "document_type": Likely document category (Report, Article, Manual, Academic Paper, etc.)
          
          PDF information: ${pdfInfo}
          
          Remember to format your response as valid JSON with the fields: summary, topics, and document_type.`,
        },
      ];

      // Try with JSON response format first
      try {
        const response = await this.openai.chat.completions.create({
          model,
          messages,
          temperature: 0.3,
          max_tokens: 500,
          response_format: { type: "json_object" },
        });

        // Parse the JSON response
        const content = response.choices[0]?.message?.content || "{}";
        return this.parseAiResponse(content, fileName, defaultResponse);
      } catch (error) {
        // If JSON format fails (e.g., with older models), try without response_format
        console.warn(
          "Error with JSON response format, trying without it:",
          error
        );
        try {
          const fallbackResponse = await this.openai.chat.completions.create({
            model,
            messages,
            temperature: 0.3,
            max_tokens: 500,
          });

          const content = fallbackResponse.choices[0]?.message?.content || "{}";
          return this.parseAiResponse(content, fileName, defaultResponse);
        } catch (fallbackError) {
          console.error("All OpenAI attempts failed:", fallbackError);
          return defaultResponse;
        }
      }
    } catch (error) {
      console.error("Error generating AI summary:", error);
      return defaultResponse;
    }
  }

  async analyze(file: File): Promise<AnalysisResult> {
    // Start with basic file info
    const fileName = file.name;
    const fileSize = file.size;

    // Calculate the size in KB/MB for the summary
    const sizeInKB = fileSize / 1024;
    const sizeDescription =
      sizeInKB >= 1024
        ? `${(sizeInKB / 1024).toFixed(2)} MB`
        : `${sizeInKB.toFixed(2)} KB`;

    // Check if we're in the browser environment
    if (typeof window === "undefined") {
      // Server-side rendering - return basic metadata only
      return {
        extension: "pdf",
        summary: `"${fileName}" - PDF Document (${sizeDescription})`,
        fileSize,
        mimeType: "application/pdf",
        metadata: {
          sizeDescription,
          documentType: "Document",
          analyzed: false,
        },
      };
    }

    // Client-side rendering - extract basic info and generate AI summary if possible
    const aiSummary = {
      summary: "",
      topics: [] as string[],
      docType: "Document",
    };

    let pdfInfo = "";
    const pageCount = Math.max(1, Math.ceil(sizeInKB / 100)); // Rough estimate

    try {
      // Extract basic information from the PDF (no text content)
      pdfInfo = await this.extractPdfInfo(file);
      console.log(pdfInfo);
    } catch (error) {
      console.error("Error processing PDF:", error);
    }

    // Extract potential title from filename as fallback
    const baseFileName = fileName.replace(/\.pdf$/i, "");
    const inferredTitle = baseFileName
      .replace(/[_-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    // Use AI-determined document type or fall back to inference
    let documentType = aiSummary.docType || "Document";

    // If AI failed, try to infer document type from filename
    if (documentType === "Document") {
      if (/report|analysis|study|survey|review/i.test(baseFileName)) {
        documentType = "Report";
      } else if (
        /manual|guide|instruction|tutorial|how[\s-]to/i.test(baseFileName)
      ) {
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
    }

    // Use AI summary or generate a simple description based on the title and type
    const description =
      aiSummary.summary ||
      this.generateFallbackDescription(inferredTitle, documentType);

    // Use AI topics if available
    const topicTags =
      aiSummary.topics.length > 0 ? aiSummary.topics.join(", ") : "";

    // Build a meaningful summary
    const summary = `"${inferredTitle}" - ${documentType} (approx. ${pageCount} page${
      pageCount !== 1 ? "s" : ""
    }, ${sizeDescription})`;

    return {
      extension: "pdf",
      summary,
      fileSize,
      mimeType: "application/pdf",
      metadata: {
        estimatedPages: pageCount,
        sizeDescription,
        inferredTitle,
        documentType,
        description,
        topics: topicTags,
        contentAnalyzed: false, // We're not doing full text extraction anymore
        analyzed: true,
      },
    };
  }

  /**
   * Generate a fallback description if AI analysis is not available
   */
  private generateFallbackDescription(
    inferredTitle: string,
    documentType: string
  ): string {
    if (documentType === "Report") {
      return `Analysis or findings about ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Guide") {
      return `Instructions or guidance related to ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Presentation") {
      return `Slides or presentation materials about ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Form") {
      return `Template or form for ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Correspondence") {
      return `Communication regarding ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Financial document") {
      return `Financial information related to ${inferredTitle.toLowerCase()}.`;
    } else if (documentType === "Legal document") {
      return `Legal terms or agreement concerning ${inferredTitle.toLowerCase()}.`;
    } else {
      return `Document containing information about ${inferredTitle.toLowerCase()}.`;
    }
  }
}
