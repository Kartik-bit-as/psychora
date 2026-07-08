// ======================================================
// Psychora Neural Tree Engine
// Single Source of Truth — Zero-Dependency Edition
// ======================================================

// ======================================================
// INLINED TYPES (no external imports needed)
// ======================================================

export type BranchType =
  | "cognitive"
  | "developmental"
  | "personality"
  | "clinical"
  | "social"
  | "biological"
  | "research"
  | "history";

export type NodeStatus =
  | "locked"
  | "available"
  | "learning"
  | "mastered";

export interface TreeNode {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  parent: string | null;
  children?: string[];
  prerequisites?: string[];
  branch: BranchType;
  status: NodeStatus;
  level: number;
  unlocked: boolean;
  visible?: boolean;
  progress: number;
  completed: number;
  total: number;
  xp: number;
}

export interface TreeStats {
  totalConcepts: number;
  totalConnections: number;
  mastered: number;
  learning: number;
  locked: number;
  xp: number;
  level: number;
}

// ======================================================
// KNOWLEDGE IMPORT
// ======================================================

import { allKnowledgeNodes } from "@/knowledge";

// ======================================================
// TYPE NORMALIZATION
// Handles TreeNode[] | TreeNode[][] from @/knowledge
// ======================================================

const rawNodes: unknown = allKnowledgeNodes;

function normalizeNodes(input: unknown): TreeNode[] {
  if (!Array.isArray(input)) {
    console.error("[Psychora Tree] allKnowledgeNodes is not an array");
    return [];
  }

  const flattened: unknown[] = input.flat();
  return flattened as TreeNode[];
}

// ======================================================
// MASTER NODE COLLECTION
// ======================================================

export const treeNodes: TreeNode[] = normalizeNodes(rawNodes);

// ======================================================
// NODE MAP — O(1) lookup by id
// ======================================================

export const nodeMap = new Map<string, TreeNode>();

treeNodes.forEach((node) => {
  nodeMap.set(node.id, node);
});

// ======================================================
// PARENT MAP — child id → parent id
// ======================================================

export const parentMap = new Map<string, string>();

treeNodes.forEach((node) => {
  if (node.parent !== null && node.parent !== undefined) {
    parentMap.set(node.id, node.parent);
  }
});

// ======================================================
// CHILDREN MAP — parent id → children nodes
// ======================================================

export const childrenMap = new Map<string, TreeNode[]>();

// Initialize empty arrays for all nodes
treeNodes.forEach((node) => {
  childrenMap.set(node.id, []);
});

// Populate children
treeNodes.forEach((node) => {
  if (!node.parent) return;

  const siblings = childrenMap.get(node.parent);

  if (siblings) {
    siblings.push(node);
  }
});

// ======================================================
// BRANCH INDEX
// ======================================================

export const branchMap = new Map<BranchType, TreeNode[]>();

treeNodes.forEach((node) => {
  if (!branchMap.has(node.branch)) {
    branchMap.set(node.branch, []);
  }

  branchMap.get(node.branch)!.push(node);
});

// ======================================================
// STATUS INDEX
// ======================================================

export const statusMap = new Map<NodeStatus, TreeNode[]>();

(["locked", "available", "learning", "mastered"] as NodeStatus[]).forEach(
  (status) => {
    statusMap.set(status, []);
  }
);

treeNodes.forEach((node) => {
  statusMap.get(node.status)?.push(node);
});

// ======================================================
// BASIC FILTERS
// ======================================================

export const unlockedNodes = treeNodes.filter((n) => n.unlocked);

// Safe visible filter — handles TreeNodes without 'visible' property
export const visibleNodes = treeNodes.filter((n) => {
  return "visible" in n ? n.visible : n.unlocked;
});

export const masteredNodes = treeNodes.filter(
  (n) => n.status === "mastered"
);

export const learningNodes = treeNodes.filter(
  (n) => n.status === "learning"
);

export const availableNodes = treeNodes.filter(
  (n) => n.status === "available"
);

export const lockedNodes = treeNodes.filter(
  (n) => n.status === "locked"
);

// ======================================================
// ROOT NODE
// ======================================================

export const rootNode: TreeNode =
  treeNodes.find((n) => n.parent === null || n.parent === undefined) ??
  treeNodes[0];

// ======================================================
// BASIC LOOKUPS
// ======================================================

export function getNode(id: string): TreeNode | undefined {
  return nodeMap.get(id);
}

export function hasNode(id: string): boolean {
  return nodeMap.has(id);
}

export function getParent(id: string): TreeNode | undefined {
  const parentId = parentMap.get(id);

  if (!parentId) return undefined;

  return nodeMap.get(parentId);
}

export function getChildren(id: string): TreeNode[] {
  return childrenMap.get(id) ?? [];
}

export function hasChildren(id: string): boolean {
  return getChildren(id).length > 0;
}

export function isRoot(id: string): boolean {
  return getParent(id) === undefined;
}

export function isLeaf(id: string): boolean {
  return getChildren(id).length === 0;
}

// ======================================================
// GRAPH TRAVERSAL
// ======================================================

