import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { Plan } from "@/lib/types";
import Link from "next/link";
import { useTaskStore } from "@/lib/store";

interface PricingCardProps {
  plan: Plan;
  isYearly?: boolean;
}

export function PricingCard({ plan, isYearly = false }: PricingCardProps) {
  const { user } = useTaskStore();
  const price = isYearly ? plan.price.yearly : plan.price.monthly;
  
  const isCurrent = (plan.type === 'free' && !user.isPremium) || 
                   (plan.type === 'pro' && user.isPremium);
  
  return (
    <Card className={`w-full ${plan.type === 'pro' ? 'border-primary/50 shadow-lg' : ''}`}>
      <CardHeader>
        <CardTitle>{plan.title}</CardTitle>
        <CardDescription>
          {plan.type === 'free' ? 'Get started for free' : 'Unlock all features'}
        </CardDescription>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground">
            {price > 0 ? (isYearly ? "/year" : "/month") : ""}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-medium">{feature.title}</p>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={plan.type === 'pro' ? "default" : "outline"}
          asChild
          disabled={isCurrent}
        >
          {isCurrent ? (
            <span>Current Plan</span>
          ) : (
            <Link href={plan.type === 'free' ? "/" : "/checkout"}>
              {plan.type === 'free' ? 'Get Started' : 'Upgrade Now'}
            </Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}