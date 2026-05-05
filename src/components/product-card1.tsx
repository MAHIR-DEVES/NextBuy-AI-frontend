import { Price, PriceValue } from '@/components/price';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

interface Product {
  id: number;
  name: string;
  image: {
    src: string;
    alt: string;
  };
  link: string;
  description: string;
  price: ProductPrice;
  badge: {
    text: string;
    backgroundColor?: string;
  };
}

const ProductCard1 = ({
  product,
}: {
  product: Product;
  className?: string;
}) => {
  const { regular, sale, currency } = product.price;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full overflow-hidden p-0">
        <CardHeader className="relative block p-0">
          <AspectRatio ratio={1.268115942} className="overflow-hidden">
            <img
              src={product.image.src}
              alt={product.image.alt}
              className="block size-full object-cover object-center"
            />
          </AspectRatio>
          {product.badge && (
            <Badge
              style={{
                background: product.badge.backgroundColor,
              }}
              className="absolute start-4 top-4"
            >
              {product.badge.text}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="flex h-full flex-col md:gap-4 pb-6">
          <CardTitle className="md:text-xl font-semibold">
            {product.name}
          </CardTitle>
          <CardDescription className="font-medium text-muted-foreground">
            {product.description}
          </CardDescription>
          <div className="mt-auto">
            <Price onSale={sale != null} className="text-lg font-semibold">
              <PriceValue
                price={regular}
                currency={currency}
                variant="regular"
              />
              <PriceValue price={sale} currency={currency} variant="sale" />
            </Price>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export { ProductCard1 };
