"use client";

import { useState } from "react";
import { Task } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, X, Check } from "lucide-react";
import { useTaskStore } from "@/lib/store";
import { platformConfigs } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const platformColor = platformConfigs[task.platform].color;

  const handleToggle = () => {
    toggleTask(task.id);
  };

  const handleDelete = () => {
    // Only allow deleting custom tasks
    if (task.custom) {
      deleteTask(task.id);
    }
  };

  const handleEditSubmit = () => {
    if (editValue.trim() && editValue !== task.title) {
      // We would update the task here if we had an update function
      // For now, we'll just exit editing mode
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      className="flex items-center justify-between p-3 border rounded-lg bg-card hover:shadow-sm transition-all"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.01 }}
      style={{
        borderLeftWidth: "4px",
        borderLeftColor: task.platform ? platformColor : undefined,
      }}
    >
      <div className="flex items-center flex-1">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={handleToggle}
          className="mr-3 h-5 w-5 rounded-full transition-all"
        />
        
        {isEditing ? (
          <div className="flex items-center flex-1">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditSubmit();
                if (e.key === "Escape") setIsEditing(false);
              }}
            />
            <div className="flex items-center ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleEditSubmit}
                className="h-8 w-8"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <label
            htmlFor={`task-${task.id}`}
            className={`flex-1 cursor-pointer ${
              task.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </label>
        )}
      </div>
      
      {!isEditing && task.custom && (
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}