
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
    value: string;
    barometer: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const ContractFilters: React.FC<ContractFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const sectors = [
    'ICT', 'Zdravotníctvo', 'Stavebníctvo', 'Doprava', 'Vzdelávanie',
    'Energetika', 'Životné prostredie', 'Sociálne služby'
  ];

  const regions = [
    'Bratislavský kraj', 'Trnavský kraj', 'Trenčiansky kraj', 'Nitriansky kraj',
    'Žilinský kraj', 'Banskobystrický kraj', 'Prešovský kraj', 'Košický kraj'
  ];

  const valueCategories = [
    { value: 'low', label: 'Do 500 tisíc €' },
    { value: 'medium', label: 'Do 5 miliónov €' },
    { value: 'high', label: 'Nad 5 miliónov €' }
  ];

  const barometerLevels = [
    { value: 'low', label: 'Nízka závažnosť' },
    { value: 'medium', label: 'Stredná závažnosť' },
    { value: 'high', label: 'Vysoká závažnosť' }
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
      value: '',
      barometer: ''
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="font-medium text-gray-700">Filtre:</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between min-w-[120px]">
                {filters.sector || 'Odvetvie'}
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between min-w-[120px]">
                {filters.region || 'Región'}
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between min-w-[140px]">
                {valueCategories.find(v => v.value === filters.value)?.label || 'Hodnota zákazky'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {valueCategories.map(category => (
                <DropdownMenuItem
                  key={category.value}
                  onClick={() => updateFilter('value', category.value)}
                  className={filters.value === category.value ? 'bg-blue-50' : ''}
                >
                  {category.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between min-w-[140px]">
                {barometerLevels.find(b => b.value === filters.barometer)?.label || 'Závažnosť'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {barometerLevels.map(level => (
                <DropdownMenuItem
                  key={level.value}
                  onClick={() => updateFilter('barometer', level.value)}
                  className={filters.barometer === level.value ? 'bg-blue-50' : ''}
                >
                  {level.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {(filters.sector || filters.region || filters.value || filters.barometer) && (
            <Button variant="ghost" onClick={clearFilters} className="text-red-600">
              Zrušiť filtre
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
