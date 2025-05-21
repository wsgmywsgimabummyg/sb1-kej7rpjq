// Types for our application
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  platform: Platform;
  createdAt: string;
  completedAt?: string;
  custom: boolean;
}

export type Platform = 'instagram' | 'twitter' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';

export interface PlatformConfig {
  name: string;
  color: string;
  icon: string;
  defaultTasks: Task[];
}

export interface User {
  name: string;
  email: string;
  platforms: Platform[];
  isPremium: boolean;
  streak: number;
  lastActive: string;
}

export interface ProgressData {
  date: string;
  completed: number;
  total: number;
}

export type PlanType = 'free' | 'pro';

export interface PlanFeature {
  title: string;
  description: string;
  included: boolean;
}

export interface Plan {
  type: PlanType;
  title: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: PlanFeature[];
}