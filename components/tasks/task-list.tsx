"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTaskStore } from "@/lib/store";
import { TaskItem } from "./task-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { platformConfigs } from "@/lib/data";
import { Platform } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskListProps {
  platform?: Platform;
}

export function TaskList({ platform }: TaskListProps) {
  const { tasks, user, addTask } = useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | undefined>(
    platform
  );
  const [error, setError] = useState<string | null>(null);

  // Filter tasks based on platform
  const filteredTasks = tasks.filter(
    (task) => !platform || task.platform === platform
  );

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    if (!selectedPlatform) {
      setError("Please select a platform");
      return;
    }

    try {
      addTask({
        title: newTaskTitle,
        completed: false,
        platform: selectedPlatform,
        custom: true,
      });
      setNewTaskTitle("");
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          
          {!platform && (
            <Select
              value={selectedPlatform}
              onValueChange={(value) => setSelectedPlatform(value as Platform)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {user.platforms.map((p) => (
                  <SelectItem key={p} value={p}>
                    {platformConfigs[p].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          <Button onClick={handleAddTask}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <AnimatePresence>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <p className="text-muted-foreground">
                No tasks yet. Add a task to get started!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}