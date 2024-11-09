import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '@/lib/models/ProductModel';
import Link from 'next/link';

type RelatedProductsProps = {
  currentProduct: Product;
};

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentProduct) {
      fetchRelatedProducts();
    }
  }, [currentProduct]);

  const fetchRelatedProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .neq('id', currentProduct.id);

    if (error) {
      console.error('Error fetching related products:', error);
      setIsLoading(false);
      return;
    }

    const filteredRelatedProducts = data.filter((product) =>
      product.brand === currentProduct.brand ||
      product.surface === currentProduct.surface ||
      product.effect === currentProduct.effect ||
      product.thickness === currentProduct.thickness ||
      product.application === currentProduct.application
    );

    setRelatedProducts(filteredRelatedProducts.slice(0, 4));
    setIsLoading(false);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.id}>
              <Card key={product.id} className="overflow-hidden">
                <div className="relative h-full flex flex-col">
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                  <img
                      src={Array.isArray(product.image) ? product.image[0] : product.image || ''}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}