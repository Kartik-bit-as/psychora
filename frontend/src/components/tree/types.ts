// ======================================================
// Psychora Neural Tree Types (v3)
// Single Source of Truth
// ======================================================

import type { LucideIcon } from "lucide-react";

// ======================================================
// NODE STATUS
// ======================================================

export type NodeStatus =
  | "locked"
  | "available"
  | "learning"
  | "mastered";

// ======================================================
// DIFFICULTY
// ======================================================

export type Difficulty =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

// ======================================================
// BRANCH TYPES
// ======================================================

export type BranchType =
  | "root"
  | "core"
  | "cognitive"
  | "biological"
  | "social"
  | "personality"
  | "developmental"
  | "clinical"
  | "research"
  | "statistics"
  | (string & {});

// ======================================================
// TREE NODE
// ======================================================

export interface TreeNode {
  // Identity
  id: string;

  // Content
  title: string;
  subtitle?: string;
  description?: string;

  // Classification
  branch: BranchType;
  difficulty?: Difficulty;

  // Learning
  level: number;
  xp: number;

  status: NodeStatus;

  progress: number;
  completed: number;
  total: number;

  estimatedMinutes?: number;

  // Graph
  parent: string | null;
  children: string[];

  prerequisites?: string[];

  // Visibility
  unlocked: boolean;
  visible: boolean;

  // Canvas Position
  x: number;
  y: number;

  radius: number;

  // Visuals
  color: string;

  glow?: boolean;
  glowColor?: string;

  icon?: LucideIcon;

  /**
   * Used by knowledge files.
   * Converted to Lucide component later.
   */
  iconName?: string;

  // Metadata
  tags?: string[];

  // Future Expansion
  order?: number;
  category?: string;
  module?: string;
}

// ======================================================
// TREE BRANCH
// ======================================================

export interface TreeBranch {
  id: string;

  parent: string;

  child: string;

  color: string;

  width?: number;

  opacity?: number;

  animated?: boolean;

  dashed?: boolean;

  curved?: boolean;
}

// ======================================================
// SVG CONNECTION
// ======================================================

export interface BranchConnection {
  from: {
    x: number;
    y: number;
  };

  to: {
    x: number;
    y: number;
  };

  color: string;

  width?: number;

  opacity?: number;
}

// ======================================================
// TREE STATS
// ======================================================

export interface TreeStats {
  totalConcepts: number;

  totalConnections: number;

  mastered: number;

  learning: number;

  available?: number;

  locked: number;

  xp: number;

  level: number;
}

// ======================================================
// PARTICLES
// ======================================================

export interface FloatingParticle {
  id: string;

  x: number;
  y: number;

  size: number;

  color: string;

  duration: number;

  delay: number;

  opacity: number;
}

// ======================================================
// LEGEND
// ======================================================

export interface TreeLegendItem {
  id: string;

  title: string;

  subtitle: string;

  color: string;
}

// ======================================================
// MODAL
// ======================================================

export interface NodeModalData {
  node: TreeNode | null;

  open: boolean;
}

// ======================================================
// ZOOM
// ======================================================

export interface ZoomState {
  scale: number;

  x: number;

  y: number;
}
