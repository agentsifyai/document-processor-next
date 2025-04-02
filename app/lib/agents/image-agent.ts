import { FileAgent, AnalysisResult } from "./base-agent";

/**
 * Comprehensive agent for all image file types
 */
export class ImageAgent implements FileAgent {
  // List of all common image file extensions
  private readonly imageExtensions = [
    // Raster formats
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "tiff",
    "tif",
    "ico",
    "heic",
    "heif",
    // Vector formats
    "svg",
    "eps",
    "ai",
    // Raw camera formats
    "raw",
    "cr2",
    "nef",
    "arw",
    "dng",
    // Other image formats
    "psd",
    "xcf",
    "sketch",
  ];

  // Image format types and descriptions
  private readonly formatInfo: Record<
    string,
    {
      type: string;
      description: string;
      lossy?: boolean;
      features?: string[];
    }
  > = {
    jpg: {
      type: "Raster",
      description: "JPEG image",
      lossy: true,
      features: ["compressed", "widely supported"],
    },
    jpeg: {
      type: "Raster",
      description: "JPEG image",
      lossy: true,
      features: ["compressed", "widely supported"],
    },
    png: {
      type: "Raster",
      description: "PNG image",
      lossy: false,
      features: ["lossless", "transparency support"],
    },
    gif: {
      type: "Raster",
      description: "GIF image",
      lossy: false,
      features: ["animation", "limited colors"],
    },
    webp: {
      type: "Raster",
      description: "WebP image",
      features: ["modern format", "small file size"],
    },
    bmp: {
      type: "Raster",
      description: "Bitmap image",
      lossy: false,
      features: ["uncompressed", "simple format"],
    },
    tiff: {
      type: "Raster",
      description: "TIFF image",
      lossy: false,
      features: ["high quality", "large files"],
    },
    tif: {
      type: "Raster",
      description: "TIFF image",
      lossy: false,
      features: ["high quality", "large files"],
    },
    heic: {
      type: "Raster",
      description: "HEIC image",
      features: ["modern format", "efficient compression"],
    },
    heif: {
      type: "Raster",
      description: "HEIF image",
      features: ["modern format", "efficient compression"],
    },
    svg: {
      type: "Vector",
      description: "SVG vector graphic",
      lossy: false,
      features: ["scalable", "XML-based"],
    },
    eps: {
      type: "Vector",
      description: "EPS vector graphic",
      lossy: false,
      features: ["print format", "PostScript"],
    },
    ai: {
      type: "Vector",
      description: "Adobe Illustrator file",
      lossy: false,
      features: ["professional design", "Adobe software"],
    },
    psd: {
      type: "Layered",
      description: "Adobe Photoshop file",
      lossy: false,
      features: ["layered editing", "Adobe software"],
    },
    xcf: {
      type: "Layered",
      description: "GIMP image file",
      lossy: false,
      features: ["layered editing", "open source"],
    },
    sketch: {
      type: "Design",
      description: "Sketch design file",
      features: ["UI/UX design", "Mac software"],
    },
    raw: {
      type: "Camera Raw",
      description: "Raw camera image",
      lossy: false,
      features: ["unprocessed", "high quality"],
    },
    cr2: {
      type: "Camera Raw",
      description: "Canon raw image",
      lossy: false,
      features: ["Canon cameras", "unprocessed"],
    },
    nef: {
      type: "Camera Raw",
      description: "Nikon raw image",
      lossy: false,
      features: ["Nikon cameras", "unprocessed"],
    },
    arw: {
      type: "Camera Raw",
      description: "Sony raw image",
      lossy: false,
      features: ["Sony cameras", "unprocessed"],
    },
    dng: {
      type: "Camera Raw",
      description: "Digital negative",
      lossy: false,
      features: ["standard raw format", "Adobe format"],
    },
    ico: {
      type: "Icon",
      description: "Icon file",
      features: ["website favicon", "small size"],
    },
  };

  // Image categories based on filename
  private readonly imageCategories = [
    { regex: /logo|brand|identity/i, category: "Logo" },
    { regex: /icon|symbol|ui/i, category: "Icon" },
    { regex: /banner|header|hero|cover|ad/i, category: "Banner/Advertisement" },
    { regex: /screenshot|screen/i, category: "Screenshot" },
    { regex: /photo|img|image|picture|pic/i, category: "Photograph" },
    { regex: /diagram|chart|graph|plot/i, category: "Diagram/Chart" },
    { regex: /illustration|drawing|art|graphic/i, category: "Illustration" },
    {
      regex: /background|texture|pattern|wallpaper/i,
      category: "Background/Texture",
    },
    { regex: /avatar|profile|user|person/i, category: "Avatar/Profile" },
    { regex: /thumbnail|thumb|preview/i, category: "Thumbnail" },
    { regex: /product|item|goods/i, category: "Product Image" },
    { regex: /mockup|mock-up|prototype/i, category: "Mockup" },
    { regex: /scan|document|doc/i, category: "Document Scan" },
    { regex: /map|location|geo/i, category: "Map/Location" },
    { regex: /button|cta/i, category: "Button/CTA" },
    { regex: /infographic|info/i, category: "Infographic" },
    { regex: /meme|funny/i, category: "Meme/Humor" },
  ];

