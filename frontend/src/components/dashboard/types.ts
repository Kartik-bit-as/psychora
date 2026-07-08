import type React from "react";

export interface User {
  name?: string;
}

export interface UserStats {
  streakDays: number;
  progress: number;
  completedTopics: number;
  hoursLearned: number;
}

export interface LearningSubject {
  id: number;
  title: string;
  topicCount: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tint: string;
  iconBg: string;
}

export interface ContinueLearningItem {
  id: number;
  title: string;
  subject: string;
  lesson: string;
  progress: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  bg: string;
}

export interface Reward {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface ActivityItem {
  id: number;
  action: string;
  time: string;
}

export interface ProgressItem {
  label: string;
  value: number;
}

export interface StreakDay {
  d: string;
  done: boolean;
  today?: boolean;
}

export interface ToolItem {
  label: string;
  hint: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface DailyGoal {
  id: number;
  label: string;
  done: boolean;
}

export interface StatProps {
  value: string;
  label: string;
}

// Hero and ProgressPanel now read from stores — no props needed
// export interface HeroProps { ... } // REMOVED
// export interface ProgressPanelProps { ... } // REMOVED

export interface SubjectGridProps {
  subjects: LearningSubject[];
}

export interface ContinueLearningProps {
  items: ContinueLearningItem[];
}
