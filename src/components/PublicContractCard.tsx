import React, { useState } from 'react';
import * as Tooltip from "@radix-ui/react-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Bookmark, Check, FileText, ArrowUp, ArrowDown } from "lucide-react";
import { PublicContract, ContractStatus } from "@/types/contract";
import { ContractDetailDialog } from "./ContractDetailDialog";
// import { ScoreCircle } from '@/components/ScoreCircle';

interface PublicContractCardProps {
  contract: PublicContract;
  onStatusChange: (id: string, status: ContractStatus) => void;
  onMove: (id: string, direction: "up" | "down") => void;
  onDeepSearch: (subjectName: string) => void;
  mode?: 'default' | 'summary';
  similarContracts?: PublicContract[];
}

export const PublicContractCard: React.FC<PublicContractCardProps> = ({
  contract,
  onStatusChange,
  onMove,
  onDeepSearch,
  mode = 'default',
  similarContracts
}: PublicContractCardProps) => {
  const [showDetail, setShowDetail] = useState(false);
  console.log("similarContracts", similarContracts);
  const [analysisResult, setAnalysisResult] = useState<string>();

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)} mil. Kč`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)} tis. Kč`;
    }
    return `${value} Kč`;
  };

  if (mode === 'summary') {
    return (
      <div className="border rounded p-4 shadow-sm bg-white hover:bg-slate-50 cursor-pointer">
        <h4 className="text-sm font-semibold text-slate-900">{contract.title}</h4>
        <p className="text-xs text-slate-700">{formatValue(contract.value)}</p>
        <p className="text-xs text-slate-600 italic">{contract.sector}</p>
      </div>
    );
  }

  const handleDeepSearch = (subjectName: string) => {
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
                <h2
                  onClick={() => setShowDetail(true)}
                  className="text-left w-full text-lg font-semibold text-slate-900 hover:underline cursor-pointer"
                >
                  {contract.title}
                </h2>
                {/* {contract.riskScore !== undefined && (
                  <ScoreCircle score={contract.riskScore} size={40}  />                
                )} */}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge className="bg-[#215197] text-white">{contract.sector}</Badge>
                <Badge className="bg-[#215197] text-white">{contract.region}</Badge>
              </div>
            </div>

            {/* Akcie */}
            {mode !== 'summary' && (
              <div className="flex gap-2 ml-4">
                {/* Bookmark */}
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onStatusChange(contract.id, contract.status === 'bookmarked' ? 'active' : 'bookmarked')}
                        className={contract.status === 'bookmarked' ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-600 hover:text-gray-700'}
                      >
                        <Bookmark
                          className={`h-4 w-4 p-[2px] rounded-sm ring-1 ${contract.status === 'bookmarked' ? 'ring-yellow-500 stroke-yellow-600 fill-yellow-600' : 'ring-yellow-400 stroke-yellow-500'}`}
                        />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="bg-white text-black text-xs px-2 py-1 rounded shadow-md border z-50">
                        Uložit
                        <Tooltip.Arrow className="fill-white" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>

                {/* Eye */}
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onStatusChange(contract.id, contract.status === 'hidden' ? 'active' : 'hidden')}
                        className="text-gray-600 hover:text-gray-700"
                      >
                        {contract.status === 'hidden' ? (
                          <EyeOff className="h-4 w-4 p-[2px] rounded-sm ring-1 ring-[#215197] stroke-[#215197]" />
                        ) : (
                          <Eye className="h-4 w-4 p-[2px] rounded-sm ring-1 ring-[#215197] stroke-[#215197]" />
                        )}
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="bg-white text-black text-xs px-2 py-1 rounded shadow-md border z-50">
                        {contract.status === 'hidden' ? 'Zobrazit' : 'Skrýt'}
                        <Tooltip.Arrow className="fill-white" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>

                {/* Completed */}
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Button
                        variant={contract.status === 'completed' ? "default" : "outline"}
                        size="sm"
                        onClick={() => onStatusChange(contract.id, contract.status === 'completed' ? 'active' : 'completed')}
                        className={
                          contract.status === 'completed'
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "text-green-600 hover:text-green-700"
                        }
                      >
                        <Check className={`h-4 w-4 ${contract.status === 'completed' ? 'stroke-white' : ''}`} />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="bg-white text-black text-xs px-2 py-1 rounded shadow-md border z-50">
                        Zkontrolováno
                        <Tooltip.Arrow className="fill-white" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>

                {/* Move up */}
                {/*
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMove(contract.id, "up")}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="bg-white text-black text-xs px-2 py-1 rounded shadow-md border z-50">
                        Posunout nahoru
                        <Tooltip.Arrow className="fill-white" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
                */}

                {/* Move down */}
                {/*
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMove(contract.id, "down")}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="bg-white text-black text-xs px-2 py-1 rounded shadow-md border z-50">
                        Posunout dolů
                        <Tooltip.Arrow className="fill-white" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
                */}
              </div>
            )}
          </div>   
        </CardHeader>

        <CardContent className="pb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
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

          <div className="flex justify-end mt-2">
            <Button
              variant="default"
              size="sm"
              className="bg-[#215197] hover:bg-[#1c467f] text-white"
              onClick={() => setShowDetail(true)}
            >
              <FileText className="w-4 h-4 mr-2" />
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
        similarContracts={similarContracts}
      />
    </>
  );
};
