"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskStore } from "@/lib/store";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { subDays, format } from "date-fns";

export function ProgressChart() {
  const { progress } = useTaskStore();
  
  // Generate data for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateString = date.toISOString().split("T")[0];
    const progressForDay = progress.find((p) => p.date === dateString);
    
    return {
      name: format(date, "EEE"),
      date: dateString,
      completed: progressForDay?.completed || 0,
      total: progressForDay?.total || 0,
      percentage: progressForDay 
        ? Math.round((progressForDay.completed / progressForDay.total) * 100) || 0
        : 0,
    };
  });

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" unit="%" domain={[0, 100]} />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === "Completion Rate") return [`${value}%`, name];
                  return [value, name];
                }}
              />
              <Bar
                yAxisId="left"
                dataKey="percentage"
                name="Completion Rate"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}