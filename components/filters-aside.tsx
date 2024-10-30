'use client'

import { useState, useEffect } from 'react';
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

interface FilterState {
  effect: string[];
  brand: string[];
  surface: string[];
  thickness: string[];
  antislip: string[];
  priceRange: [number, number];
  application: string;
  size: string[];
  environment: string;
}

interface FiltersAsideProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  products: any[]; // Assuming you have a products array passed as a prop
}

export default function FiltersAside({ filters, setFilters, products }: FiltersAsideProps) {
  const [counts, setCounts] = useState<Record<keyof FilterState, Record<string, number>>>({
    effect: {},
    brand: {},
    surface: {},
    thickness: {},
    antislip: {},
    application: {},
    size: {},
    environment: {},
  });

  const [openItems, setOpenItems] = useState<string[]>([
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
    '50x120 cm', '60x60 cm', '60x119.5 cm', '60x120 cm', '120x240 cm', '120x278 cm', '160x320 cm'
  ];

  const floorSizes = [
    '60x60 cm', '60x119.5 cm', '60x120 cm', '75x150 cm', '90x90 cm', '120x120 cm',
    '20x120 cm', '120x240 cm', '120x278 cm', '160x320 cm'
  ];

  useEffect(() => {
    const newCounts: Record<keyof FilterState, Record<string, number>> = {
      effect: {},
      brand: {},
      surface: {},
      thickness: {},
      antislip: {},
      application: {},
      size: {},
      environment: {},
    };

    products.forEach(product => {
      (Object.keys(newCounts) as Array<keyof FilterState>).forEach(key => {
        if (key !== 'priceRange') {
          const value = product[key];
          if (value) {
            newCounts[key][value] = (newCounts[key][value] || 0) + 1;
          }
        }
      });
    });

    setCounts(newCounts);
  }, [products]);

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({
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
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Application</AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                value={filters.application}
                onValueChange={(value) => handleFilterChange('application', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Wall" id="application-wall" />
                  <Label htmlFor="application-wall">Wall</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Floor" id="application-floor" />
                  <Label htmlFor="application-floor">Floor</Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="size">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Size</AccordionTrigger>
            <AccordionContent className="space-y-1">
              {renderFilterCheckboxes('size', filters.application === 'Wall' ? wallSizes : floorSizes)}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="effect">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Effect</AccordionTrigger>
            <AccordionContent className="space-y-1">
              {renderFilterCheckboxes('effect', ['Marble', 'Concrete', 'Wood', 'Stone', 'Metal', 'Terrazzo', 'Terracotta', 'Decor'])}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="brand">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Manufacturer</AccordionTrigger>
            <AccordionContent className="space-y-1">
              {renderFilterCheckboxes('brand', ['Cotto Furnò', 'Marazzi', 'Paul Ceramiche'])}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="surface">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Surface</AccordionTrigger>
            <AccordionContent className="space-y-1">
              {renderFilterCheckboxes('surface', ['Matt', 'Glossy'])}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="thickness">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Thickness</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {renderFilterCheckboxes('thickness', [6, 8.5, 9].map(value => `${value} mm`).concat([1, 2].map(value => `${value} cm`)))}
                <div className="mt-4">
                  <RadioGroup
                    value={filters.environment}
                    onValueChange={(value) => handleFilterChange('environment', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Indoor" id="environment-indoor" />
                      <Label htmlFor="environment-indoor">Indoor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Outdoor" id="environment-outdoor" />
                      <Label htmlFor="environment-outdoor">Outdoor</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="antislip">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Antislip</AccordionTrigger>
            <AccordionContent className="space-y-1">
              {renderFilterCheckboxes('antislip', ['R9', 'R10', 'R11', 'R12'])}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="priceRange">
            <AccordionTrigger className="text-base hover:no-underline font-semibold">Price Range</AccordionTrigger>
            <AccordionContent className="space-y-1">
              <div className="flex items-center space-x-4">
                <Input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])}
                  className="w-20"
                />
                <span>to</span>
                <Input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
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