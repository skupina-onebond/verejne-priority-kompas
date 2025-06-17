
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
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
      case 'medium': return 'Stredná';
      case 'low': return 'Nízka';
      default: return level;
    }
  };

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('sk-SK', {
      style: 'currency',
      currency: 'EUR'
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
              {getBarometerText(contract.barometer)} závažnosť
            </Badge>
            <Badge variant="outline">{contract.sector}</Badge>
            <Badge variant="outline">{contract.region}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Základné informácie</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Hodnota zákazky:</span>
                    <p className="text-gray-900">{formatValue(contract.value)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Termín podania:</span>
                    <p className="text-gray-900">{new Date(contract.deadline).toLocaleDateString('sk-SK')}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Obstarávateľ:</span>
                    <p className="text-gray-900">{contract.contracting_authority}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Región:</span>
                    <p className="text-gray-900">{contract.region}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Kategorizácia</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Odvetvie:</span>
                    <p className="text-gray-900">{contract.sector}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Kategória hodnoty:</span>
                    <p className="text-gray-900">
                      {contract.valueCategory === 'low' && 'Do 500 tisíc €'}
                      {contract.valueCategory === 'medium' && 'Do 5 miliónov €'}
                      {contract.valueCategory === 'high' && 'Nad 5 miliónov €'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Popis zákazky</h3>
              <p className="text-gray-900 text-sm leading-relaxed">{contract.description}</p>
            </div>
          </div>

          {contract.additional_info && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Dodatočné informácie</h3>
              <p className="text-gray-900 text-sm leading-relaxed">{contract.additional_info}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