  canHandle(file: File): boolean {
    // Check if it's an image file by extension or mime type
    const extension = file.name.includes(".")
      ? file.name.split(".").pop()?.toLowerCase() || ""
      : "";

    return (
      this.imageExtensions.includes(extension) || file.type.startsWith("image/")
    );
  }

  async analyze(file: File): Promise<AnalysisResult> {
    const extension = file.name.includes(".")
      ? file.name.split(".").pop()?.toLowerCase() || "img"
      : "img";

    // Get filename without extension for analysis
    const baseFileName = file.name.replace(
      new RegExp(`\\.${extension}$`, "i"),
      ""
    );

    // Get format information
    const formatInfo = this.formatInfo[extension] || {
      type: "Image",
      description: `${extension.toUpperCase()} image`,
    };

    // Try to identify image category from filename
    let imageCategory = "Image";
    for (const { regex, category } of this.imageCategories) {
      if (regex.test(baseFileName)) {
        imageCategory = category;
        break;
      }
    }

    // Create a cleaned title from the filename
    const imageTitle = baseFileName
      .replace(/[_-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    try {
      // Create an image element to get dimensions
      const imageInfo = await this.getImageDimensions(file);

      // Calculate file size description
      const sizeInKB = file.size / 1024;
      const sizeDescription =
        sizeInKB >= 1024
          ? `${(sizeInKB / 1024).toFixed(2)} MB`
          : `${sizeInKB.toFixed(2)} KB`;

      // Get resolution quality classification
      let resolution = "";
      if (imageInfo) {
        const totalPixels = imageInfo.width * imageInfo.height;
        if (totalPixels > 8000000) resolution = "high resolution"; // > 8MP
        else if (totalPixels > 2000000)
          resolution = "medium resolution"; // > 2MP
        else if (totalPixels > 500000)
          resolution = "standard resolution"; // > 0.5MP
        else resolution = "low resolution";
      }

      // Create a description of the image
      let description = "";
      if (imageTitle && imageCategory) {
        description = `${imageCategory.toLowerCase()} of ${imageTitle.toLowerCase()}`;
      } else if (imageTitle) {
        description = `Image showing ${imageTitle.toLowerCase()}`;
      } else if (imageCategory) {
        description = `${imageCategory}`;
      }

      if (formatInfo.type === "Vector") {
        description += `. Scalable vector graphic that can be resized without losing quality.`;
      } else if (resolution) {
        description += `. ${
          resolution.charAt(0).toUpperCase() + resolution.slice(1)
        } image.`;
      }

      if (formatInfo.features && formatInfo.features.length > 0) {
        description += ` ${formatInfo.features.join(", ")} format.`;
      }

      // Dimension info for summary
      const dimensionInfo = imageInfo
        ? `${imageInfo.width}×${imageInfo.height} pixels`
        : "";

      // Build the summary
      let summary = `"${imageTitle}" - ${imageCategory}`;
      if (dimensionInfo) {
        summary += ` (${dimensionInfo}, ${sizeDescription})`;
      } else {
        summary += ` (${sizeDescription})`;
      }

      return {
        extension,
        summary,
        fileSize: file.size,
        mimeType: file.type || `image/${extension}`,
        metadata: {
          imageTitle,
          imageCategory,
          imageType: formatInfo.type,
          description: formatInfo.description,
          format: extension.toUpperCase(),
          ...(imageInfo
            ? {
                width: imageInfo.width,
                height: imageInfo.height,
                aspectRatio: imageInfo.width / imageInfo.height,
                resolution,
                megapixels: imageInfo
                  ? ((imageInfo.width * imageInfo.height) / 1000000).toFixed(2)
                  : undefined,
              }
            : {}),
          features: formatInfo.features,
          lossy: formatInfo.lossy,
          sizeDescription,
          contentDescription: description,
          analyzed: true,
        },
      };
    } catch {
      // If we can't analyze the image, return basic info
      return {
        extension,
        summary: `"${imageTitle}" - ${imageCategory} (${formatInfo.description})`,
        fileSize: file.size,
        mimeType: file.type || `image/${extension}`,
        metadata: {
          imageTitle,
          imageCategory,
          imageType: formatInfo.type,
          description: formatInfo.description,
          format: extension.toUpperCase(),
          features: formatInfo.features,
          contentDescription: `${imageCategory.toLowerCase()} file in ${
            formatInfo.description
          } format.`,
          analyzed: true,
        },
      };
    }
  }

  /**
   * Helper method to get image dimensions
   */
  private getImageDimensions(
    file: File
  ): Promise<{ width: number; height: number } | null> {
    return new Promise((resolve) => {
      // Only attempt to get dimensions for browser-viewable formats
      const extension = file.name.includes(".")
        ? file.name.split(".").pop()?.toLowerCase() || ""
        : "";

      // List of formats that browser can display
      const browserViewableFormats = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp",
        "bmp",
        "svg",
        "ico",
      ];

      if (!browserViewableFormats.includes(extension)) {
        resolve(null);
        return;
      }

      // Create object URL for the file
      const url = URL.createObjectURL(file);

      // Create image element to load the file
      const img = new Image();

      // Set up event handlers
      img.onload = () => {
        // Clean up object URL
        URL.revokeObjectURL(url);
        resolve({ width: img.width, height: img.height });
      };

      img.onerror = () => {
        // Clean up object URL
        URL.revokeObjectURL(url);
        resolve(null);
      };

      // Start loading the image
      img.src = url;
    });
  }
}
