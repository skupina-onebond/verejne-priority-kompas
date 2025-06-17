import React from 'react';
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
  const getBarometerText = (level: string) => {
    switch (level) {
      case 'high': return 'Vysoká';
      case 'medium': return 'Střední';
      case 'low': return 'Nízká';
      default: return level;
    }
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Základní info */}
            <section>
              <h3 className="font-semibold text-slate-800 mb-2">Základní informace</h3>
              <p><strong>Hodnota zakázky:</strong> {formatValue(contract.value)}</p>
              <p><strong>Termín podání:</strong> {new Date(contract.deadline).toLocaleDateString('cs-CZ')}</p>
              <p><strong>Zadavatel:</strong> {contract.contracting_authority}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 pl-0 text-indigo-600 hover:text-indigo-800"
                onClick={() => onDeepSearch(contract.contracting_authority)}
              >
                Prověřit <Search className="h-4 w-4 ml-1" />
              </Button>
              <p><strong>Region:</strong> {contract.region}</p>
            </section>

            {/* Kategorizace */}
            <section>
              <h3 className="font-semibold text-slate-800 mb-2">Kategorizace</h3>
              <p><strong>Odvětví:</strong> {contract.sector}</p>
              <p><strong>Kategorie hodnoty:</strong> {
                contract.valueCategory === 'low' ? 'Do 500 tisíc Kč' :
                contract.valueCategory === 'medium' ? 'Do 5 milionů Kč' :
                'Nad 5 milionů Kč'
              }</p>
            </section>

            {/* Dodatečné informace */}
            {contract.additional_info && (
              <section>
                <h3 className="font-semibold text-slate-800 mb-2">Dodatečné informace</h3>
                <p>{contract.additional_info}</p>
              </section>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <section>
              <h3 className="font-semibold text-slate-800 mb-2">Popis zakázky</h3>
              <p className="leading-relaxed text-slate-900">{contract.description}</p>
            </section>

            {analysisResult && (
              <section className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-indigo-800 mb-2">📊 Analýza dodavatele</h3>
                <p className="text-slate-900 whitespace-pre-wrap">{analysisResult}</p>
              </section>
            )}

            {contract.riskScore !== undefined && (
              <section>
                <h3 className="text-sm font-semibold text-slate-800 mb-2">🎯 Rizikový barometr</h3>
                <Barometer score={contract.riskScore} size="md" showLabel />
              </section>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
