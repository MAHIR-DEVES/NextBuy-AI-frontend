import { Truck } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PromoBanner1Props {
  threshold?: number;
  currentAmount?: number;
  className?: string;
}

const PromoBanner1 = ({
  threshold = 75,
  currentAmount = 45,
  className,
}: PromoBanner1Props) => {
  const progress = Math.min((currentAmount / threshold) * 100, 100);
  const remaining = threshold - currentAmount;
  const hasQualified = remaining <= 0;

  return (
    <div className={cn("w-full bg-primary text-primary-foreground", className)}>
      <div className="container flex items-center justify-center gap-3 py-2.5">
        <Truck className="size-4 shrink-0" />
        {hasQualified ? (
          <p className="text-sm font-medium">
            🎉 You&apos;ve unlocked FREE shipping!
          </p>
        ) : (
          <div className="flex items-center gap-3">
            <p className="shrink-0 text-sm">
              Spend{" "}
              <span className="font-semibold">${remaining.toFixed(2)}</span>{" "}
              more for <span className="font-semibold">FREE shipping</span>
            </p>
            <Progress
              value={progress}
              className="dark hidden h-1.5 w-24 sm:block"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export { PromoBanner1 };
