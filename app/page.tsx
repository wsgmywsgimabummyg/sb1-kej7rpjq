"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/lib/store";
import { OverviewCard } from "@/components/dashboard/overview-card";
import { PlatformStats } from "@/components/dashboard/platform-stats";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { tasks, resetTasks, user } = useTaskStore();

  // Initialize tasks if none exist
  useEffect(() => {
    if (tasks.length === 0) {
      resetTasks();
    }
  }, [tasks, resetTasks]);

  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Welcome to PostPilot</h1>
      
      <div className="grid gap-6 mb-8">
        <OverviewCard />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ProgressChart />
        <PlatformStats />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Daily Tasks</h2>
          <p className="text-muted-foreground mb-4">
            Complete your daily social media tasks to maintain your streak.
          </p>
          <Button asChild>
            <Link href="/tasks">
              Go to Tasks <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Platforms</h2>
          <p className="text-muted-foreground mb-4">
            {user.isPremium 
              ? "Add or manage your social media platforms." 
              : "Free plan includes 2 platforms. Upgrade for more!"}
          </p>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/platforms">
                <Plus className="mr-2 h-4 w-4" /> Add Platform
              </Link>
            </Button>
            
            {!user.isPremium && (
              <Button asChild>
                <Link href="/upgrade">Upgrade to Pro</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}