
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useReactToPdf } from "react-to-pdf";
import { FilePdf } from "lucide-react";

interface PDFDownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

const PDFDownloadButton = ({ targetRef, fileName }: PDFDownloadButtonProps) => {
  const { toPdf, targetRef: pdfTargetRef } = useReactToPdf({
    filename: fileName,
    options: {
      format: [210, 297], // A4 size in mm
      margin: 10,
    },
  });

  return (
    <Button 
      onClick={() => toPdf()}
      variant="outline" 
      className="gap-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
    >
      <FilePdf size={18} />
      Download Order PDF
    </Button>
  );
};

export default PDFDownloadButton;
