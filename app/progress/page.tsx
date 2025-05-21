"use client";

import { useTaskStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { platformConfigs } from "@/lib/data";
import { format } from "date-fns";

export default function ProgressPage() {
  const { tasks, progress, user } = useTaskStore();
  
  // Calculate platform-specific progress
  const platformData = user.platforms.map(platform => {
    const platformTasks = tasks.filter(task => task.platform === platform);
    const completed = platformTasks.filter(task => task.completed).length;
    const total = platformTasks.length;
    
    return {
      name: platformConfigs[platform].name,
      value: completed,
      total,
      color: platformConfigs[platform].color,
    };
  });
  
  // Format data for streak calendar
  const recentProgress = progress.slice(-30).map(day => ({
    date: format(new Date(day.date), "MMM d"),
    value: day.total > 0 ? (day.completed / day.total) * 100 : 0,
    completed: day.completed,
    total: day.total,
  }));
  
  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Progress Tracking</h1>
        <p className="text-muted-foreground">
          Track your social media consistency over time
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
            <CardDescription>Days of consistent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-6">
              <div className="text-center">
                <div className="text-5xl font-bold">{user.streak}</div>
                <div className="text-muted-foreground mt-1">days</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Completion Rate</CardTitle>
            <CardDescription>Average task completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-6">
              <div className="text-center">
                <div className="text-5xl font-bold">
                  {progress.length > 0
                    ? Math.round(
                        (progress.reduce((acc, day) => acc + (day.total > 0 ? day.completed / day.total : 0), 0) /
                          progress.length) *
                          100
                      )
                    : 0}
                  %
                </div>
                <div className="text-muted-foreground mt-1">average</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
            <CardDescription>Tasks completed to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-6">
              <div className="text-center">
                <div className="text-5xl font-bold">
                  {progress.reduce((acc, day) => acc + day.completed, 0)}
                </div>
                <div className="text-muted-foreground mt-1">completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle>Activity Over Time</CardTitle>
            <CardDescription>
              Your daily completion rate over the past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={recentProgress}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 0,
                    bottom: 30,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis unit="%" domain={[0, 100]} />
                  <Tooltip
                    formatter={(value: any, name: any, props: any) => {
                      return [
                        `${props.payload.completed}/${props.payload.total} (${value.toFixed(0)}%)`,
                        "Completion Rate",
                      ];
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Platform Breakdown</CardTitle>
            <CardDescription>Tasks completed by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => {
                      return [`${value}/${props.payload.total}`, name];
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {!user.isPremium && (
        <Card>
          <CardHeader>
            <CardTitle>Unlock Advanced Analytics</CardTitle>
            <CardDescription>
              Upgrade to Pro for detailed analytics and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <p className="mb-4">
                Get access to detailed analytics, content performance metrics, and AI-powered insights.
              </p>
              <Button asChild>
                <Link href="/upgrade">Upgrade to Pro</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}