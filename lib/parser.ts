import { parseBuffer } from "docx-parser";
import PDFParser from "pdf2json";

function parsePDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData: unknown) => {
      const error =
        errData instanceof Error ? errData : new Error("PDF parsing failed");
      reject(error);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        const text =
          pdfData.Pages?.map((page: any) =>
            page.Texts?.map((t: any) =>
              decodeURIComponent(t.R[0]?.T || ""),
            ).join(" "),
          ).join("\n") || "";

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
  fileName: string,
): Promise<string> {
  const lower = fileName.toLowerCase().trim();

  if (lower.endsWith(".pdf")) {
    return await parsePDF(buffer);
  }

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

  throw new Error("Unsupported file type. Only PDF and DOCX allowed.");
}
