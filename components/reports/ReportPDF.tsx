// components/reports/ReportPDF.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useState } from "react";

interface ReportPDFButtonProps {
  report: any;
}

export function DownloadPDFButton({ report }: ReportPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSaveAsPDF = () => {
    setIsGenerating(true);

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
  };

  return (
    <Button
      onClick={handleSaveAsPDF}
      disabled={isGenerating}
      className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-black font-medium"
      size="lg"
    >
      <Printer className="w-5 h-5" />
      {isGenerating ? "Opening Print..." : "Save as PDF"}
    </Button>
  );
}