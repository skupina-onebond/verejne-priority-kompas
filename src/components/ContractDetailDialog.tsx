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

interface ContractDetailDialogProps {
  contract: PublicContract;
  isOpen: boolean;
  onClose: () => void;
}

export const ContractDetailDialog: React.FC<ContractDetailDialogProps> = ({
  contract,
  isOpen,
  onClose
}) => {
  const getBarometerColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{contract.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge className={getBarometerColor(contract.barometer)}>
              {getBarometerText(contract.barometer)} závažnost
            </Badge>
            <Badge variant="outline">{contract.sector}</Badge>
            <Badge variant="outline">{contract.region}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Základní informace</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Hodnota zakázky:</span>
                    <p className="text-gray-900">{formatValue(contract.value)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Termín podání:</span>
                    <p className="text-gray-900">{new Date(contract.deadline).toLocaleDateString('cs-CZ')}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Zadavatel:</span>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900">{contract.contracting_authority}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log("TODO: DeepSearch for zadavatel")}
                        className="text-indigo-600 hover:text-indigo-800 ml-2"
                      >
                        Prověřit
                        <Search className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Region:</span>
                    <p className="text-gray-900">{contract.region}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Kategorizace</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Odvětví:</span>
                    <p className="text-gray-900">{contract.sector}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Kategorie hodnoty:</span>
                    <p className="text-gray-900">
                      {contract.valueCategory === 'low' && 'Do 500 tisíc Kč'}
                      {contract.valueCategory === 'medium' && 'Do 5 milionů Kč'}
                      {contract.valueCategory === 'high' && 'Nad 5 milionů Kč'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Popis zakázky</h3>
              <p className="text-gray-900 text-sm leading-relaxed">{contract.description}</p>
            </div>
          </div>

          {contract.additional_info && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Dodatečné informace</h3>
              <p className="text-gray-900 text-sm leading-relaxed">{contract.additional_info}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
