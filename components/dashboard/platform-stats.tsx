"use client";

import { useTaskStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { platformConfigs } from "@/lib/data";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export function PlatformStats() {
  const { tasks } = useTaskStore();
  
  // Calculate completion rates by platform
  const platformStats = Object.keys(platformConfigs).map((platform) => {
    const platformTasks = tasks.filter((task) => task.platform === platform);
    const completed = platformTasks.filter((task) => task.completed).length;
    const total = platformTasks.length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    
    return {
      name: platformConfigs[platform as keyof typeof platformConfigs].name,
      value: total > 0 ? total : 0,
      completed,
      total,
      completionRate,
      color: platformConfigs[platform as keyof typeof platformConfigs].color,
    };
  }).filter((platform) => platform.total > 0);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Platform Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {platformStats.length > 0 ? (
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => 
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {platformStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => {
                    return [`${props.payload.completed}/${props.payload.total} (${props.payload.completionRate.toFixed(0)}%)`, name];
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-muted-foreground">No task data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}