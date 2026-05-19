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
      const html2pdf = (await import("html2pdf.js")).default;
      const originalElement = document.getElementById("report-content");

      if (!originalElement) {
        alert("Report content not found!");
        return;
      }

      // Deep clone + aggressive cleanup for PDF
      const clone = originalElement.cloneNode(true) as HTMLElement;

      // Force clean light theme for PDF
      clone.style.backgroundColor = "#ffffff";
      clone.style.color = "#000000";

      // Remove all Tailwind gradient and dark classes that cause issues
      const allElements = clone.querySelectorAll("*");
      allElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.backgroundColor = "white";
          el.style.color = "black";
          el.style.borderColor = "#cccccc";
        }
      });

      const opt = {
        margin: [15, 15, 15, 15] as [number, number, number, number],
        filename: `RoleNorth_Career_Report_${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          ignoreElements: (el: Element) => el.tagName === "BUTTON",
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      await html2pdf().set(opt).from(clone).save();
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Could not generate PDF. Please try again or take a screenshot.");
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