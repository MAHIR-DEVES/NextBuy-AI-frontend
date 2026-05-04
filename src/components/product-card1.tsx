import { Price, PriceValue } from "@/components/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

interface Product {
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

const PRODUCT_CARD: Product = {
  name: "Vexon CoreStep '08 LX",
  image: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/joshua-diaz-ETNoDLl8yFE-unsplash-1.jpg",
    alt: "",
  },
  link: "#",
  description:
    "Everyday comfort meets bold tri-color style in this performance-driven design.",
  price: {
    regular: 499.0,
    sale: 399.0,
    currency: "USD",
  },
  badge: {
    text: "Selling fast!",
    backgroundColor: "oklch(50.5% 0.213 27.518)",
  },
};

interface ProductCard1Props {
  className?: string;
}

const ProductCard1 = ({ className }: ProductCard1Props) => {
  const { regular, sale, currency } = PRODUCT_CARD.price;

  return (
    <a
      href={PRODUCT_CARD.link}
      className={cn(
        "block max-w-md transition-opacity hover:opacity-80",
        className,
      )}
    >
      <Card className="h-full overflow-hidden p-0">
        <CardHeader className="relative block p-0">
          <AspectRatio ratio={1.268115942} className="overflow-hidden">
            <img
              src={PRODUCT_CARD.image.src}
              alt={PRODUCT_CARD.image.alt}
              className="block size-full object-cover object-center"
            />
          </AspectRatio>
          {PRODUCT_CARD.badge && (
            <Badge
              style={{
                background: PRODUCT_CARD.badge.backgroundColor,
              }}
              className="absolute start-4 top-4"
            >
              {PRODUCT_CARD.badge.text}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-4 pb-6">
          <CardTitle className="text-xl font-semibold">
            {PRODUCT_CARD.name}
          </CardTitle>
          <CardDescription className="font-medium text-muted-foreground">
            {PRODUCT_CARD.description}
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
    </a>
  );
};

export { ProductCard1 };
