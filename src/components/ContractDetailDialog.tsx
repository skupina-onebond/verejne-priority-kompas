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
import { Barometer } from "@/components/Barometer";

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
          <DialogTitle className="text-2xl font-bold text-slate-900">{contract.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge>{contract.sector}</Badge>
          <Badge>{contract.region}</Badge>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
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
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 pl-0 text-indigo-600 hover:text-indigo-800"
                onClick={() => {
                  setShowAnalysis(true);
                  onDeepSearch(contract.contracting_authority);
                }}
              >
                Prověřit <Search className="h-4 w-4 ml-1" />
              </Button>
              <p><strong>Region:</strong> {contract.region}</p>
            </section>

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
          <div className="space-y-6">
            {contract.riskScore !== undefined && (
              <section>
                <Barometer score={contract.riskScore} size="md" showLabel />

                {/* Findings Section */}
                {contract.findings && contract.findings.length > 0 && (
                  <div className="bg-slate-100 border border-slate-300 rounded-md p-4 text-sm text-gray-800 space-y-3 mt-4">
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">Zjištěné závaťnosti</h3>
                    <ul className="space-y-2 list-disc list-inside">
                      {contract.findings.map((finding, idx) => (
                        <li key={idx}>
                          <span className="font-medium">{finding.severity.toUpperCase()}</span>{' '}
                          – <em>{finding.category}</em>: {finding.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendation Section */}
                <strong className="block mt-6">Doporučení pro kontrolní orgán:</strong>
                <div className="mt-2">
                  <div className="bg-slate-100 border border-slate-300 rounded-md p-4 text-sm text-gray-800 space-y-1">
                    {contract.riskScore <= 40 && (
                      <ul className="list-disc list-inside">
                        <li>Zakázka byla vyhodnocena jako nízce riziková.</li>
                        <li>Doporučujeme běžný dohled dle interních postupů.</li>
                        <li>Kontrolujte plnění smlouvy a uchovávejte dokumentaci.</li>
                      </ul>
                    )}

                    {contract.riskScore > 40 && contract.riskScore <= 70 && (
                      <ul className="list-disc list-inside">
                        <li>Zakázka vyžaduje zvýšenou pozornost.</li>
                        <li>Prověřte historii dodavatele a případné střety zájmů.</li>
                        <li>Zajistěte přehlednou evidenci rozhodnutí a výdajů.</li>
                      </ul>
                    )}

                    {contract.riskScore > 70 && (
                      <ul className="list-disc list-inside">
                        <li>Zakázka byla označena jako vysoce riziková.</li>
                        <li>Doporučujeme podrobný dohled nad všemi fázemi zakázky.</li>
                        <li>Zvažte zapojení nezávislého dohledu nebo interního auditora.</li>
                        <li>Vyžadujte detailní dokumentaci a transparentní výběrové řízení.</li>
                      </ul>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div> {/* koniec GRID */}

        {/* ANALÝZA POD GRIDOM */}
        {analysisResult && (
          <div className="mt-8">
            <section className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
              <h3 className="text-sm font-semibold text-indigo-800 mb-2">🧾 Analýza zadavatele</h3>
              <p className="text-slate-900 whitespace-pre-wrap">{analysisResult}</p>
            </section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
