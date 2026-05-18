"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false },
);

const styles = StyleSheet.create({
  page: {
    padding: 45,
    fontSize: 11.5,
    lineHeight: 1.7,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 24,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  score: {
    fontSize: 42,
    color: "#10b981",
    textAlign: "center",
    marginBottom: 6,
  },
  scoreLabel: {
    fontSize: 11,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 15,
    marginTop: 22,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#1f2937",
  },
  bullet: {
    marginLeft: 12,
    marginBottom: 7,
  },
  subText: {
    marginLeft: 12,
    marginBottom: 10,
    color: "#444",
  },
});

interface ReportPDFProps {
  report: any;
}

function ReportDocument({ report }: ReportPDFProps) {
  const data =
    typeof report.analysis === "string"
      ? JSON.parse(report.analysis)
      : report.analysis;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>RoleNorth - Career Analysis Report</Text>

        {/* ATS Score */}
        <Text style={styles.score}>
          {data.ats?.score || report.ats_score} / 100
        </Text>
        <Text style={styles.scoreLabel}>
          ATS Score • Generated on{" "}
          {new Date(report.created_at).toLocaleDateString()}
        </Text>

        {/* Summary */}
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={{ marginBottom: 20 }}>{data.summary}</Text>

        {/* Market Position */}
        <Text style={styles.sectionTitle}>Market Position</Text>
        <Text>Overall Score: {data.market_position?.score}/100</Text>

        <Text style={{ marginTop: 12, fontWeight: "bold" }}>Strengths</Text>
        {data.market_position?.strengths?.map((item: string, i: number) => (
          <Text key={i} style={styles.bullet}>
            • {item}
          </Text>
        ))}

        <Text style={{ marginTop: 12, fontWeight: "bold" }}>Weaknesses</Text>
        {data.market_position?.weaknesses?.map((item: string, i: number) => (
          <Text key={i} style={styles.bullet}>
            • {item}
          </Text>
        ))}

        {/* Skills */}
        <Text style={styles.sectionTitle}>Skills Analysis</Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Strong:</Text>{" "}
          {data.skills?.strong?.join(", ") || "None"}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Moderate:</Text>{" "}
          {data.skills?.moderate?.join(", ") || "None"}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Missing:</Text>{" "}
          {data.skills?.missing?.join(", ") || "None"}
        </Text>

        {/* Risk */}
        <Text style={styles.sectionTitle}>Automation & Skill Decay Risk</Text>
        <Text style={{ fontWeight: "bold" }}>
          Risk Level: {data.risk_analysis?.automation_risk}
        </Text>
        <Text style={{ marginTop: 6 }}>{data.risk_analysis?.details}</Text>

        {/* Career Pivots */}
        <Text style={styles.sectionTitle}>Career Pivot Opportunities</Text>
        {data.career_pivots?.map((pivot: any, i: number) => (
          <View key={i} style={{ marginBottom: 14 }}>
            <Text style={{ fontWeight: "bold" }}>• {pivot.role}</Text>
            <Text style={styles.subText}>{pivot.reason}</Text>
          </View>
        ))}

        {/* Action Plan */}
        <Text style={styles.sectionTitle}>Action Plan</Text>

        {data.action_plan?.["30_days"] && (
          <View style={{ marginBottom: 18 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
              Next 30 Days
            </Text>
            {data.action_plan["30_days"].map((item: string, i: number) => (
              <Text key={i} style={styles.bullet}>
                • {item}
              </Text>
            ))}
          </View>
        )}

        {data.action_plan?.["60_days"] && (
          <View style={{ marginBottom: 18 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
              Next 60 Days
            </Text>
            {data.action_plan["60_days"].map((item: string, i: number) => (
              <Text key={i} style={styles.bullet}>
                • {item}
              </Text>
            ))}
          </View>
        )}

        {data.action_plan?.["90_days"] && (
          <View>
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
              Next 90 Days
            </Text>
            {data.action_plan["90_days"].map((item: string, i: number) => (
              <Text key={i} style={styles.bullet}>
                • {item}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

export function DownloadPDFButton({ report }: { report: any }) {
  return (
    <PDFDownloadLink
      document={<ReportDocument report={report} />}
      fileName={`rolenorth-career-report-${new Date().toISOString().slice(0, 10)}.pdf`}
    >
      {({ loading }: { loading: boolean }) => (
        <Button disabled={loading} className="gap-2">
          <Download size={18} />
          {loading ? "Generating PDF..." : "Download PDF Report"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
