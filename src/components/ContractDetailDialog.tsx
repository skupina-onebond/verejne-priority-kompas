import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Printer } from "lucide-react";
import { PublicContract } from "@/types/contract";
import { RiskBarometerCircle } from "@/components/RiskBarometerCircle";

interface ContractDetailDialogProps {
  contract: PublicContract;
  isOpen: boolean;
  onClose: () => void;
  onDeepSearch: (subjectName: string) => void;
  analysisResult?: string;
}

export const ContractDetailDialog: React.FC<ContractDetailDialogProps> = ({
  contract,
  isOpen,
  onClose,
  onDeepSearch,
  analysisResult
}) => {
  const [showSupplierAnalysis, setShowSupplierAnalysis] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const zadavatelRef = useRef<HTMLDivElement>(null);
  const dodavatelRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK'
    }).format(value);
  };

  const handlePrint = () => {
    const content = document.querySelector(".dialog-print-area");
    if (!content) return;

    const printWindow = window.open('', '', 'width=1024,height=768');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${contract.title}</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
              h3 { margin-top: 24px; }
              .text-sm { font-size: 14px; }
              .font-semibold { font-weight: 600; }
              .uppercase { text-transform: uppercase; }
              .text-slate-900 { color: #0f172a; }
            </style>
          </head>
          <body>
            ${content.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dialog-print-area max-w-4xl max-h-[85vh] overflow-y-auto px-10 py-10">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-slate-900 mb-3">
                {contract.title}
              </DialogTitle>

              <div className="flex items-center justify-between flex-wrap">
                <div className="flex gap-2 mb-2">
                  <Badge>{contract.sector}</Badge>
                  <Badge>{contract.region}</Badge>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#215197] border-[#215197] hover:bg-[#215197]/10"
                  onClick={handlePrint}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Tisk
                </Button>
              </div>
            </div>

            {contract.riskScore !== undefined && (
              <div className="mt-2 ml-4">
                <RiskBarometerCircle score={contract.riskScore} size={80} />
              </div>
            )}
          </div>
        </DialogHeader>

        {/* ...zbytek komponenty zůstává beze změny... */}

      </DialogContent>
    </Dialog>
  );
};
