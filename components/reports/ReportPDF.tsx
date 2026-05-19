// components/reports/ReportPDF.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Download, FileDown } from "lucide-react";
import html2pdf from "html2pdf.js";

interface ReportPDFButtonProps {
  report: any;
}

export function DownloadPDFButton({ report }: ReportPDFButtonProps) {
  const generatePDF = () => {
    const element = document.getElementById("report-content");

    if (!element) {
      alert(
        "Report content not found. Please make sure the report is fully loaded.",
      );
      return;
    }

    const opt = {
      margin: [15, 15],
      filename: `RoleNorth_Career_Report_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <Button
      onClick={generatePDF}
      className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-black font-medium"
      size="lg"
    >
      <FileDown className="w-5 h-5" />
      Download PDF Report
    </Button>
  );
}
