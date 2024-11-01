import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { Badge } from "./ui/badge";

type FilterState = {
    brand: string[];
    surface: string[];
    effect: string[];
    thickness: number[];
    priceRange: [number | null, number | null];
    antislip: string[];
};

type SelectedFiltersProps = {
    filters: FilterState;
    removeFilter: (filterType: keyof FilterState, value: string | number) => void;
};

export default function SelectedFilters({ filters, removeFilter }: SelectedFiltersProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, values]) => {
                if (key === 'priceRange') {
                    // Gestisci i priceRange se necessario
                    return null;
                }

                return Array.isArray(values) && values.map((value) => {
                    if (value !== null) { // Verifica che il valore non sia null
                        return (
                            <Badge
                                key={`${key}-${value}`}
                                onClick={() => removeFilter(key as keyof FilterState, value)}
                                className="flex items-center gap-1 mb-4"
                            >
                                {value}
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove {key} filter: {value}</span>
                            </Badge>
                        );
                    }
                    return null; // Restituisci null se il valore è null
                });
            })}
        </div>
    );
}
