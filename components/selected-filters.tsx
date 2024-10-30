import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { Badge } from "./ui/badge";

type FilterState = {
    manufacturer: string[];
    surface: string[];
    effect: string[];
    thickness: number[];
    priceRange: [number, number];
    antislip: string[];
};

type SelectedFiltersProps = {
    filters: FilterState;
    removeFilter: (filterType: keyof FilterState, value: string | number) => void;
};

export default function SelectedFilters({ filters, removeFilter }: SelectedFiltersProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, values]) =>
                key !== 'priceRange' && Array.isArray(values) && values.map((value) => (
                    <Badge
                        key={`${key}-${value}`}
                        onClick={() => removeFilter(key as keyof FilterState, value)}
                        className="flex items-center gap-1 mb-4"
                    >
                        {value}
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove {key} filter: {value}</span>
                    </Badge>
                ))
            )}
        </div>
    );
}