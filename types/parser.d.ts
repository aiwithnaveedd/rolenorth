// types/parser.d.ts
declare module 'docx-parser' {
  export function parseBuffer(
    buffer: Buffer, 
    callback: (data: string) => void
  ): void;
}

declare module 'pdf2json' {
  class PDFParser {
    on(event: string, callback: (data: any) => void): void;
    parseBuffer(buffer: Buffer): void;
  }
  export default PDFParser;
}