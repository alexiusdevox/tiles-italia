import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { useRecentViewedStore } from '@/lib/recentViewedStore';

export function RecentlyViewed() {
    const { items, lastViewed } = useRecentViewedStore();

    if (items.length === 0) return null;

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
                {items
                    .filter((product) => product.id !== lastViewed?.id)
                    .slice(0, 5)
                    .map((product) => (
                        <Link href={`/products/${product.slug}`} key={product.id}>
                            <Card className="w-48 flex-shrink-0 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="aspect-square w-full overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </CardContent>
                                <div className="p-2">
                                    <h3 className="font-semibold text-sm">{product.name}</h3>
                                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                                </div>
                            </Card>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