export function getAncestors(id: string): TreeNode[] {
  const ancestors: TreeNode[] = [];

  let current = getParent(id);

  while (current) {
    ancestors.push(current);
    current = getParent(current.id);
  }

  return ancestors;
}

export function getDescendants(id: string): TreeNode[] {
  const descendants: TreeNode[] = [];

  function dfs(nodeId: string) {
    const children = getChildren(nodeId);

    children.forEach((child) => {
      descendants.push(child);
      dfs(child.id);
    });
  }

  dfs(id);

  return descendants;
}

// ======================================================
// BRANCH HELPERS
// ======================================================

export function getBranchNodes(branch: BranchType): TreeNode[] {
  return branchMap.get(branch) ?? [];
}

export function getRootNodes(): TreeNode[] {
  return treeNodes.filter(
    (node) => node.parent === null || node.parent === undefined
  );
}

export function getLeafNodes(): TreeNode[] {
  return treeNodes.filter((node) => getChildren(node.id).length === 0);
}

// ======================================================
// STATUS HELPERS
// ======================================================

export function getNodesByStatus(status: NodeStatus): TreeNode[] {
  return statusMap.get(status) ?? [];
}

export function isUnlocked(id: string): boolean {
  const node = getNode(id);

  if (!node) return false;

  return node.unlocked;
}

export function isCompleted(id: string): boolean {
  const node = getNode(id);

  if (!node) return false;

  return node.status === "mastered";
}

export function canUnlock(id: string): boolean {
  const node = getNode(id);

  if (!node) return false;

  if (!node.prerequisites || node.prerequisites.length === 0) return true;

  return node.prerequisites.every((pre: string) => {
    const prerequisite = getNode(pre);

    return prerequisite?.status === "mastered";
  });
}

// ======================================================
// SEARCH
// ======================================================

export function searchNodes(query: string): TreeNode[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase();

  return treeNodes.filter((node) => {
    return (
      node.title.toLowerCase().includes(q) ||
      node.subtitle?.toLowerCase().includes(q) ||
      node.description?.toLowerCase().includes(q) ||
      node.tags?.some((tag: string) => tag.toLowerCase().includes(q))
    );
  });
}

// ======================================================
// LEVEL HELPERS
// ======================================================

export function getNodesByLevel(level: number): TreeNode[] {
  return treeNodes.filter((node) => node.level === level);
}

export function getMaxLevel(): number {
  if (treeNodes.length === 0) return 0;
  return Math.max(...treeNodes.map((node) => node.level));
}

// ======================================================
// PROGRESS HELPERS
// ======================================================

export function getCompletionPercentage(node: TreeNode): number {
  if (node.total === 0) return 0;

  return Math.round((node.completed / node.total) * 100);
}

export function getBranchProgress(branch: BranchType): number {
  const nodes = getBranchNodes(branch);

  if (!nodes.length) return 0;

  const total = nodes.reduce((sum, node) => sum + node.progress, 0);

  return Math.round(total / nodes.length);
}

// ======================================================
// XP HELPERS
// ======================================================

export function getTotalXP(): number {
  return treeNodes.reduce((sum, node) => sum + node.xp, 0);
}

export function getEarnedXP(): number {
  return treeNodes
    .filter((node) => node.status === "mastered")
    .reduce((sum, node) => sum + node.xp, 0);
}

export function getRemainingXP(): number {
  return getTotalXP() - getEarnedXP();
}

// ======================================================
// NODE COUNTS
// ======================================================

export function getNodeCount(): number {
  return treeNodes.length;
}

export function getCompletedCount(): number {
  return masteredNodes.length;
}

export function getLearningCount(): number {
  return learningNodes.length;
}

export function getAvailableCount(): number {
  return availableNodes.length;
}

export function getLockedCount(): number {
  return lockedNodes.length;
}

// ======================================================
// TREE STATISTICS
// ======================================================

export function getTreeStats(): TreeStats {
  const totalConcepts = treeNodes.length;

  const totalConnections = treeNodes.filter(
    (node) => node.parent !== null && node.parent !== undefined
  ).length;

  return {
    totalConcepts,
    totalConnections,
    mastered: masteredNodes.length,
    learning: learningNodes.length,
    locked: lockedNodes.length,
    xp: getEarnedXP(),
    level: getMaxLevel(),
  };
}

