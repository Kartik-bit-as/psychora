import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: string;
  icon?: string;
}

interface XPState {
  xp: number;
  level: number;
  streak: number;
  achievements: Achievement[];
}

interface XPActions {
  addXP: (amount: number) => void;
  setLevel: (level: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  unlockAchievement: (achievement: Omit<Achievement, 'unlockedAt'>) => void;
  removeAchievement: (id: string) => void;
  resetXP: () => void;
}

const xpInitialState: XPState = {
  xp: 1240,
  level: 4,
  streak: 12,
  achievements: [
    { id: '1', name: 'Neuron Navigator', description: 'Completed first topic', unlockedAt: '2026-06-15T10:00:00Z', icon: '🧠' },
    { id: '2', name: 'Synapse Synchronizer', description: '7-day streak achieved', unlockedAt: '2026-06-20T10:00:00Z', icon: '⚡' },
    { id: '3', name: 'Hippocampus Hero', description: '10 hours of learning', unlockedAt: '2026-06-25T10:00:00Z', icon: '🦛' },
  ],
};

const XP_PER_LEVEL = 100;

export const useXPStore = create<XPState & XPActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...xpInitialState,

        addXP: (amount) =>
          set(
            (state) => {
              const newXP = state.xp + amount;
              const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
              return {
                xp: newXP,
                level: newLevel > state.level ? newLevel : state.level,
              };
            },
            false,
            'xp/addXP'
          ),

        setLevel: (level) =>
          set({ level: Math.max(1, level) }, false, 'xp/setLevel'),

        incrementStreak: () =>
          set(
            (state) => ({ streak: state.streak + 1 }),
            false,
            'xp/incrementStreak'
          ),

        resetStreak: () => set({ streak: 0 }, false, 'xp/resetStreak'),

        unlockAchievement: (achievement) =>
          set(
            (state) => {
              if (state.achievements.some((a) => a.id === achievement.id)) {
                return state;
              }
              return {
                achievements: [
                  ...state.achievements,
                  { ...achievement, unlockedAt: new Date().toISOString() },
                ],
              };
            },
            false,
            'xp/unlockAchievement'
          ),

        removeAchievement: (id) =>
          set(
            (state) => ({
              achievements: state.achievements.filter((a) => a.id !== id),
            }),
            false,
            'xp/removeAchievement'
          ),

        resetXP: () => set(xpInitialState, false, 'xp/resetXP'),
      }),
      {
        name: 'psychora-xp',
        partialize: (state) => ({
          xp: state.xp,
          level: state.level,
          streak: state.streak,
          achievements: state.achievements,
        }),
      }
    ),
    { name: 'XPStore' }
  )
);
