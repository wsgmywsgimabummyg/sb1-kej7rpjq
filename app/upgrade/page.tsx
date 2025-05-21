"use client";

import { useTaskStore } from "@/lib/store";
import { PricingCard } from "@/components/pricing/pricing-card";
import { plans } from "@/lib/data";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function UpgradePage() {
  const [isYearly, setIsYearly] = useState(true);
  const { user } = useTaskStore();
  
  // Calculate savings
  const monthlyCost = plans[1].price.monthly * 12;
  const yearlyCost = plans[1].price.yearly;
  const savingsPercentage = Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
  
  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Upgrade to PostPilot Pro</h1>
        <p className="text-xl text-muted-foreground">
          Take your social media consistency to the next level
        </p>
      </div>
      
      <div className="flex justify-center items-center gap-2 mb-10">
        <Label htmlFor="billing-toggle" className={!isYearly ? "font-medium" : ""}>
          Monthly
        </Label>
        <Switch
          id="billing-toggle"
          checked={isYearly}
          onCheckedChange={setIsYearly}
        />
        <div className="flex items-center gap-1">
          <Label htmlFor="billing-toggle" className={isYearly ? "font-medium" : ""}>
            Yearly
          </Label>
          {isYearly && (
            <span className="inline-block bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              Save {savingsPercentage}%
            </span>
          )}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <PricingCard key={plan.type} plan={plan} isYearly={isYearly} />
        ))}
      </div>
      
      <div className="mt-12 border-t pt-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Can I cancel my subscription?</h3>
              <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to Pro features until the end of your billing period.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, including Visa, Mastercard, and American Express. We also support PayPal.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">How does the free trial work?</h3>
              <p className="text-muted-foreground">The Pro plan comes with a 7-day free trial. You won't be charged until the trial period ends, and you can cancel anytime before that.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Can I get a refund?</h3>
              <p className="text-muted-foreground">We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact us within 30 days of purchase for a full refund.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}