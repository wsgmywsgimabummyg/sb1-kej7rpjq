"use client";

import { platformConfigs } from "@/lib/data";
import { Platform } from "@/lib/types";
import { PlatformCard } from "@/components/platform/platform-card";
import Link from "next/link";
import { useTaskStore } from "@/lib/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlatformsPage() {
  const { user } = useTaskStore();
  const platforms = Object.keys(platformConfigs) as Platform[];
  
  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Platforms</h1>
        <p className="text-muted-foreground">
          Manage your social media platforms
        </p>
      </div>
      
      {!user.isPremium && user.platforms.length >= 2 && (
        <Alert className="mb-6">
          <Zap className="h-4 w-4" />
          <AlertTitle>Free plan limitation</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>Free plan is limited to 2 platforms. Upgrade to Pro for unlimited platforms.</span>
            <Button asChild size="sm">
              <Link href="/upgrade">Upgrade</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <PlatformCard key={platform} platform={platform} />
        ))}
      </div>
    </div>
  );
}