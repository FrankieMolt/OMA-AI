declare module 'pdf-parse' {
  interface PDFParseResult {
    text: string;
    numpages: number;
    info: Record<string, any>;
    metadata: Record<string, any>;
    version: string;
  }

  function pdfParse(buffer: Buffer): Promise<PDFParseResult>;
  export = pdfParse;
}

declare module 'mammoth' {
  interface MammothResult {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  }

  export function extractRawText(options: { buffer: Buffer }): Promise<MammothResult>;
}
