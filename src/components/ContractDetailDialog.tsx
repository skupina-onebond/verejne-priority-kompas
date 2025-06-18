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
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto px-6 py-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            {contract.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge>{contract.sector}</Badge>
          <Badge>{contract.region}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm relative">
          {/* LEFT */}
          <div className="space-y-6">
            <section>
              <h3 className="font-semibold text-slate-800 mb-2">Popis zakázky</h3>
              <p className="leading-relaxed text-slate-900">{contract.description}</p>
            </section>

            <section>
              <h3 className="font-semibold text-slate-800 mb-2">Základní informace</h3>
              <p><strong>Hodnota zakázky:</strong> {formatValue(contract.value)}</p>
              <p><strong>Termín podání:</strong> {new Date(contract.deadline).toLocaleDateString('cs-CZ')}</p>
              <p><strong>Zadavatel:</strong> {contract.contracting_authority}</p>
              <p><strong>Region:</strong> {contract.region}</p>
            </section>

            <div>
              <Button
                variant="default"
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => {
                  setShowAnalysis(true);
                  onDeepSearch(contract.contracting_authority);
                }}
              >
                Prověřit zadavatele <Search className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <section>
              <h3 className="font-semibold text-slate-800 mb-2">Kategorizace</h3>
              <p><strong>Odvětví:</strong> {contract.sector}</p>
              <p><strong>Kategorie hodnoty:</strong> {
                contract.valueCategory === 'low' ? 'Do 500 tisíc Kč' :
                contract.valueCategory === 'medium' ? 'Do 5 milionů Kč' :
                'Nad 5 milionů Kč'
              }</p>
            </section>

            {contract.additional_info && (
              <section>
                <h3 className="font-semibold text-slate-800 mb-2">Dodatečné informace</h3>
                <p>{contract.additional_info}</p>
              </section>
            )}
          </div>

          {/* RIGHT */}
<div className="space-y-6 relative">
  {contract.riskScore !== undefined && (
    <div className="absolute top-0 right-0">
      <RiskBarometerCircle score={contract.riskScore} size={80} />
    </div>
  )}

  {contract.findings?.length > 0 && (
    <section className="pt-20"> {/* padding top kvôli barometru nad tým */}
      <h3 className="font-semibold text-slate-900 mb-2">Zjištěné závažnosti</h3>
      <div className="bg-rose-50 border border-rose-200 rounded-md p-4 text-sm text-slate-800 space-y-2">
        <ul className="list-disc list-inside space-y-1">
          {contract.findings.map((finding, idx) => (
            <li key={idx}>
              <span className="font-medium">{finding.severity.toUpperCase()}</span>{' '}
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
            <div className="col-span-2 mt-4">
              <h3 className="font-semibold text-slate-900 mb-2">Doporučení pro kontrolní orgán</h3>
              <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4 text-sm text-slate-800 space-y-1">
                <ul className="list-disc list-inside space-y-1">
                  {contract.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* ANALÝZA */}
        {analysisResult && (
          <div className="mt-8">
            <h3 className="font-semibold text-slate-900 mb-2">Analýza zadavatele</h3>
            <section className="bg-slate-100 border border-slate-300 p-6 rounded-lg">
              <p className="text-slate-900 whitespace-pre-wrap">{analysisResult}</p>
            </section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
