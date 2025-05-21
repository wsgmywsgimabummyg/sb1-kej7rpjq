"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Platform } from "@/lib/types";
import { platformConfigs } from "@/lib/data";
import { useTaskStore } from "@/lib/store";
import { useState } from "react";
import { Instagram, Twitter, Linkedin, Facebook, Video, Youtube, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlatformCardProps {
  platform: Platform;
}

const platformIcons: Record<Platform, React.ReactNode> = {
  instagram: <Instagram className="h-6 w-6" />,
  twitter: <Twitter className="h-6 w-6" />,
  linkedin: <Linkedin className="h-6 w-6" />,
  tiktok: <Video className="h-6 w-6" />,
  youtube: <Youtube className="h-6 w-6" />,
  facebook: <Facebook className="h-6 w-6" />,
};

export function PlatformCard({ platform }: PlatformCardProps) {
  const { user, addPlatform, removePlatform } = useTaskStore();
  const [error, setError] = useState<string | null>(null);
  
  const isPlatformAdded = user.platforms.includes(platform);
  const config = platformConfigs[platform];
  
  const handleAddRemove = () => {
    if (isPlatformAdded) {
      removePlatform(platform);
    } else {
      try {
        addPlatform(platform);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }
  };
  
  return (
    <Card className={cn("relative overflow-hidden", isPlatformAdded && "border-primary/50")}>
      {isPlatformAdded && (
        <div className="absolute top-0 right-0 p-1 bg-primary text-primary-foreground">
          <Check className="h-4 w-4" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="p-2 rounded-md" 
            style={{ 
              backgroundColor: config.color,
              color: '#fff'
            }}
          >
            {platformIcons[platform]}
          </div>
          <CardTitle>{config.name}</CardTitle>
        </div>
        <CardDescription>
          {isPlatformAdded 
            ? `Track your ${config.name} tasks` 
            : `Add ${config.name} to your platforms`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          <p className="mb-2">Default tasks include:</p>
          <ul className="list-disc pl-5 space-y-1">
            {config.defaultTasks.map((task, index) => (
              <li key={index}>{task.title}</li>
            ))}
          </ul>
        </div>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAddRemove}
          variant={isPlatformAdded ? "outline" : "default"}
          className="w-full"
        >
          {isPlatformAdded ? (
            <>Remove Platform</>
          ) : (
            <><Plus className="mr-1 h-4 w-4" /> Add Platform</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}