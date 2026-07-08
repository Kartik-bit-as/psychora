// ======================================================
// Psychora Neural Tree Engine
// Single Source of Truth
// ======================================================

import type {
  BranchType,
  NodeStatus,
  TreeNode,
  TreeStats,
} from "../types";

import { allKnowledgeNodes } from "@/knowledge";

// ======================================================
// MASTER NODE COLLECTION
// ======================================================

export const treeNodes: TreeNode[] = allKnowledgeNodes.flat();
// ======================================================
// NODE MAP
// O(1) lookup by id
// ======================================================

export const nodeMap = new Map<string, TreeNode>();

treeNodes.forEach((node) => {
  nodeMap.set(node.id, node);
});

// ======================================================
// PARENT MAP
// child -> parent
// ======================================================

export const parentMap = new Map<string, string>();

treeNodes.forEach((node) => {
  if (node.parent) {
    parentMap.set(node.id, node.parent);
  }
});

// ======================================================
// CHILDREN MAP
// parent -> children
// ======================================================

export const childrenMap = new Map<string, TreeNode[]>();

treeNodes.forEach((node) => {
  childrenMap.set(node.id, []);
});

treeNodes.forEach((node) => {
  if (!node.parent) return;

  const children = childrenMap.get(node.parent);

  if (children) {
    children.push(node);
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

["locked", "available", "learning", "mastered"].forEach((status) => {
  statusMap.set(status as NodeStatus, []);
});

treeNodes.forEach((node) => {
  statusMap.get(node.status)?.push(node);
});

// ======================================================
// BASIC FILTERS
// ======================================================

export const unlockedNodes = treeNodes.filter((n) => n.unlocked);

export const visibleNodes = treeNodes.filter((n) => n.visible);

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

export const rootNode =
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

  if (!node.prerequisites || node.prerequisites.length === 0)
    return true;

  return node.prerequisites.every((pre) => {
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
      node.tags?.some((tag) => tag.toLowerCase().includes(q))
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

export function validateTree() {
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

    node.prerequisites?.forEach((pre) => {
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

export function walkTree(
  callback: (node: TreeNode) => void
) {
  treeNodes.forEach(callback);
}

// ======================================================
// RANDOM NODE
// ======================================================

export function getRandomNode(): TreeNode {
  return treeNodes[
    Math.floor(Math.random() * treeNodes.length)
  ];
}

// ======================================================
// RECENTLY UNLOCKED
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

  return getChildren(node.parent).filter(
    (child) => child.id !== id
  );
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
// BRANCH STATISTICS
// ======================================================

export function getBranchStatistics(
  branch: BranchType
) {
  const nodes = getBranchNodes(branch);

  return {
    total: nodes.length,

    mastered: nodes.filter(
      (n) => n.status === "mastered"
    ).length,

    learning: nodes.filter(
      (n) => n.status === "learning"
    ).length,

    available: nodes.filter(
      (n) => n.status === "available"
    ).length,

    locked: nodes.filter(
      (n) => n.status === "locked"
    ).length,

    xp: nodes.reduce(
      (sum, node) => sum + node.xp,
      0
    ),

    progress:
      nodes.length === 0
        ? 0
        : Math.round(
            nodes.reduce(
              (sum, node) => sum + node.progress,
              0
            ) / nodes.length
          ),
  };
}

// ======================================================
// SORT HELPERS
// ======================================================

export const sortedByXP = [...treeNodes].sort(
  (a, b) => b.xp - a.xp
);

export const sortedByLevel = [...treeNodes].sort(
  (a, b) => a.level - b.level
);

export const sortedAlphabetically = [...treeNodes].sort(
  (a, b) => a.title.localeCompare(b.title)
);

// ======================================================
// DEFAULT EXPORTS
// ======================================================

export default {
  treeNodes,

  nodeMap,

  parentMap,

  childrenMap,

  branchMap,

  statusMap,

  rootNode,

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

  validateTree,
};
