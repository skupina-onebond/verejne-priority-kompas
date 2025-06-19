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
import { Search } from "lucide-react";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto px-10 py-10">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-900 mb-3">
                {contract.title}
              </DialogTitle>
              <div className="flex gap-2">
                <Badge>{contract.sector}</Badge>
                <Badge>{contract.region}</Badge>
              </div>
            </div>
            {contract.riskScore !== undefined && (
  <div className="mt-2 flex items-start gap-2">
    <RiskBarometerCircle score={contract.riskScore} size={80} />
    <Button
      size="icon"
      variant="ghost"
      className="mt-1"
      onClick={handlePrint}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 9V2h12v7h-2V4H8v5H6zM6 13v7h12v-7h-2v5H8v-5H6zm12.707-4.707a1 1 0 00-1.414 0L16 10.586V8a1 1 0 10-2 0v5a1 1 0 001 1h5a1 1 0 100-2h-2.586l1.293-1.293a1 1 0 000-1.414z" />
      </svg>
    </Button>
  </div>
)}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm relative items-start">
          {/* LEFT */}
          <div className="space-y-6">
            <section>
              <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2 uppercase tracking-wide">Popis zakázky</h3>
              <p>{contract.description}</p>
            </section>

            <section className="space-y-1">
              <h3 className="text-base font-semibold text-slate-900 mb-2 uppercase tracking-wide">Základní informace</h3>
              <p><span className="font-medium">Hodnota zakázky:</span> {formatValue(contract.value)}</p>
              <p><span className="font-medium">Termín podání:</span> {new Date(contract.deadline).toLocaleDateString('cs-CZ')}</p>
              <p><span className="font-medium">Zadavatel:</span> {contract.contracting_authority}</p>
              <p><span className="font-medium">Region:</span> {contract.region}</p>
              {contract.supplier && (
                <p><span className="font-medium">Dodavatel:</span> {contract.supplier}</p>
              )}
            </section>

            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-[#215197] border-[#215197] hover:bg-[#215197]/10"
                onClick={() => {
                  setShowAnalysis(true);
                  scrollTo(zadavatelRef);
                  onDeepSearch(contract.contracting_authority);
                }}
              >
                Prověřit zadavatele <Search className="h-4 w-4 ml-1" />
              </Button>

              {contract.supplier && (
                <Button
                  variant="default"
                  size="sm"
                  className="bg-[#215197] hover:bg-[#1c467f] text-white"
                  onClick={() => {
                    setShowSupplierAnalysis(true);
                    scrollTo(dodavatelRef);
                  }}
                >
                  Prověřit dodavatele <Search className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>

            <section className="space-y-1">
              <h3 className="text-base font-semibold text-slate-900 mb-2 uppercase tracking-wide">Kategorizace</h3>
              <p><span className="font-medium">Odvětví:</span> {contract.sector}</p>
              <p><span className="font-medium">Kategorie hodnoty:</span> {
                contract.valueCategory === 'low' ? 'Do 500 tisíc Kč' :
                contract.valueCategory === 'medium' ? 'Do 5 milionů Kč' :
                'Nad 5 milionů Kč'
              }</p>
            </section>

            {contract.additional_info && (
              <section>
                <h3 className="text-base font-semibold text-slate-900 mb-2 uppercase tracking-wide">Dodatečné informace</h3>
                <p>{contract.additional_info}</p>
              </section>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {contract.findings?.length > 0 && (
              <section className="mt-4">
                <h3 className="text-base font-semibold text-rose-700 mb-2 uppercase tracking-wide">Zjištěné závažnosti</h3>
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 space-y-3 text-sm">
                  <ul className="list-disc list-inside space-y-1">
                    {contract.findings.map((finding, idx) => (
                      <li key={idx}>
                        <span className="font-medium text-rose-800">{finding.severity.toUpperCase()}</span>{' '}
                        – <em>{finding.category}</em>: {finding.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {contract.recommendations?.length > 0 && (
              <section className="mt-6">
                <h3 className="text-base font-semibold text-slate-900 mb-2 uppercase tracking-wide">Doporučení pro kontrolní orgán</h3>
                <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4 text-sm text-slate-800 space-y-1">
                  <ul className="list-disc list-inside space-y-1">
                    {contract.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </div>
        </div>

        <Accordion type="multiple" className="mt-8 space-y-4">
          {analysisResult && (
            <div ref={zadavatelRef}>
              <AccordionItem value="zadavatel">
                <AccordionTrigger className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Analýza zadavatele
                </AccordionTrigger>
                <AccordionContent className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 text-sm text-slate-900 leading-relaxed whitespace-pre-wrap">
                  {analysisResult}
                </AccordionContent>
              </AccordionItem>
            </div>
          )}

          {contract.supplierAnalysis && showSupplierAnalysis && (
            <div ref={dodavatelRef}>
              <AccordionItem value="dodavatel">
                <AccordionTrigger className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Analýza dodavatele
                </AccordionTrigger>
                <AccordionContent className="bg-white border border-slate-300 rounded-lg shadow-sm p-6 text-sm text-slate-900 leading-relaxed whitespace-pre-wrap">
                  {contract.supplierAnalysis}
                </AccordionContent>
              </AccordionItem>
            </div>
          )}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};
