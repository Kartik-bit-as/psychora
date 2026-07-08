// src/components/tree/NeuralTree.tsx
"use client";

import {
  Activity,
  Baby,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  Heart,
  Lightbulb,
  Lock,
  Maximize2,
  MessageCircle,
  Microscope,
  Network,
  Shield,
  Sparkles,
  Star,
  Target,
  TreePine,
  TrendingUp,
  Users,
  Zap,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type NodeStatus = "mastered" | "in-progress" | "locked";

interface ChildNode {
  id: string;
  label: string;
  status: NodeStatus;
  icon: React.ReactNode;
}

interface MainBranch {
  id: string;
  label: string;
  color: string;
  glowColor: string;
  bgColor: string;
  progress: number;
  total: number;
  icon: React.ReactNode;
  children: ChildNode[];
  angle: number; // degrees from root
  distance: number; // px from root
}

interface RecentUnlock {
  id: string;
  label: string;
  branch: string;
  timeAgo: string;
  color: string;
}

interface StatItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const MAIN_BRANCHES: MainBranch[] = [
  {
    id: "biological",
    label: "Biological\nPsychology",
    color: "#22C55E",
    glowColor: "rgba(34,197,94,0.35)",
    bgColor: "rgba(34,197,94,0.08)",
    progress: 12,
    total: 18,
    icon: <Microscope size={20} />,
    angle: -72,
    distance: 220,
    children: [
      { id: "b1", label: "Neuroscience", status: "mastered", icon: <Brain size={14} /> },
      { id: "b2", label: "Neurons", status: "mastered", icon: <Zap size={14} /> },
      { id: "b3", label: "Brain Structure", status: "in-progress", icon: <Activity size={14} /> },
      { id: "b4", label: "Neurotransmitters", status: "locked", icon: <Sparkles size={14} /> },
      { id: "b5", label: "Hormones", status: "locked", icon: <Target size={14} /> },
    ],
  },
  {
    id: "cognitive",
    label: "Cognitive\nPsychology",
    color: "#8B5CF6",
    glowColor: "rgba(139,92,246,0.35)",
    bgColor: "rgba(139,92,246,0.08)",
    progress: 15,
    total: 20,
    icon: <Lightbulb size={20} />,
    angle: -36,
    distance: 240,
    children: [
      { id: "c1", label: "Memory", status: "mastered", icon: <Brain size={14} /> },
      { id: "c2", label: "Attention", status: "mastered", icon: <Eye size={14} /> },
      { id: "c3", label: "Language", status: "in-progress", icon: <MessageCircle size={14} /> },
      { id: "c4", label: "Thinking", status: "in-progress", icon: <Lightbulb size={14} /> },
      { id: "c5", label: "Problem Solving", status: "locked", icon: <Target size={14} /> },
    ],
  },
  {
    id: "social",
    label: "Social\nPsychology",
    color: "#EC4899",
    glowColor: "rgba(236,72,153,0.35)",
    bgColor: "rgba(236,72,153,0.08)",
    progress: 8,
    total: 16,
    icon: <Users size={20} />,
    angle: 0,
    distance: 260,
    children: [
      { id: "s1", label: "Attitudes", status: "mastered", icon: <Heart size={14} /> },
      { id: "s2", label: "Persuasion", status: "in-progress", icon: <MessageCircle size={14} /> },
      { id: "s3", label: "Group Behaviour", status: "in-progress", icon: <Users size={14} /> },
      { id: "s4", label: "Conformity", status: "locked", icon: <Shield size={14} /> },
      { id: "s5", label: "Prejudice", status: "locked", icon: <Eye size={14} /> },
    ],
  },
  {
    id: "developmental",
    label: "Developmental\nPsychology",
    color: "#3B82F6",
    glowColor: "rgba(59,130,246,0.35)",
    bgColor: "rgba(59,130,246,0.08)",
    progress: 10,
    total: 15,
    icon: <Baby size={20} />,
    angle: 36,
    distance: 240,
    children: [
      { id: "d1", label: "Child Dev", status: "mastered", icon: <Baby size={14} /> },
      { id: "d2", label: "Lifespan", status: "in-progress", icon: <TreePine size={14} /> },
      { id: "d3", label: "Attachment", status: "in-progress", icon: <Heart size={14} /> },
      { id: "d4", label: "Moral Dev", status: "locked", icon: <Shield size={14} /> },
      { id: "d5", label: "Cognitive Dev", status: "locked", icon: <Brain size={14} /> },
    ],
  },
  {
    id: "personality",
    label: "Personality\nPsychology",
    color: "#F97316",
    glowColor: "rgba(249,115,22,0.35)",
    bgColor: "rgba(249,115,22,0.08)",
    progress: 6,
    total: 12,
    icon: <Sparkles size={20} />,
    angle: 72,
    distance: 220,
    children: [
      { id: "p1", label: "Traits", status: "mastered", icon: <Star size={14} /> },
      { id: "p2", label: "Assessment", status: "in-progress", icon: <Target size={14} /> },
      { id: "p3", label: "Theories", status: "in-progress", icon: <BookOpen size={14} /> },
      { id: "p4", label: "Research", status: "locked", icon: <Microscope size={14} /> },
      { id: "p5", label: "Disorders", status: "locked", icon: <Activity size={14} /> },
    ],
  },
];

const STATS: StatItem[] = [
  { label: "Total Concepts", value: 81, icon: <TreePine size={16} />, color: "#22C55E" },
  { label: "Connections", value: 124, icon: <Network size={16} />, color: "#8B5CF6" },
  { label: "Mastered", value: 51, icon: <CheckCircle2 size={16} />, color: "#22C55E" },
  { label: "In Progress", value: 18, icon: <Clock size={16} />, color: "#3B82F6" },
  { label: "Locked", value: 12, icon: <Lock size={16} />, color: "#9CA3AF" },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Explore Branches",
    desc: "Navigate through the five core branches of psychology knowledge.",
    color: "#22C55E",
  },
  {
    step: "2",
    title: "Master Concepts",
    desc: "Complete lessons and quizzes to unlock deeper topics.",
    color: "#8B5CF6",
  },
  {
    step: "3",
    title: "Build Connections",
    desc: "See how different areas of psychology interconnect.",
    color: "#EC4899",
  },
  {
    step: "4",
    title: "Track Progress",
    desc: "Monitor your journey with real-time progress indicators.",
    color: "#3B82F6",
  },
];