// ======================================================
// VALIDATION
// ======================================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateTree(): ValidationResult {
  const errors: string[] = [];

  const ids = new Set<string>();

  treeNodes.forEach((node) => {
    if (ids.has(node.id)) {
      errors.push(`Duplicate node id: ${node.id}`);
    }

    ids.add(node.id);
  });

  treeNodes.forEach((node) => {
    if (node.parent && !nodeMap.has(node.parent)) {
      errors.push(
        `Missing parent '${node.parent}' for node '${node.id}'`
      );
    }

    node.prerequisites?.forEach((pre: string) => {
      if (!nodeMap.has(pre)) {
        errors.push(
          `Missing prerequisite '${pre}' for node '${node.id}'`
        );
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ======================================================
// TREE WALKER
// ======================================================

export function walkTree(callback: (node: TreeNode) => void): void {
  treeNodes.forEach(callback);
}

// ======================================================
// RANDOM NODE
// ======================================================

export function getRandomNode(): TreeNode {
  return treeNodes[Math.floor(Math.random() * treeNodes.length)];
}

// ======================================================
// UNLOCKED NODES
// ======================================================

export function getUnlockedNodes(): TreeNode[] {
  return unlockedNodes;
}

// ======================================================
// AVAILABLE NEXT NODES
// ======================================================

export function getNextAvailableNodes(): TreeNode[] {
  return treeNodes.filter(
    (node) =>
      !node.unlocked &&
      node.status === "locked" &&
      canUnlock(node.id)
  );
}

// ======================================================
// GRAPH HELPERS
// ======================================================

export function getSiblingNodes(id: string): TreeNode[] {
  const node = getNode(id);

  if (!node?.parent) return [];

  return getChildren(node.parent).filter((child) => child.id !== id);
}

export function getDepth(id: string): number {
  return getAncestors(id).length;
}

export function getHeight(id: string): number {
  return getDescendants(id).reduce(
    (max, node) => Math.max(max, node.level),
    getNode(id)?.level ?? 0
  );
}

// ======================================================
// PATH HELPERS
// ======================================================

export function getPathToNode(id: string): TreeNode[] {
  const node = getNode(id);
  if (!node) return [];

  return [...getAncestors(id).reverse(), node];
}

export function getPathFromRoot(id: string): TreeNode[] {
  return getPathToNode(id);
}

// ======================================================
// BRANCH STATISTICS
// ======================================================

export interface BranchStats {
  total: number;
  mastered: number;
  learning: number;
  available: number;
  locked: number;
  xp: number;
  progress: number;
}

export function getBranchStatistics(branch: BranchType): BranchStats {
  const nodes = getBranchNodes(branch);

  const total = nodes.length;
  const masteredCount = nodes.filter((n) => n.status === "mastered").length;
  const learningCount = nodes.filter((n) => n.status === "learning").length;
  const availableCount = nodes.filter((n) => n.status === "available").length;
  const lockedCount = nodes.filter((n) => n.status === "locked").length;
  const xp = nodes.reduce((sum, node) => sum + node.xp, 0);
  const progress =
    total === 0
      ? 0
      : Math.round(
          nodes.reduce((sum, node) => sum + node.progress, 0) / total
        );

  return {
    total,
    mastered: masteredCount,
    learning: learningCount,
    available: availableCount,
    locked: lockedCount,
    xp,
    progress,
  };
}

// ======================================================
// SORT HELPERS
// ======================================================

export const sortedByXP = [...treeNodes].sort((a, b) => b.xp - a.xp);

export const sortedByLevel = [...treeNodes].sort((a, b) => a.level - b.level);

export const sortedAlphabetically = [...treeNodes].sort((a, b) =>
  a.title.localeCompare(b.title)
);

export const sortedByProgress = [...treeNodes].sort(
  (a, b) => b.progress - a.progress
);

// ======================================================
// RECOMMENDATION ENGINE
// ======================================================

export function getRecommendedNode(): TreeNode | undefined {
  const candidates =
    availableNodes.length > 0
      ? availableNodes
      : learningNodes.length > 0
      ? learningNodes
      : undefined;

  if (!candidates || candidates.length === 0) return undefined;

  return [...candidates].sort((a, b) => b.xp - a.xp)[0];
}

export function getStreakNodes(): TreeNode[] {
  return treeNodes.filter(
    (n) => n.status === "learning" && n.progress > 0 && n.progress < 100
  );
}

// ======================================================
// MILESTONE HELPERS
// ======================================================

export function getMilestoneProgress(): {
  total: number;
  completed: number;
  percentage: number;
} {
  const total = treeNodes.length;
  const completed = masteredNodes.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { total, completed, percentage };
}

// ======================================================
// DEFAULT EXPORT
// ======================================================

export default {
  treeNodes,
  nodeMap,
  parentMap,
  childrenMap,
  branchMap,
  statusMap,
  rootNode,
  unlockedNodes,
  visibleNodes,
  masteredNodes,
  learningNodes,
  availableNodes,
  lockedNodes,
  getNode,
  getChildren,
  getParent,
  getAncestors,
  getDescendants,
  getBranchNodes,
  getNodesByStatus,
  searchNodes,
  getTreeStats,
  getBranchStatistics,
  getTotalXP,
  getEarnedXP,
  getRemainingXP,
  getRandomNode,
  getUnlockedNodes,
  getNextAvailableNodes,
  getSiblingNodes,
  getDepth,
  getHeight,
  getPathToNode,
  getPathFromRoot,
  getRootNodes,
  getLeafNodes,
  isRoot,
  isLeaf,
  isUnlocked,
  isCompleted,
  canUnlock,
  hasChildren,
  validateTree,
  walkTree,
  sortedByXP,
  sortedByLevel,
  sortedAlphabetically,
  sortedByProgress,
  getRecommendedNode,
  getStreakNodes,
  getMilestoneProgress,
};
