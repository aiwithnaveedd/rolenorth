// components/reports/ReportPDF.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2, Printer } from "lucide-react";
import { useState } from "react";

interface ReportPDFButtonProps {
  report: any;
}

export function DownloadPDFButton({ report }: ReportPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSaveAsPDF = async () => {
    setIsGenerating(true);
    try {
      const printStyle = document.createElement("style");
      printStyle.id = "print-style";
      printStyle.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #report-content, #report-content * { visibility: visible; }
        #report-content {
          position: absolute;
          left: 0; top: 0;
          width: 100%;
          background: white !important;
          color: black !important;
          padding: 40px;
          }
          button { display: none !important; }
          }
          `;
      document.head.appendChild(printStyle);

      setTimeout(() => {
        window.print();
        setIsGenerating(false);

        setTimeout(() => {
          const el = document.getElementById("print-style");
          if (el) el.remove();
        }, 500);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Sorry, something went wrong while generating the PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleSaveAsPDF}
      disabled={isGenerating}
      className="bg-zinc-300 hover:bg-zinc-400 text-white flex items-center gap-2 px-6 py-2.5 rounded-2xl transition-all active:scale-[0.985]"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Download PDF Report
        </>
      )}
    </Button>
  );
}