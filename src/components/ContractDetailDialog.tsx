import React, { useState } from "react";
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
import { deepSearch } from "@/lib/deepSearch";

interface ContractDetailDialogProps {
  contract: PublicContract;
  isOpen: boolean;
  onClose: () => void;
}

export const ContractDetailDialog: React.FC<ContractDetailDialogProps> = ({
  contract,
  isOpen,
  onClose,
}) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDeepSearch = async () => {
  try {
    setLoading(true);

    // 🧠 Použi predvyplnenú analýzu z mock dát, ak je dostupná
    if (contract.analysis) {
      setAnalysis(contract.analysis);
      return;
    }

    // 🌍 Inak spusti API DeepSearch
    const result = await deepSearch(contract.contracting_authority);
    setAnalysis(result);
  } catch (err) {
    setAnalysis("❌ Nepodařilo se načíst výsledek.");
  } finally {
    setLoading(false);
  }
};

  const getBarometerColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-orange-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getBarometerText = (level: string) => {
    switch (level) {
      case "high":
        return "Vysoká";
      case "medium":
        return "Střední";
      case "low":
        return "Nízká";
      default:
        return level;
    }
  };

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("cs-CZ", {
      style: "currency",
      currency: "CZK",
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
                    <p className="text-gray-900">{new Date(contract.deadline).toLocaleDateString("cs-CZ")}</p>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div>
                      <span className="font-medium text-gray-700">Zadavatel:</span>
                      <p className="text-gray-900">{contract.contracting_authority}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDeepSearch}
                      className="text-indigo-600 hover:text-indigo-800"
                      disabled={loading}
                    >
                      {loading ? "Analyzuji..." : "Prověřit"}
                      <Search className="ml-1 w-4 h-4" />
                    </Button>
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
                      {contract.valueCategory === "low" && "Do 500 tisíc Kč"}
                      {contract.valueCategory === "medium" && "Do 5 milionů Kč"}
                      {contract.valueCategory === "high" && "Nad 5 milionů Kč"}
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

          {analysis && (
  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
    <h3 className="font-semibold text-blue-900 text-lg mb-2">Analýza zadavatele</h3>
    <p className="text-sm text-blue-800 whitespace-pre-line">{analysis}</p>
  </div>
)}
        </div>
      </DialogContent>
    </Dialog>
  );
};
