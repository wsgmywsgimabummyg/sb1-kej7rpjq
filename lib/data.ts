import { Platform, PlatformConfig, Plan, Task } from './types';

// Platform configurations
export const platformConfigs: Record<Platform, PlatformConfig> = {
  instagram: {
    name: 'Instagram',
    color: '#E1306C',
    icon: 'instagram',
    defaultTasks: [
      {
        id: 'ig-post',
        title: 'Post 1 photo',
        completed: false,
        platform: 'instagram',
        createdAt: new Date().toISOString(),
        custom: false,
      },
      {
        id: 'ig-story',
        title: 'Share 3 stories',
        completed: false,
        platform: 'instagram',
        createdAt: new Date().toISOString(),
        custom: false,
      },
      {
        id: 'ig-comment',
        title: 'Comment on 5 posts',
        completed: false,
        platform: 'instagram',
        createdAt: new Date().toISOString(),
        custom: false,
      },
    ],
  },
  twitter: {
    name: 'X',
    color: '#1DA1F2',
    icon: 'twitter',
    defaultTasks: [
      {
        id: 'tw-tweet',
        title: 'Post 2 tweets',
        completed: false,
        platform: 'twitter',
        createdAt: new Date().toISOString(),
        custom: false,
      },
      {
        id: 'tw-reply',
        title: 'Reply to 3 tweets',
        completed: false,
        platform: 'twitter',
        createdAt: new Date().toISOString(),
        custom: false,
      },
    ],
  },
  tiktok: {
    name: 'TikTok',
    color: '#000000',
    icon: 'video',
    defaultTasks: [
      {
        id: 'tt-video',
        title: 'Post 1 video',
        completed: false,
        platform: 'tiktok',
        createdAt: new Date().toISOString(),
        custom: false,
      },
      {
        id: 'tt-engage',
        title: 'Engage with 10 videos',
        completed: false,
        platform: 'tiktok',
        createdAt: new Date().toISOString(),
        custom: false,
      },
    ],
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0077B5',
    icon: 'linkedin',
    defaultTasks: [
      {
        id: 'li-post',
        title: 'Share 1 professional update',
        completed: false,
        platform: 'linkedin',
        createdAt: new Date().toISOString(),
        custom: false,
      },
      {
        id: 'li-connect',
        title: 'Connect with 2 people',
        completed: false,
        platform: 'linkedin',
        createdAt: new Date().toISOString(),
        custom: false,
      },
    ],
  },
  youtube: {
    name: 'YouTube',
    color: '#FF0000',
    icon: 'youtube',
    defaultTasks: [
      {
        id: 'yt-comment',
        title: 'Comment on 3 videos',
        completed: false,
        platform: 'youtube',
        createdAt: new Date().toISOString(),
        custom: false,
      },
    ],
  },
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    icon: 'facebook',
    defaultTasks: [
      {
        id: 'fb-post',
        title: 'Share 1 update',
        completed: false,
        platform: 'facebook',
        createdAt: new Date().toISOString(),
        custom: false,
      },
    ],
  },
};

// Subscription plans
export const plans: Plan[] = [
  {
    type: 'free',
    title: 'Free',
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      {
        title: 'Access to 2 platforms',
        description: 'Track tasks for Instagram and Twitter',
        included: true,
      },
      {
        title: 'Up to 3 custom tasks',
        description: 'Create your own custom tasks',
        included: true,
      },
      {
        title: 'Basic habit tracking',
        description: 'View your daily progress',
        included: true,
      },
      {
        title: 'Unlimited platforms',
        description: 'Track tasks across all social platforms',
        included: false,
      },
      {
        title: 'Advanced analytics',
        description: 'In-depth stats about your posting habits',
        included: false,
      },
      {
        title: 'AI content suggestions',
        description: 'Get content ideas tailored to your niche',
        included: false,
      },
    ],
  },
  {
    type: 'pro',
    title: 'Pro',
    price: {
      monthly: 8,
      yearly: 79,
    },
    features: [
      {
        title: 'Access to 2 platforms',
        description: 'Track tasks for Instagram and Twitter',
        included: true,
      },
      {
        title: 'Up to 3 custom tasks',
        description: 'Create your own custom tasks',
        included: true,
      },
      {
        title: 'Basic habit tracking',
        description: 'View your daily progress',
        included: true,
      },
      {
        title: 'Unlimited platforms',
        description: 'Track tasks across all social platforms',
        included: true,
      },
      {
        title: 'Advanced analytics',
        description: 'In-depth stats about your posting habits',
        included: true,
      },
      {
        title: 'AI content suggestions',
        description: 'Get content ideas tailored to your niche',
        included: true,
      },
    ],
  },
];