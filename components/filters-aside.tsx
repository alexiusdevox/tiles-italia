import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FilterState {
  category: string[]
  manufacturer: string[]
  surface: string[]
  effect: string[]
  thickness: string[]
  priceRange: [number, number]
}

export default function FiltersAside() {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    manufacturer: [],
    surface: [],
    effect: [],
    thickness: [],
    priceRange: [0, 1000],
  })

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const renderFilterCheckboxes = (filterType: keyof FilterState, options: string[]) => {
    return options.map((option) => (
      <div className="flex items-center space-x-2" key={option}>
        <Checkbox
          id={`${filterType}-${option}`}
          checked={(filters[filterType] as string[]).includes(option)}
          onCheckedChange={(checked) => {
            if (checked) {
              handleFilterChange(filterType, [...filters[filterType] as string[], option])
            } else {
              handleFilterChange(filterType, (filters[filterType] as string[]).filter(item => item !== option))
            }
          }}
        />
        <Label htmlFor={`${filterType}-${option}`}>{option}</Label>
      </div>
    ))
  }

  const renderFilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Category</h3>
        {renderFilterCheckboxes('category', ['Floor Tiles', 'Wall Tiles', 'Outdoor Tiles', 'Decorative Tiles'])}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Manufacturer</h3>
        {renderFilterCheckboxes('manufacturer', ['CeramicaItaliana', 'TuscanTiles', 'VenetianCraft', 'SicilianArt'])}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Surface</h3>
        {renderFilterCheckboxes('surface', ['Matte', 'Glossy', 'Textured', 'Polished'])}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Effect</h3>
        {renderFilterCheckboxes('effect', ['Wood', 'Marble', 'Concrete', 'Terracotta'])}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Thickness (mm)</h3>
        {renderFilterCheckboxes('thickness', [6, 8, 10, 12, 14].map(String))}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
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
      </div>
    </div>
  )

  return (
    <Card>
      <CardContent className="p-6">
        {/* Mobile version with accordion */}
        <div className="md:hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="filters">
              <AccordionTrigger>Filters</AccordionTrigger>
              <AccordionContent>
                {renderFilterContent()}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Desktop version without accordion */}
        <div className="hidden md:block">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          {renderFilterContent()}
        </div>
      </CardContent>
    </Card>
  )
}