// components/reports/ReportPDF.tsx
"use client";

import { Button } from "@/components/ui/button";
import { FileDown, Printer } from "lucide-react";
import { useState } from "react";

interface ReportPDFButtonProps {
  report: any;
}

export function DownloadPDFButton({ report }: ReportPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    setIsGenerating(true);

    // Force clean print styles before printing
    const style = document.createElement("style");
    style.id = "pdf-print-style";
    style.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #report-content, #report-content * { 
          visibility: visible; 
        }
        #report-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background: white !important;
          color: black !important;
          padding: 20px;
        }
        button, .no-print { display: none !important; }
      }
    `;
    document.head.appendChild(style);

    // Trigger Print (User can choose "Save as PDF")
    setTimeout(() => {
      window.print();
      setIsGenerating(false);

      // Clean up style after printing
      setTimeout(() => {
        const el = document.getElementById("pdf-print-style");
        if (el) el.remove();
      }, 1000);
    }, 100);
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-black font-medium"
      size="lg"
    >
      <Printer className="w-5 h-5" />
      {isGenerating ? "Opening Print Dialog..." : "Download / Save as PDF"}
    </Button>
  );
}