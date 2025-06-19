import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [showAnalysis, setShowAnalysis] = useState(false);

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
              <div className="mt-2">
                <RiskBarometerCircle score={contract.riskScore} size={80} />
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge>{contract.sector}</Badge>
          <Badge>{contract.region}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm leading-relaxed text-slate-800">
          {/* LEFT */}
          <div className="space-y-6">
            <section>
              <h3 className="text-base font-semibold text-slate-900 mb-2 uppercase tracking-wide">Popis zakázky</h3>
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

            <div>
              <Button
                variant="default"
                size="sm"
                className="bg-indigo-600 hover:bg-[#1c467f] text-white"
                onClick={() => {
                  setShowAnalysis(true);
                  onDeepSearch(contract.contracting_authority);
                }}
              >
                Prověřit zadavatele <Search className="h-4 w-4 ml-1" />
              </Button>
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
        </div>

        {/* DOPORUČENÍ */}
        {contract.recommendations?.length > 0 && (
          <div className="col-span-2 mt-6">
            <h3 className="text-base font-semibold text-slate-900 mb-2 uppercase tracking-wide">Doporučení pro kontrolní orgán</h3>
            <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4 text-sm text-slate-800 space-y-1">
              <ul className="list-disc list-inside space-y-1">
                {contract.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ANALÝZA */}
        {analysisResult && (
          <div className="mt-8">
            <h3 className="text-base font-semibold text-slate-900 mb-2 uppercase tracking-wide">Analýza zadavatele</h3>
            <section className="bg-slate-100 border border-slate-300 p-6 rounded-lg">
              <p className="text-slate-900 whitespace-pre-wrap">{analysisResult}</p>
            </section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
