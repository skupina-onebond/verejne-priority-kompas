import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PublicContractCard } from "@/components/PublicContractCard";
import { ContractFilters } from "@/components/ContractFilters";
import { mockContracts } from "@/data/mockContracts";
import { PublicContract, ContractStatus } from "@/types/contract";

const ContractListPage = () => {
  const [contracts, setContracts] = useState<PublicContract[]>(mockContracts);
  const [filters, setFilters] = useState({
    sector: '',
    region: '',
    valueMin: 0,
    valueMax: 10000000,
    sortBy: ''
  });

  const updateContractStatus = (id: string, status: ContractStatus) => {
    setContracts(prev => prev.map(contract =>
      contract.id === id ? { ...contract, status } : contract
    ));
  };

  const moveContract = (id: string, direction: "up" | "down") => {
    setContracts(prev => {
      const currentIndex = prev.findIndex(contract => contract.id === id);
      if (currentIndex === -1) return prev;

      const newIndex = direction === "up"
        ? Math.max(0, currentIndex - 1)
        : Math.min(prev.length - 1, currentIndex + 1);

      const newContracts = [...prev];
      const [movedContract] = newContracts.splice(currentIndex, 1);
      newContracts.splice(newIndex, 0, movedContract);

      return newContracts;
    });
  };

  const handleDeepSearch = (subjectName: string) => {
    console.log('Deep search for:', subjectName);
  };

  const filteredContracts = useMemo(() => {
    return contracts.filter(contract => {
      if (filters.sector && contract.sector !== filters.sector) return false;
      if (filters.region && contract.region !== filters.region) return false;
      if (contract.value < filters.valueMin || contract.value > filters.valueMax) return false;
      return true;
    });
  }, [contracts, filters]);

  const sortContracts = (contracts: PublicContract[]) => {
    const sorted = [...contracts];

    switch (filters.sortBy) {
      case 'risk_high':
        return sorted.sort((a, b) => b.riskScore - a.riskScore);
      case 'risk_low':
        return sorted.sort((a, b) => a.riskScore - b.riskScore);
      case 'value_high':
        return sorted.sort((a, b) => b.value - a.value);
      case 'value_low':
        return sorted.sort((a, b) => a.value - b.value);
      default:
        return sorted;
    }
  };

  const activeContracts = sortContracts(
    filteredContracts.filter(c => c.status === 'active')
  );
  const bookmarkedContracts = sortContracts(
    filteredContracts.filter(c => c.status === 'bookmarked')
  );
  const hiddenContracts = sortContracts(
    filteredContracts.filter(c => c.status === 'hidden')
  );

  const completedContracts = sortContracts(
    filteredContracts.filter(c => c.status === 'completed')
  );

  return (
      <div
  className="min-h-screen"
  style={{
    fontFamily: 'Open Sans, sans-serif',
    background: 'linear-gradient(to bottom, #f7fafd, #edf3f8, #dce7f0)'
  }}
>   
  <div className="container mx-auto p-6 relative">
        <div className="absolute top-6 left-6">
          <img src="/Doris-logo.png" alt="Logo Doris" className="h-7" />
        </div>

        <div className="mb-6 mt-10">
          <p className="text-gray-600">
            Analýza veřejných zakázek a jejich efektivní kontrola
          </p>
        </div>

        <ContractFilters filters={filters} onFiltersChange={setFilters} />

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="active" className="flex items-center gap-2">
              Aktivní
              <Badge variant="secondary">{activeContracts.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="bookmarked" className="flex items-center gap-2">
              Uložené
              <Badge variant="secondary">{bookmarkedContracts.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="hidden" className="flex items-center gap-2">
              Skryté
              <Badge variant="secondary">{hiddenContracts.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              Zkontrolované
              <Badge variant="secondary">{completedContracts.length}</Badge>
            </TabsTrigger>
            
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeContracts.map(contract => (
              <PublicContractCard
                key={contract.id}
                contract={contract}
                onStatusChange={updateContractStatus}
                onMove={moveContract}
                onDeepSearch={handleDeepSearch}
              />
            ))}
            {activeContracts.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Žádné aktivní zakázky</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="bookmarked" className="space-y-4">
            {bookmarkedContracts.map(contract => (
              <PublicContractCard
                key={contract.id}
                contract={contract}
                onStatusChange={updateContractStatus}
                onMove={moveContract}
                onDeepSearch={handleDeepSearch}
              />
            ))}
            {bookmarkedContracts.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Žádné uložené zakázky</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="hidden" className="space-y-4">
            {hiddenContracts.map(contract => (
              <PublicContractCard
                key={contract.id}
                contract={contract}
                onStatusChange={updateContractStatus}
                onMove={moveContract}
                onDeepSearch={handleDeepSearch}
              />
            ))}
            {hiddenContracts.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Žádné skryté zakázky</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedContracts.map(contract => (
              <PublicContractCard
                key={contract.id}
                contract={contract}
                currentTab="completed"
                onStatusChange={updateContractStatus}
                onMove={moveContract}
                onDeepSearch={handleDeepSearch}
              />
            ))}
            {completedContracts.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Žádné zkontrolované zakázky</p>
                </CardContent>
              </Card>
            )}
</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContractListPage;