const RECENT_UNLOCKS: RecentUnlock[] = [
  { id: "r1", label: "Neurotransmitters", branch: "Biological", timeAgo: "2h ago", color: "#22C55E" },
  { id: "r2", label: "Working Memory", branch: "Cognitive", timeAgo: "5h ago", color: "#8B5CF6" },
  { id: "r3", label: "Social Influence", branch: "Social", timeAgo: "1d ago", color: "#EC4899" },
];

const LEGEND_ITEMS = [
  { label: "Core Foundation", color: "#166534", icon: <Brain size={14} /> },
  { label: "Biological", color: "#22C55E", icon: <Microscope size={14} /> },
  { label: "Cognitive", color: "#8B5CF6", icon: <Lightbulb size={14} /> },
  { label: "Social", color: "#EC4899", icon: <Users size={14} /> },
  { label: "Developmental", color: "#3B82F6", icon: <Baby size={14} /> },
  { label: "Personality", color: "#F97316", icon: <Sparkles size={14} /> },
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
};

const getBezierPath = (x1: number, y1: number, x2: number, y2: number, curveStrength: number = 0.5) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const perpX = -dy * curveStrength;
  const perpY = dx * curveStrength;
  const cp1x = mx + perpX * 0.3;
  const cp1y = my + perpY * 0.3;
  const cp2x = mx - perpX * 0.3;
  const cp2y = my - perpY * 0.3;
  return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
};

const getStatusIcon = (status: NodeStatus) => {
  switch (status) {
    case "mastered":
      return <CheckCircle2 size={12} className="text-emerald-500" />;
    case "in-progress":
      return <Clock size={12} className="text-blue-500" />;
    case "locked":
      return <Lock size={12} className="text-gray-400" />;
  }
};

const getStatusColor = (status: NodeStatus) => {
  switch (status) {
    case "mastered":
      return "#22C55E";
    case "in-progress":
      return "#3B82F6";
    case "locked":
      return "#9CA3AF";
  }
};

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

