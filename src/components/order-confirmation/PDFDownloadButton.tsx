
import React from "react";
import { Button } from "@/components/ui/button";
import { usePDF } from "react-to-pdf";
import { FileText } from "lucide-react";

interface PDFDownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

const PDFDownloadButton = ({ targetRef, fileName }: PDFDownloadButtonProps) => {
  const { toPDF, targetRef: pdfTargetRef } = usePDF({
    filename: fileName,
    page: { 
      format: 'A4',
      margin: 10 
    }
  });

  return (
    <Button 
      onClick={() => toPDF()}
      variant="outline" 
      className="gap-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
    >
      <FileText size={18} />
      Download Order PDF
    </Button>
  );
};

export default PDFDownloadButton;
