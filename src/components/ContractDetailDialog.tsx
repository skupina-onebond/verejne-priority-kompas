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
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-slate-800">
                  <strong>Doporučení pro auditora:</strong>
                  <p className="mt-1">
                    {contract.riskScore <= 40 && (
                      <>Zakázka vykazuje nízkou úroveň rizika. Doporučujeme standardní monitoring, kontrolu dodržování podmínek smlouvy a pravidelnou dokumentaci průběhu zakázky.</>
                    )}
                    {contract.riskScore > 40 && contract.riskScore <= 70 && (
                      <>Zakázka vyžaduje zvýšenou pozornost. Prověřte historii dodavatele, posuďte možné střety zájmů a zajistěte přehlednou evidenci klíčových rozhodnutí a výdajů.</>
                    )}
                    {contract.riskScore > 70 && (
                      <>Zakázka je vysoce riziková. Doporučujeme detailní kontrolu každé fáze, přizvání interního auditora, transparentní výběrové řízení a nezávislý dohled nad plněním.</>
                    )}
                  </p>
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
