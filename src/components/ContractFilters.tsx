import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface ContractFiltersProps {
  filters: {
    sector: string;
    region: string;
    valueMin: number;
    valueMax: number;
    sortBy: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const ContractFilters: React.FC<ContractFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const sectors = [
    'ICT', 'Zdravotnictví', 'Stavebnictví', 'Doprava', 'Vzdělávání',
    'Energetika', 'Životní prostředí', 'Sociální služby'
  ];

  const regions = [
    'Hlavní město Praha', 'Jihomoravský kraj', 'Moravskoslezský kraj', 'Ústecký kraj',
    'Plzeňský kraj', 'Jihočeský kraj', 'Pardubický kraj', 'Královéhradecký kraj',
    'Vysočina', 'Olomoucký kraj', 'Zlínský kraj', 'Liberecký kraj', 'Karlovarský kraj', 'Středočeský kraj'
  ];


  const sortOptions = [
  { value: 'risk_low', label: 'Závažnost: Od nejnižší po nejvyšší' },
  { value: 'risk_high', label: 'Závažnost: Od nejvyšší po nejnižší' },
  { value: 'value_high', label: 'Cena: Od nejdražší po nejlevnější' },
  { value: 'value_low', label: 'Cena: Od nejlevnější po nejdražší' }
];

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: filters[key] === value ? '' : value
    });
  };


  const clearFilters = () => {
    onFiltersChange({
      sector: '',
      region: '',
      valueMin: 0,
      valueMax: 10000000,
      sortBy: ''
    });
};

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="font-medium text-gray-700">Filtry:</span>

          {/* Odvětví */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between min-w-[120px]">
                {filters.sector || 'Odvětví'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sectors.map(sector => (
                <DropdownMenuItem
                  key={sector}
                  onClick={() => updateFilter('sector', sector)}
                  className={filters.sector === sector ? 'bg-blue-50' : ''}
                >
                  {sector}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Region */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between min-w-[120px]">
                {filters.region || 'Region'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {regions.map(region => (
                <DropdownMenuItem
                  key={region}
                  onClick={() => updateFilter('region', region)}
                  className={filters.region === region ? 'bg-blue-50' : ''}
                >
                  {region}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hodnota zakázky – optimalizovaný vzhled */}
<div className="flex flex-col items-start gap-1 min-w-[240px]">
  <label className="text-sm text-gray-700 font-medium mb-1">
    Hodnota zakázky (Kč)
  </label>

  <div className="relative w-[240px] h-6">
    {/* Range min */}
    <input
      type="range"
      min={0}
      max={10000000}
      step={50000}
      value={filters.valueMin}
      onChange={(e) =>
        onFiltersChange({
          ...filters,
          valueMin: Math.min(Number(e.target.value), filters.valueMax),
        })
      }
      className="absolute w-full pointer-events-none appearance-none bg-transparent z-10 [&::-webkit-slider-thumb]:pointer-events-auto"
    />
    {/* Range max */}
    <input
      type="range"
      min={0}
      max={10000000}
      step={50000}
      value={filters.valueMax}
      onChange={(e) =>
        onFiltersChange({
          ...filters,
          valueMax: Math.max(Number(e.target.value), filters.valueMin),
        })
      }
      className="absolute w-full pointer-events-none appearance-none bg-transparent z-20 [&::-webkit-slider-thumb]:pointer-events-auto"
    />
    {/* Track background */}
    <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-[4px] bg-gray-200 rounded-full" />
  </div>

  <div className="flex justify-between w-full text-xs text-gray-600 mt-1">
    <span>{filters.valueMin.toLocaleString("cs-CZ")} Kč</span>
    <span>{filters.valueMax.toLocaleString("cs-CZ")} Kč</span>
  </div>
</div>

          {/* Řazení */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between min-w-[180px]">
                {sortOptions.find(s => s.value === filters.sortBy)?.label || 'Řadit podle'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortOptions.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => updateFilter('sortBy', option.value)}
                  className={filters.sortBy === option.value ? 'bg-blue-50' : ''}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reset */}
        {(filters.sector || filters.region || filters.sortBy || filters.valueMin > 0 || filters.valueMax < 10000000) && (
        <Button variant="ghost" onClick={clearFilters} className="text-red-600">
              Zrušit filtry
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
