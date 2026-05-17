'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
);

const styles = StyleSheet.create({
  page: { 
    padding: 40, 
    fontSize: 11, 
    lineHeight: 1.5,
    fontFamily: 'Helvetica'
  },
  title: { 
    fontSize: 22, 
    marginBottom: 15, 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  scoreContainer: { 
    marginBottom: 25, 
    textAlign: 'center' 
  },
  score: { 
    fontSize: 42, 
    color: '#10b981', 
    fontWeight: 'bold' 
  },
  subtitle: { 
    fontSize: 16, 
    marginTop: 20, 
    marginBottom: 10, 
    fontWeight: 'bold' 
  },
});

interface ReportPDFProps {
  report: any;
}

function ReportDocument({ report }: ReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>RoleNorth - Career Analysis Report</Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{report.ats_score} / 100</Text>
          <Text>ATS Score</Text>
        </View>

        <Text style={{ textAlign: 'center', marginBottom: 20, color: '#666' }}>
          Generated on {new Date(report.created_at).toLocaleDateString()}
        </Text>

        <Text style={styles.subtitle}>Full Analysis</Text>
        <Text>{report.analysis}</Text>
      </Page>
    </Document>
  );
}

export function DownloadPDFButton({ report }: { report: any }) {
  return (
    <PDFDownloadLink 
      document={<ReportDocument report={report} />} 
      fileName={`rolenorth-report-${new Date().toISOString().slice(0,10)}.pdf`}
    >
      {({ loading }: { loading: boolean }) => (
        <Button disabled={loading} className="gap-2">
          <Download size={18} />
          {loading ? 'Generating PDF...' : 'Download PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  );
}