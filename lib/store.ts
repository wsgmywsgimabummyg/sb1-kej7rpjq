'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Platform, User, ProgressData } from './types';
import { platformConfigs } from './data';
import { v4 as uuidv4 } from 'uuid';

interface TaskStore {
  tasks: Task[];
  user: User;
  selectedPlatform: Platform | null;
  progress: ProgressData[];
  
  // Actions
  setSelectedPlatform: (platform: Platform | null) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  resetTasks: () => void;
  
  // User actions
  updateUser: (user: Partial<User>) => void;
  addPlatform: (platform: Platform) => void;
  removePlatform: (platform: Platform) => void;
  
  // Stats
  getCompletedTasksToday: () => number;
  getTotalTasksToday: () => number;
  getCompletionRate: () => number;
  getCurrentStreak: () => number;
  updateProgress: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      user: {
        name: 'User',
        email: '',
        platforms: ['instagram', 'twitter'],
        isPremium: false,
        streak: 0,
        lastActive: new Date().toISOString().split('T')[0],
      },
      selectedPlatform: null,
      progress: [],
      
      setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
      
      addTask: (taskData) => {
        const { user } = get();
        const isPlatformAllowed = user.platforms.includes(taskData.platform);
        
        // Free users can only have 3 custom tasks
        const customTaskCount = get().tasks.filter(t => t.custom).length;
        if (taskData.custom && !user.isPremium && customTaskCount >= 3) {
          throw new Error('Free users can only create up to 3 custom tasks');
        }
        
        if (isPlatformAllowed) {
          const task: Task = {
            ...taskData,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
          };
          set((state) => ({ tasks: [...state.tasks, task] }));
        }
      },
      
      toggleTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === id) {
              return {
                ...task,
                completed: !task.completed,
                completedAt: !task.completed ? new Date().toISOString() : undefined,
              };
            }
            return task;
          }),
        }));
        
        // Update progress and streak after toggling a task
        get().updateProgress();
      },
      
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      
      resetTasks: () => {
        const defaultTasks: Task[] = [];
        const { user } = get();
        
        user.platforms.forEach((platform) => {
          platformConfigs[platform].defaultTasks.forEach((task) => {
            defaultTasks.push({
              ...task,
              id: uuidv4(),
              createdAt: new Date().toISOString(),
              completed: false,
              completedAt: undefined,
            });
          });
        });
        
        set({ tasks: defaultTasks });
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },
      
      addPlatform: (platform) => {
        const { user, isPremium } = get();
        // Free users can only have 2 platforms
        if (!user.isPremium && user.platforms.length >= 2 && !user.platforms.includes(platform)) {
          throw new Error('Free users can only access 2 platforms');
        }
        
        if (!user.platforms.includes(platform)) {
          set((state) => ({
            user: {
              ...state.user,
              platforms: [...state.user.platforms, platform],
            },
          }));
          
          // Add default tasks for this platform
          platformConfigs[platform].defaultTasks.forEach((task) => {
            get().addTask({
              title: task.title,
              completed: false,
              platform,
              custom: false,
            });
          });
        }
      },
      
      removePlatform: (platform) => {
        set((state) => ({
          user: {
            ...state.user,
            platforms: state.user.platforms.filter(p => p !== platform),
          },
          tasks: state.tasks.filter(task => task.platform !== platform),
        }));
      },
      
      getCompletedTasksToday: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().tasks.filter(task => {
          if (!task.completedAt) return false;
          return task.completedAt.split('T')[0] === today && task.completed;
        }).length;
      },
      
      getTotalTasksToday: () => {
        return get().tasks.length;
      },
      
      getCompletionRate: () => {
        const completed = get().getCompletedTasksToday();
        const total = get().getTotalTasksToday();
        return total > 0 ? (completed / total) * 100 : 0;
      },
      
      getCurrentStreak: () => {
        return get().user.streak;
      },
      
      updateProgress: () => {
        const today = new Date().toISOString().split('T')[0];
        const { tasks, user, progress } = get();
        
        // Check if we already have a progress entry for today
        const todayProgress = progress.find(p => p.date === today);
        const completedToday = tasks.filter(t => t.completed && t.completedAt?.split('T')[0] === today).length;
        const totalToday = tasks.length;
        
        // Update progress
        set((state) => ({
          progress: todayProgress
            ? state.progress.map(p => (p.date === today ? { ...p, completed: completedToday, total: totalToday } : p))
            : [...state.progress, { date: today, completed: completedToday, total: totalToday }],
        }));
        
        // Update streak logic
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        // Check if we had activity yesterday or today is the first day
        const hasYesterdayActivity = progress.some(p => p.date === yesterdayStr && p.completed > 0);
        const hasTodayActivity = completedToday > 0;
        
        if (hasTodayActivity) {
          // If today has activity and yesterday had activity (or it's the first day), increment streak
          if (hasYesterdayActivity || progress.length === 0 || user.lastActive !== yesterdayStr) {
            set((state) => ({
              user: {
                ...state.user,
                streak: state.user.streak + 1,
                lastActive: today,
              },
            }));
          }
        } else if (user.lastActive !== today && !hasYesterdayActivity) {
          // Reset streak if no activity today and yesterday
          set((state) => ({
            user: {
              ...state.user,
              streak: 0,
            },
          }));
        }
      },
    }),
    {
      name: 'postpilot-storage',
    }
  )
);