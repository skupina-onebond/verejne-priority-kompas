
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
    'ICT', 'Zdravotnictví', 'Stavebnictví', 'Doprava', 'Vzdělávání',
    'Energetika', 'Životní prostředí', 'Sociální služby'
  ];

  const regions = [
    'Hlavní město Praha', 'Jihomoravský kraj', 'Moravskoslezský kraj', 'Ústecký kraj',
    'Plzeňský kraj', 'Jihočeský kraj', 'Pardubický kraj', 'Královéhradecký kraj',
    'Vysočina', 'Olomoucký kraj', 'Zlínský kraj', 'Liberecký kraj', 'Karlovarský kraj', 'Středočeský kraj'
  ];

  const valueCategories = [
    { value: 'low', label: 'Do 500 tisíc Kč' },
    { value: 'medium', label: 'Do 5 milionů Kč' },
    { value: 'high', label: 'Nad 5 milionů Kč' }
  ];

  const barometerLevels = [
    { value: 'low', label: 'Nízká závažnost' },
    { value: 'medium', label: 'Střední závažnost' },
    { value: 'high', label: 'Vysoká závažnost' }
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
          <span className="font-medium text-gray-700">Filtry:</span>
          
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="justify-between min-w-[140px]">
                {valueCategories.find(v => v.value === filters.value)?.label || 'Hodnota zakázky'}
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
                {barometerLevels.find(b => b.value === filters.barometer)?.label || 'Závažnost'}
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
              Zrušit filtry
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
