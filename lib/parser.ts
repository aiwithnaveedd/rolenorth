/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseBuffer } from "docx-parser";
import PDFParser from "pdf2json";

function parsePDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   pdfParser.on("pdfParser_dataError", (errData: any) => {
  const error =
    errData?.parserError instanceof Error
      ? errData.parserError
      : new Error(errData?.parserError || "PDF parsing failed");

  reject(error);
});

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      try {
        const text = pdfData.Pages.map((page: any) =>
          page.Texts.map((t: any) =>
            decodeURIComponent(t.R[0].T)
          ).join(" ")
        ).join("\n");

        resolve(text);
      } catch (err) {
        reject(err);
      }
    });

    pdfParser.parseBuffer(buffer);
  });
}

export async function parseFile(
  buffer: Buffer,
  fileName: string
): Promise<string> {
  const lower = fileName.toLowerCase();

  // PDF
  if (lower.endsWith(".pdf")) {
    return await parsePDF(buffer);
  }

  // DOCX
  if (lower.endsWith(".docx")) {
    return new Promise((resolve, reject) => {
      parseBuffer(buffer, (data: string) => {
        if (!data || data.trim().length === 0) {
          return reject(new Error("DOCX parsing failed"));
        }
        resolve(data);
      });
    });
  }

  throw new Error("Unsupported file type");
}