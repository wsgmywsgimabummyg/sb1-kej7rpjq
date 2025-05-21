import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isToday, isYesterday, isThisWeek } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date in a human-readable format
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, 'h:mm a')}`;
  } else if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, 'h:mm a')}`;
  } else if (isThisWeek(dateObj)) {
    return format(dateObj, 'EEEE');
  } else {
    return format(dateObj, 'MMM d, yyyy');
  }
}

// Calculate streak indicator based on count
export function getStreakEmoji(streak: number): string {
  if (streak <= 0) return 'Day';
  if (streak === 1) return 'Day';
  return 'Days';
}

// Return a motivational message based on completion rate
export function getMotivationalMessage(completionRate: number): string {
  if (completionRate === 100) return "Perfect! You're crushing it!";
  if (completionRate >= 75) return "Great progress! Keep it up!";
  if (completionRate >= 50) return "Halfway there! You can do it!";
  if (completionRate >= 25) return "Good start! Keep pushing!";
  if (completionRate > 0) return "Every step counts! Keep going!";
  return "Ready to start? Let's do this!";
}

// Return color based on completion rate
export function getProgressColor(completionRate: number): string {
  if (completionRate >= 80) return 'bg-green-500';
  if (completionRate >= 50) return 'bg-yellow-500';
  if (completionRate > 0) return 'bg-orange-500';
  return 'bg-gray-300';
}