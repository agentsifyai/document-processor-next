# Document Processor

A Next.js application for uploading, analyzing, and extracting information from documents with AI-powered insights.

## Features

- Upload files via drag-and-drop or file browser
- Extract and navigate zip files, including nested archives
- AI-powered document analysis using OpenAI's API
- Support for multiple file types:
  - PDF documents with text extraction and AI summaries
  - Word documents
  - Excel spreadsheets
  - Email files
  - Image files
  - And many other formats
- Hierarchical file visualization
- Detailed metadata extraction and presentation

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone <repository-url>
cd document-processor-next
npm install
```

### Configure OpenAI API

For AI-powered PDF analysis, you need to set up an OpenAI API key:

1. Create a `.env.local` file in the project root
2. Add your OpenAI API key:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   ```

> **Note:** Using environment variables with the `NEXT_PUBLIC_` prefix exposes them to the browser. For production deployments, consider implementing a secure backend API endpoint for OpenAI API calls.
>
> **Important:** PDF processing only occurs on the client-side for compatibility with Next.js. The OpenAI API is called directly from the browser, which is suitable for development but should be replaced with a secure server-side implementation for production use.
>
> **Note about PDF Processing:** The application previously used PDF.js for text extraction, but due to compatibility issues with Next.js + Turbopack, we've switched to a metadata-based approach that doesn't require PDF.js. This still allows for AI-powered analysis based on file metadata.

### Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Components

### Upload Component

- Drag-and-drop interface for file uploads
- Support for extracting zip files recursively
- Hierarchical file tree display

### File Analysis

- Specialized agents for different file types
- PDF agent with AI-powered content summarization
- Rich metadata extraction and display
- Topic identification for documents

## Customization

### Adding New File Type Agents

1. Create a new agent in `app/lib/agents/`
2. Implement the `FileAgent` interface
3. Register the agent in `app/lib/agents/index.ts`

Example:

```typescript
export class MyCustomAgent implements FileAgent {
  canHandle(file: File): boolean {
    // Logic to determine if this agent can handle the file
  }

  async analyze(file: File): Promise<AnalysisResult> {
    // Logic to analyze the file
  }
}
```

## License

[MIT](LICENSE)
