"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/lib/store";
import { TaskList } from "@/components/tasks/task-list";
import { OverviewCard } from "@/components/dashboard/overview-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function TasksPage() {
  const { selectedPlatform, tasks, resetTasks } = useTaskStore();
  const [showCompleted, setShowCompleted] = useState(true);
  
  // Initialize tasks if none exist
  useEffect(() => {
    if (tasks.length === 0) {
      resetTasks();
    }
  }, [tasks, resetTasks]);

  // Filter tasks based on selected platform and completion status
  const filteredTasks = tasks.filter(task => {
    const platformMatch = !selectedPlatform || task.platform === selectedPlatform;
    const completionMatch = showCompleted ? true : !task.completed;
    return platformMatch && completionMatch;
  });

  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Tasks</h1>
        <p className="text-muted-foreground">
          {selectedPlatform
            ? `Manage your ${selectedPlatform} tasks`
            : "Manage all your social media tasks"}
        </p>
      </div>
      
      <div className="mb-6">
        <OverviewCard />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {selectedPlatform
            ? `${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)} Tasks`
            : "All Tasks"}
        </h2>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="show-completed"
            checked={showCompleted}
            onCheckedChange={setShowCompleted}
          />
          <Label htmlFor="show-completed">Show completed</Label>
        </div>
      </div>
      
      <TaskList platform={selectedPlatform || undefined} />
    </div>
  );
}