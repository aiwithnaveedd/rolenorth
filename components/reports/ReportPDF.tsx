// components/reports/ReportPDF.tsx
"use client";

import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useState } from "react";

interface ReportPDFButtonProps {
  report: any;
}

export function DownloadPDFButton({ report }: ReportPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      // Dynamic import to avoid server-side issues
      const html2pdf = (await import("html2pdf.js")).default;

      const element = document.getElementById("report-content");

      if (!element) {
        alert("Report content not found!");
        return;
      }

      const opt = {
        margin: [15, 15],
        filename: `RoleNorth_Career_Report_${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-black font-medium"
      size="lg"
    >
      <FileDown className="w-5 h-5" />
      {isGenerating ? "Generating PDF..." : "Download PDF Report"}
    </Button>
  );
}