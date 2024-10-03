// components/ProductCard.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  slug: string;
};

export default function ProductCard({ id, name, price, image, slug }: ProductCardProps) {
  return (
    <Card key={id}>
      <CardContent className="p-4">
        <Link href={`/products/${slug}`}>
          <img src={image} alt={name} className="w-full h-48 object-cover mb-4 rounded" />
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <p className="text-2xl font-bold mt-2">${price.toFixed(2)}</p>
          <Button className="w-full mt-4">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
