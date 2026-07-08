export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  streakCount: number;
  xp: number;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reward {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  xpRequired: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  rewards: Reward[];
}

export interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  addXP: (amount: number) => void;
  unlockReward: (rewardId: number) => void;
  updateStreak: (streak: number) => void;
}

export const REWARDS: Reward[] = [
  { id: 1, title: "Neuron Navigator", description: "Completed first topic", icon: "🧠", unlocked: false, xpRequired: 100 },
  { id: 2, title: "Synapse Synchronizer", description: "7-day streak achieved", icon: "⚡", unlocked: false, xpRequired: 500 },
  { id: 3, title: "Hippocampus Hero", description: "10 hours of learning", icon: "🦛", unlocked: false, xpRequired: 1000 },
  { id: 4, title: "Amygdala Ace", description: "Mastered abnormal psychology", icon: "😰", unlocked: false, xpRequired: 2000 },
  { id: 5, title: "Cortex Conqueror", description: "Completed 50 topics", icon: "🧩", unlocked: false, xpRequired: 3000 },
  { id: 6, title: "Dopamine Dynamo", description: "30-day streak", icon: "🎯", unlocked: false, xpRequired: 5000 },
  { id: 7, title: "Mirror Neuron", description: "100 quizzes passed", icon: "🪞", unlocked: false, xpRequired: 7500 },
  { id: 8, title: "Prefrontal Sage", description: "30 days of practice", icon: "🧙", unlocked: false, xpRequired: 10000 },
];

