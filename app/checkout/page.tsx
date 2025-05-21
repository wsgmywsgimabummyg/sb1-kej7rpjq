"use client";

import { useTaskStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { updateUser } = useTaskStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Update user status
      updateUser({ isPremium: true });
      
      // Redirect after a delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }, 1500);
  };
  
  if (isComplete) {
    return (
      <div className="container px-4 py-12 max-w-md mx-auto">
        <Card className="border-green-500">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <CardTitle className="text-center">Payment Successful!</CardTitle>
            <CardDescription className="text-center">
              Thank you for upgrading to PostPilot Pro
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p>You now have access to all premium features.</p>
            <p className="text-muted-foreground mt-2">
              Redirecting you to the dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Complete Your Purchase</h1>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Enter your credit card information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-name">Cardholder Name</Label>
              <Input id="card-name" placeholder="John Smith" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input 
                id="card-number" 
                placeholder="1234 5678 9012 3456" 
                required 
                pattern="[0-9\s]{13,19}"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" required pattern="[0-9]{2}/[0-9]{2}" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" required pattern="[0-9]{3,4}" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              type="submit" 
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay $79.00"}
            </Button>
          </CardFooter>
        </Card>
      </form>
      
      <p className="mt-4 text-sm text-center text-muted-foreground">
        Your payment information is secure and encrypted
      </p>
    </div>
  );
}