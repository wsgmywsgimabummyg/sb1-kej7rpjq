"use client";

import { useTaskStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getMotivationalMessage, getProgressColor, getStreakEmoji } from "@/lib/utils";

export function OverviewCard() {
  const { 
    getCompletedTasksToday, 
    getTotalTasksToday, 
    getCompletionRate,
    getCurrentStreak
  } = useTaskStore();

  const completedTasks = getCompletedTasksToday();
  const totalTasks = getTotalTasksToday();
  const completionRate = getCompletionRate();
  const streak = getCurrentStreak();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Today's Progress</span>
          <span className="text-lg flex items-center gap-1">
            {streak} {getStreakEmoji(streak)}
          </span>
        </CardTitle>
        <CardDescription>
          {getMotivationalMessage(completionRate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress 
            value={completionRate} 
            className="h-2 transition-all duration-500" 
          />
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Completed {completedTasks} of {totalTasks} tasks
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">
                {completionRate.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}