const FloatingParticle = ({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) => (
  <circle
    cx={x}
    cy={y}
    r={2}
    fill={color}
    opacity={0.6}
  >
    <animate
      attributeName="cy"
      values={`${y};${y - 15};${y}`}
      dur={`${3 + delay}s`}
      repeatCount="indefinite"
    />
    <animate
      attributeName="opacity"
      values="0.6;0.2;0.6"
      dur={`${3 + delay}s`}
      repeatCount="indefinite"
    />
  </circle>
);

const Leaf = ({ x, y, angle, color, delay }: { x: number; y: number; angle: number; color: string; delay: number }) => (
  <g transform={`translate(${x},${y}) rotate(${angle})`} opacity={0.7}>
    <ellipse rx={4} ry={2} fill={color}>
      <animateTransform
        attributeName="transform"
        type="rotate"
        values={`0;5;0;-5;0`}
        dur={`${4 + delay}s`}
        repeatCount="indefinite"
        additive="sum"
      />
    </ellipse>
  </g>
);

const StatusBadge = ({ status }: { status: NodeStatus }) => {
  const configs = {
    mastered: { bg: "bg-emerald-500/10", text: "text-emerald-500", label: "Mastered" },
    "in-progress": { bg: "bg-blue-500/10", text: "text-blue-500", label: "In Progress" },
    locked: { bg: "bg-gray-500/10", text: "text-gray-400", label: "Locked" },
  };
  const c = configs[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${c.bg} ${c.text}`}>
      {getStatusIcon(status)}
      {c.label}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function NeuralTree() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredChild, setHoveredChild] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const CENTER_X = 400;
  const CENTER_Y = 280;
  const ROOT_RADIUS = 42;

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.4));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  // Generate particles
  const particles = React.useMemo(() => {
    const pts: { x: number; y: number; color: string; delay: number }[] = [];
    MAIN_BRANCHES.forEach((branch) => {
      const end = polarToCartesian(CENTER_X, CENTER_Y, branch.distance, branch.angle);
      for (let i = 0; i < 4; i++) {
        pts.push({
          x: end.x + (Math.random() - 0.5) * 60,
          y: end.y + (Math.random() - 0.5) * 60,
          color: branch.color,
          delay: Math.random() * 3,
        });
      }
    });
    return pts;
  }, []);

  // Generate leaves along branches
  const leaves = React.useMemo(() => {
    const ls: { x: number; y: number; angle: number; color: string; delay: number }[] = [];
    MAIN_BRANCHES.forEach((branch) => {
      const start = polarToCartesian(CENTER_X, CENTER_Y, ROOT_RADIUS + 10, branch.angle);
      const end = polarToCartesian(CENTER_X, CENTER_Y, branch.distance - 30, branch.angle);
      for (let i = 1; i <= 5; i++) {
        const t = i / 6;
        const side = i % 2 === 0 ? 1 : -1;
        const perpAngle = branch.angle + 90;
        const perpRad = ((perpAngle - 90) * Math.PI) / 180;
        const distFromBranch = 12 + Math.random() * 8;
        ls.push({
          x: start.x + (end.x - start.x) * t + side * Math.cos(perpRad) * distFromBranch,
          y: start.y + (end.y - start.y) * t + side * Math.sin(perpRad) * distFromBranch,
          angle: branch.angle + side * 30 + Math.random() * 20,
          color: branch.color,
          delay: Math.random() * 2,
        });
      }
    });
    return ls;
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.03) 0%, rgba(124,58,237,0.02) 40%, transparent 70%)",
        }}
      />

      {/* ─── HEADER ─── */}
      <div className="relative z-10 px-6 pt-6 pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,101,52,0.1))",
                border: "1px solid rgba(34,197,94,0.2)",
              }}
            >
              <TreePine size={20} className="text-emerald-500" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                Neural Tree
              </h1>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Explore and master the interconnected world of psychology
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN LAYOUT ─── */}
      <div className="relative z-10 px-4 pb-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-140px)] min-h-[600px]">

          {/* LEFT PANEL */}
          <div className="lg:col-span-3 flex flex-col gap-3 order-2 lg:order-1">
            {/* Tree Overview Card */}
            <div
              className="rounded-2xl p-5 flex-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Network size={16} className="text-emerald-500" />
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  Tree Overview
                </h3>
              </div>

              <div className="space-y-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:bg-white/5 cursor-default group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${stat.color}15` }}
                      >
                        <span style={{ color: stat.color }}>{stat.icon}</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-lg font-bold tabular-nums" style={{ color: stat.color }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mini progress bar */}
              <div className="mt-5">
                <div className="flex justify-between text-xs mb-2" style={{ color: "var(--text-secondary)" }}>
                  <span>Overall Progress</span>
                  <span className="font-semibold text-emerald-500">63%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: "63%",
                      background: "linear-gradient(90deg, #166534, #22C55E, #4ADE80)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CENTER — TREE CANVAS */}
          <div
            className="lg:col-span-6 relative rounded-2xl overflow-hidden order-1 lg:order-2 cursor-grab active:cursor-grabbing"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            ref={containerRef}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 800 560"
              className="w-full h-full"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <defs>
                {/* Glow filters */}
                {MAIN_BRANCHES.map((branch) => (
                  <filter key={`glow-${branch.id}`} id={`glow-${branch.id}`}>
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                ))}
                <filter id="rootGlow">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Gradients */}
                <radialGradient id="rootGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#22C55E" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#166534" stopOpacity="0.2" />
                </radialGradient>
                <radialGradient id="rootOuter" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background subtle grid */}
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
              </pattern>
              <rect width="800" height="560" fill="url(#grid)" />

              {/* ─── BRANCHES ─── */}
              {MAIN_BRANCHES.map((branch) => {
                const start = polarToCartesian(CENTER_X, CENTER_Y, ROOT_RADIUS, branch.angle);
                const end = polarToCartesian(CENTER_X, CENTER_Y, branch.distance, branch.angle);
                const mid = polarToCartesian(CENTER_X, CENTER_Y, branch.distance * 0.6, branch.angle);

                // Main branch path with organic curve
                const branchPath = getBezierPath(start.x, start.y, end.x, end.y, 0.15);

                // Child positions
                const childPositions = branch.children.map((_, i) => {
                  const childAngle = branch.angle + (i - 2) * 18;
                  const childDist = branch.distance + 70 + (i % 2) * 20;
                  return polarToCartesian(CENTER_X, CENTER_Y, childDist, childAngle);
                });

                return (
                  <g key={branch.id}>
                    {/* Glow behind branch */}
                    <path
                      d={branchPath}
                      fill="none"
                      stroke={branch.color}
                      strokeWidth={8}
                      opacity={0.08}
                      filter="url(#softGlow)"
                    />

                    {/* Main branch line */}
                    <path
                      d={branchPath}
                      fill="none"
                      stroke={branch.color}
                      strokeWidth={3}
                      opacity={0.6}
                      strokeLinecap="round"
                      filter={`url(#glow-${branch.id})`}
                    >
                      <animate
                        attributeName="stroke-width"
                        values="3;3.5;3"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </path>

                    {/* Thin twigs */}
                    {childPositions.map((cp, i) => {
                      const twigPath = getBezierPath(end.x, end.y, cp.x, cp.y, 0.3);
                      return (
                        <path
                          key={`twig-${i}`}
                          d={twigPath}
                          fill="none"
                          stroke={branch.color}
                          strokeWidth={1.5}
                          opacity={0.35}
                          strokeLinecap="round"
                        />
                      );
                    })}

                    {/* Connection dots along branch */}
                    {[0.3, 0.5, 0.7].map((t, i) => {
                      const pt = polarToCartesian(CENTER_X, CENTER_Y, ROOT_RADIUS + (branch.distance - ROOT_RADIUS) * t, branch.angle);
                      return (
                        <circle
                          key={`dot-${i}`}
                          cx={pt.x}
                          cy={pt.y}
                          r={2}
                          fill={branch.color}
                          opacity={0.4}
                        >
                          <animate
                            attributeName="r"
                            values="2;3;2"
                            dur={`${2 + i * 0.5}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                      );
                    })}
                  </g>
                );
              })}

              {/* ─── LEAVES ─── */}
              {leaves.map((leaf, i) => (
                <Leaf key={`leaf-${i}`} {...leaf} />
              ))}

              {/* ─── PARTICLES ─── */}
              {particles.map((p, i) => (
                <FloatingParticle key={`p-${i}`} {...p} />
              ))}

              {/* ─── ROOT NODE ─── */}
              <g>
                {/* Outer glow rings */}
                <circle cx={CENTER_X} cy={CENTER_Y} r={ROOT_RADIUS + 20} fill="url(#rootOuter)">
                  <animate
                    attributeName="r"
                    values={`${ROOT_RADIUS + 15};${ROOT_RADIUS + 25};${ROOT_RADIUS + 15}`}
                    dur="4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0.3;0.6"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Main root circle */}
                <circle
                  cx={CENTER_X}
                  cy={CENTER_Y}
                  r={ROOT_RADIUS}
                  fill="url(#rootGrad)"
                  stroke="#22C55E"
                  strokeWidth={2}
                  filter="url(#rootGlow)"
                >
                  <animate
                    attributeName="r"
                    values={`${ROOT_RADIUS};${ROOT_RADIUS + 2};${ROOT_RADIUS}`}
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Inner ring */}
                <circle
                  cx={CENTER_X}
                  cy={CENTER_Y}
                  r={ROOT_RADIUS - 8}
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth={1}
                  opacity={0.5}
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${CENTER_X} ${CENTER_Y}`}
                    to={`360 ${CENTER_X} ${CENTER_Y}`}
                    dur="20s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Root icon */}
                <foreignObject x={CENTER_X - 14} y={CENTER_Y - 14} width={28} height={28}>
                  <div className="flex items-center justify-center w-full h-full">
                    <Brain size={22} className="text-white" style={{ filter: "drop-shadow(0 0 4px rgba(34,197,94,0.5))" }} />
                  </div>
                </foreignObject>

                {/* Root label */}
                <text
                  x={CENTER_X}
                  y={CENTER_Y + ROOT_RADIUS + 22}
                  textAnchor="middle"
                  className="text-xs font-bold"
                  fill="#22C55E"
                  style={{ fontSize: "13px", fontWeight: 700 }}
                >
                  Psychology
                </text>
              </g>

              {/* ─── MAIN BRANCH NODES ─── */}
              {MAIN_BRANCHES.map((branch) => {
                const pos = polarToCartesian(CENTER_X, CENTER_Y, branch.distance, branch.angle);
                const isHovered = hoveredNode === branch.id;
                const progressPct = Math.round((branch.progress / branch.total) * 100);

                return (
                  <g
                    key={`node-${branch.id}`}
                    onMouseEnter={() => setHoveredNode(branch.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Node glow on hover */}
                    {isHovered && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={38}
                        fill={branch.color}
                        opacity={0.1}
                        filter="url(#softGlow)"
                      />
                    )}

                    {/* Glassmorphism node background */}
                    <rect
                      x={pos.x - 50}
                      y={pos.y - 32}
                      width={100}
                      height={64}
                      rx={16}
                      fill={isHovered ? branch.bgColor : "rgba(255,255,255,0.04)"}
                      stroke={isHovered ? branch.color : "rgba(255,255,255,0.08)"}
                      strokeWidth={1.5}
                      style={{
                        backdropFilter: "blur(12px)",
                        transition: "all 0.3s ease",
                      }}
                    />

                    {/* Node icon */}
                    <foreignObject x={pos.x - 12} y={pos.y - 24} width={24} height={24}>
                      <div className="flex items-center justify-center w-full h-full" style={{ color: branch.color }}>
                        {branch.icon}
                      </div>
                    </foreignObject>

                    {/* Node label */}
                    <text
                      x={pos.x}
                      y={pos.y + 2}
                      textAnchor="middle"
                      fill={isHovered ? branch.color : "var(--text-primary)"}
                      style={{ fontSize: "10px", fontWeight: 600, transition: "all 0.3s" }}
                    >
                      {branch.label.split("\n")[0]}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + 14}
                      textAnchor="middle"
                      fill="var(--text-secondary)"
                      style={{ fontSize: "9px", fontWeight: 500 }}
                    >
                      {branch.label.split("\n")[1]}
                    </text>

                    {/* Progress indicator */}
                    <text
                      x={pos.x}
                      y={pos.y + 26}
                      textAnchor="middle"
                      fill={branch.color}
                      style={{ fontSize: "9px", fontWeight: 700 }}
                    >
                      {branch.progress}/{branch.total}
                    </text>

                    {/* Mini progress bar under node */}
                    <rect
                      x={pos.x - 30}
                      y={pos.y + 30}
                      width={60}
                      height={3}
                      rx={1.5}
                      fill="rgba(255,255,255,0.08)"
                    />
                    <rect
                      x={pos.x - 30}
                      y={pos.y + 30}
                      width={60 * (branch.progress / branch.total)}
                      height={3}
                      rx={1.5}
                      fill={branch.color}
                      opacity={0.8}
                    >
                      <animate
                        attributeName="width"
                        from="0"
                        to={60 * (branch.progress / branch.total)}
                        dur="1s"
                        fill="freeze"
                      />
                    </rect>
                  </g>
                );
              })}

              {/* ─── CHILD NODES ─── */}
              {MAIN_BRANCHES.map((branch) => {
                const parentPos = polarToCartesian(CENTER_X, CENTER_Y, branch.distance, branch.angle);
                return branch.children.map((child, i) => {
                  const childAngle = branch.angle + (i - 2) * 18;
                  const childDist = branch.distance + 70 + (i % 2) * 20;
                  const pos = polarToCartesian(CENTER_X, CENTER_Y, childDist, childAngle);
                  const isHovered = hoveredChild === child.id;
                  const statusColor = getStatusColor(child.status);

                  return (
                    <g
                      key={child.id}
                      onMouseEnter={() => setHoveredChild(child.id)}
                      onMouseLeave={() => setHoveredChild(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Glow on hover */}
                      {isHovered && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={20}
                          fill={statusColor}
                          opacity={0.15}
                          filter="url(#softGlow)"
                        />
                      )}

                      {/* Child node circle */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isHovered ? 18 : 16}
                        fill={child.status === "locked" ? "rgba(255,255,255,0.03)" : `${statusColor}15`}
                        stroke={isHovered ? statusColor : `${statusColor}50`}
                        strokeWidth={1.5}
                        style={{ transition: "all 0.3s ease" }}
                      />

                      {/* Status indicator dot */}
                      <circle
                        cx={pos.x + 10}
                        cy={pos.y - 10}
                        r={4}
                        fill={statusColor}
                        opacity={child.status === "locked" ? 0.3 : 0.8}
                      />

                      {/* Child icon */}
                      <foreignObject x={pos.x - 8} y={pos.y - 8} width={16} height={16}>
                        <div className="flex items-center justify-center w-full h-full" style={{ color: statusColor, opacity: child.status === "locked" ? 0.4 : 1 }}>
                          {child.icon}
                        </div>
                      </foreignObject>

                      {/* Child label */}
                      <text
                        x={pos.x}
                        y={pos.y + 26}
                        textAnchor="middle"
                        fill={child.status === "locked" ? "var(--text-muted)" : "var(--text-secondary)"}
                        style={{ fontSize: "9px", fontWeight: 500, transition: "all 0.3s" }}
                      >
                        {child.label}
                      </text>
                    </g>
                  );
                });
              })}
            </svg>

            {/* Zoom Controls */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-2xl"
              style={{
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                onClick={handleZoomOut}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <ZoomOut size={16} className="text-white/70" />
              </button>
              <div className="w-24 h-1 rounded-full mx-2" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-200"
                  style={{ width: `${((zoom - 0.4) / 2.1) * 100}%` }}
                />
              </div>
              <button
                onClick={handleZoomIn}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <ZoomIn size={16} className="text-white/70" />
              </button>
              <span className="text-xs font-mono text-white/50 w-10 text-center">{Math.round(zoom * 100)}%</span>
              <div className="w-px h-4 bg-white/10 mx-1" />
              <button
                onClick={handleReset}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                title="Reset view"
              >
                <Maximize2 size={14} className="text-white/50" />
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-3 flex flex-col gap-3 order-3">
            {/* How It Works */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-amber-400" />
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  How It Works
                </h3>
              </div>

              <div className="space-y-3">
                {HOW_IT_WORKS.map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/5 group cursor-default"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: `${item.color}15`, color: item.color }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </p>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Unlocks */}
            <div
              className="rounded-2xl p-5 flex-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-500" />
                  <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    Recent Unlocks
                  </h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                  +3 today
                </span>
              </div>

              <div className="space-y-2">
                {RECENT_UNLOCKS.map((unlock) => (
                  <div
                    key={unlock.id}
                    className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:bg-white/5 group cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${unlock.color}15` }}
                      >
                        <CheckCircle2 size={14} style={{ color: unlock.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {unlock.label}
                        </p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {unlock.branch}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      {unlock.timeAgo}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 hover:bg-white/5 flex items-center justify-center gap-1" style={{ color: "var(--text-secondary)" }}>
                View all history
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM LEGEND ─── */}
      <div className="relative z-10 px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="flex flex-wrap items-center justify-center gap-2 px-6 py-3 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
            }}
          >
            {LEGEND_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 hover:bg-white/5 cursor-default"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: item.color, boxShadow: `0 0 8px ${item.color}40` }}
                />
                <span className="text-xs font-medium flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                  {item.icon}
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
