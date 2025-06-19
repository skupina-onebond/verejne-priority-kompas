import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Bookmark, Check, FileText, ArrowUp, ArrowDown } from "lucide-react";
import { PublicContract, ContractStatus } from "@/types/contract";
import { ContractDetailDialog } from "./ContractDetailDialog";
import { ScoreCircle } from '@/components/ScoreCircle';

interface PublicContractCardProps {
  contract: PublicContract;
  onStatusChange: (id: string, status: ContractStatus) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  onDeepSearch: (subjectName: string) => void;
}

export const PublicContractCard: React.FC<PublicContractCardProps> = ({
  contract,
  onStatusChange,
  onMove,
  onDeepSearch
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>();

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)} mil. Kč`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)} tis. Kč`;
    }
    return `${value} Kč`;
  };

  const handleDeepSearch = (subjectName: string) => {
    setAnalysisResult("⏳ Načítání analýzy zadavatele...");
    onDeepSearch(subjectName);

    setTimeout(() => {
      if (contract.analysis) {
        setAnalysisResult(contract.analysis);
      } else {
        setAnalysisResult("⚠️ Analýza zadavatele není dostupná.");
      }
    }, 1500);
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-lg">{contract.title}</CardTitle>
                {contract.riskScore !== undefined && (
                  <ScoreCircle score={contract.riskScore} size={32} />
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline">{contract.sector}</Badge>
                <Badge variant="outline">{contract.region}</Badge>
              </div>
            </div>

            {/* Akcie */}
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStatusChange(contract.id, contract.status === 'bookmarked' ? 'active' : 'bookmarked')}
                className={contract.status === 'bookmarked' ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-600 hover:text-gray-700'}
              >
                <Bookmark className={`h-4 w-4 ${contract.status === 'bookmarked' ? 'fill-current' : ''}`} />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onStatusChange(contract.id, contract.status === 'hidden' ? 'active' : 'hidden')}
                className="text-gray-600 hover:text-gray-700"
              >
                {contract.status === 'hidden' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onStatusChange(contract.id, 'completed')}
                className="text-green-600 hover:text-green-700"
              >
                <Check className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onMove(contract.id, "up")}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onMove(contract.id, "down")}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative pb-14">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
    <div>
      <span className="font-medium text-gray-700">Hodnota zakázky:</span>
      <p className="text-gray-900 font-semibold">{formatValue(contract.value)}</p>
    </div>
    <div>
      <span className="font-medium text-gray-700">Termín podání:</span>
      <p className="text-gray-900">{new Date(contract.deadline).toLocaleDateString('cs-CZ')}</p>
    </div>
    <div>
      <span className="font-medium text-gray-700">Zadavatel:</span>
      <p className="text-gray-900">{contract.contracting_authority}</p>
    </div>
    <div>
    <span className="font-medium text-gray-700">Dodavatel:</span>
    <p className="text-gray-900">{contract.supplier || "Neuveden"}</p>
  </div>
  </div>

  <div className="mt-3 pr-40"> {/* pr-40 pridá miesto vpravo pre button */}
    <span className="font-medium text-gray-700">Popis:</span>
    <p className="text-gray-900 text-sm mt-1 line-clamp-3">{contract.description}</p>
  </div>

  <div className="border border-slate-200 rounded-md bg-slate-50 px-4 py-2 inline-flex items-center">
  <Button
    variant="outline"
    size="sm"
    className="text-[#215197] border-[#215197] hover:bg-[#215197]/10"
    onClick={() => => setShowDetail(true)}
  >
    Zobrazit detail
  </Button>
</div>
          
</CardContent>
      </Card>

      <ContractDetailDialog
        contract={contract}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        onDeepSearch={handleDeepSearch}
        analysisResult={analysisResult}
      />
    </>
  );
};
