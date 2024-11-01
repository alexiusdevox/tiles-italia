'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from '@/lib/models/ProductModel';

interface FilterState {
  effect: string[];
  brand: string[];
  surface: string[];
  thickness: number[];
  antislip: string[];
  priceRange: [number | null, number | null];
  application: string;
  setting: string;
  size: string[];
  environment: string;
}


interface FiltersAsideProps {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  products: Product[];
  removeFilter: (filterType: keyof FilterState, value: string | number) => void;
}

interface FiltersAsideProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  products: Product[];
}

interface FilterCounts {
  [key: string]: {
    [value: string]: number;
  };
}

export default function FiltersAside({ filters, setFilters, products }: FiltersAsideProps) {
  const [counts, setCounts] = useState<FilterCounts>({
    effect: {},
    brand: {},
    surface: {},
    thickness: {},
    antislip: {},
    application: {},
    setting: {},
    size: {},
    environment: {},
  });

  const [openItems, setOpenItems] = useState<string[]>([
    'setting',
    'effect',
    'brand',
    'surface',
    'thickness',
    'antislip',
    'priceRange',
    'application',
    'size',
    'environment'
  ]);

  const wallSizes = [
    '5x15 cm', '5x20 cm', '5x25 cm', '5x30 cm', '6x24 cm', '6x25 cm', '7x15 cm', '7x30 cm',
    '7,5x20 cm', '7,5x30 cm', '10x10 cm', '10x20 cm', '10x30 cm', '14,5x19,4 cm', '15x15 cm',
    '15x20 cm', '15x30 cm', '15x61 cm', '17x17 cm', '20x20 cm', '25x40 cm', '30x60 cm',
    '50x120 cm', '60x60 cm', '60x119,5 cm', '60x120 cm', '120x240 cm', '120x278 cm', '160x320 cm'
  ];

  const floorSizes = [
    '60x60 cm', '60x119.5 cm', '60x120 cm', '75x150 cm', '90x90 cm', '120x120 cm',
    '20x120 cm', '120x240 cm', '120x278 cm', '160x320 cm'
  ];

  useEffect(() => {
    const calculateCounts = () => {
      const newCounts: FilterCounts = {
        effect: {},
        brand: {},
        surface: {},
        thickness: {},
        antislip: {},
        application: {},
        setting: {},
        size: {},
        environment: {},
      };

      products.forEach(product => {
        // Count for checkbox filters
        ['effect', 'brand', 'surface', 'thickness', 'antislip', 'size'].forEach(key => {
          const value = product[key as keyof Product];
          if (value) {
            newCounts[key][value] = (newCounts[key][value] || 0) + 1;
          }
        });

        // Count for radio filters
        ['application', 'setting'].forEach(key => {
          const value = product[key as keyof Product];
          if (value) {
            newCounts[key][value] = (newCounts[key][value] || 0) + 1;
          }
        });
      });

      setCounts(newCounts);
    };

    calculateCounts();
  }, [products]);

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters((prev: FilterState) => ({
      ...prev,
      [filterType]: value
    }));
  };

  const renderFilterCheckboxes = (filterType: keyof FilterState, options: string[]) => {
    return options.map((option) => (
      <div className="flex items-center justify-between space-x-2" key={option}>
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`${filterType}-${option}`}
            checked={Array.isArray(filters[filterType])
              ? (filters[filterType] as string[]).includes(option)
              : filters[filterType] === option}
            onCheckedChange={(checked) => {
              if (Array.isArray(filters[filterType])) {
                if (checked) {
                  handleFilterChange(filterType, [...filters[filterType] as string[], option]);
                } else {
                  handleFilterChange(filterType, (filters[filterType] as string[]).filter(item => item !== option));
                }
              } else {
                handleFilterChange(filterType, checked ? option : '');
              }
            }}
          />
          <Label htmlFor={`${filterType}-${option}`} className="flex items-center">
            <span>{option}</span>
          </Label>
        </div>
        <span className="text-sm text-muted-foreground pr-1">
          {counts[filterType][option] || 0}
        </span>
      </div>
    ));
  };

  const renderRadioFilter = (filterType: 'application' | 'setting', options: string[]) => {
    return (
      <RadioGroup
        value={filters[filterType]}
        onValueChange={(value) => handleFilterChange(filterType, value)}
      >
        {options.map(option => (
          <div key={option} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`${filterType}-${option.toLowerCase()}`} />
              <Label htmlFor={`${filterType}-${option.toLowerCase()}`}>{option}</Label>
            </div>
            <span className="text-sm text-muted-foreground pr-1">
              {counts[filterType][option] || 0}
            </span>
          </div>
        ))}
      </RadioGroup>
    );
  };

  return (
    <Card className="border-t border-x-0 border-b-0 rounded-none shadow-none">
      <CardContent className="py-3 px-0">
        <Accordion
          type="multiple"
          className="w-full"
          value={openItems}
          onValueChange={setOpenItems}
        >
          <AccordionItem value="application">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">
              Application
            </AccordionTrigger>
            <AccordionContent>
              {renderRadioFilter('application', ['Wall', 'Floor'])}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="setting">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">
              Setting
            </AccordionTrigger>
            <AccordionContent>
              {renderRadioFilter('setting', ['Indoor', 'Outdoor'])}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="surface">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Surface</AccordionTrigger>
            <AccordionContent className="space-y-1">
              {renderFilterCheckboxes('surface', ['Matt', 'Glossy'])}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="effect">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Effect</AccordionTrigger>
            <AccordionContent className="space-y-1">
              {renderFilterCheckboxes('effect', ['Marble', 'Concrete', 'Wood', 'Stone', 'Metal', 'Terrazzo', 'Terracotta', 'Decor'])}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="size">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Size</AccordionTrigger>
            <AccordionContent className="space-y-1">
              {renderFilterCheckboxes('size', filters.application === 'Wall' ? wallSizes : floorSizes)}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="thickness">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Thickness</AccordionTrigger>
            <AccordionContent className="space-y-1">
              {renderFilterCheckboxes('thickness', [6, 8.5, 9].map(value => `${value} mm`).concat([1, 2].map(value => `${value} cm`)))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="antislip">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Antislip</AccordionTrigger>
            <AccordionContent className="space-y-1">
              {renderFilterCheckboxes('antislip', ['R9', 'R10', 'R11', 'R12'])}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="brand">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Brand</AccordionTrigger>
            <AccordionContent className="space-y-1">
              {renderFilterCheckboxes('brand', ['Cotto Furnò', 'Marazzi', 'Paul Ceramiche'])}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="priceRange">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Price Range</AccordionTrigger>
            <AccordionContent className="space-y-1">
              <div className="flex items-center space-x-4">
                <Input
                  type="number"
                  value={filters.priceRange[0] ?? ''}
                  placeholder="Min"
                  onChange={(e) => handleFilterChange('priceRange', [e.target.value ? Number(e.target.value) : null, filters.priceRange[1]])}
                  className="w-20"
                />
                <span>to</span>
                <Input
                  type="number"
                  value={filters.priceRange[1] ?? ''}
                  placeholder="Max"
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], e.target.value ? Number(e.target.value) : null])}
                  className="w-20"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}