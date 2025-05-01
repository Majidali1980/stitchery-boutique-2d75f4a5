
import React from "react";
import { Button } from "@/components/ui/button";
import { generatePdf } from "react-to-pdf";
import { FileText } from "lucide-react";

interface PDFDownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

const PDFDownloadButton = ({ targetRef, fileName }: PDFDownloadButtonProps) => {
  const handleDownload = () => {
    generatePdf({
      filename: fileName,
      page: {
        format: 'A4',
        margin: 10
      },
      element: targetRef.current
    });
  };

  return (
    <Button 
      onClick={handleDownload}
      variant="outline" 
      className="gap-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
    >
      <FileText size={18} />
      Download Order PDF
    </Button>
  );
};

export default PDFDownloadButton;
