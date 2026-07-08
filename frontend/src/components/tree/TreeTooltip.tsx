"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    Award,
    BookOpen,
    Brain,
    TrendingUp,
} from "lucide-react";

export interface TreeTooltipData {
  id: string;
  title: string;
  description?: string;

  progress: number;

  lessons: number;

  xp: number;

  difficulty: "Beginner" | "Intermediate" | "Advanced";

  color?: string;
}

interface TreeTooltipProps {
  node: TreeTooltipData | null;

  x: number;

  y: number;

  visible: boolean;
}

function difficultyColor(level: TreeTooltipData["difficulty"]) {
  switch (level) {
    case "Beginner":
      return "#22C55E";

    case "Intermediate":
      return "#F97316";

    case "Advanced":
      return "#7C3AED";

    default:
      return "#6B7280";
  }
}

export default function TreeTooltip({
  node,
  x,
  y,
  visible,
}: TreeTooltipProps) {
  return (
    <AnimatePresence>
      {visible && node && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            y: 10,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            y: 10,
          }}
          transition={{
            duration: 0.2,
          }}
          className="pointer-events-none absolute z-50 w-72 rounded-3xl border border-orange-100 bg-white/95 p-5 shadow-2xl backdrop-blur-xl"
          style={{
            left: x + 20,
            top: y - 20,
          }}
        >
          {/* Header */}

          <div className="mb-4 flex items-center gap-3">

            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{
                background: node.color ?? "#7C3AED",
              }}
            >
              <Brain
                size={24}
                color="white"
              />
            </div>

            <div>

              <h3 className="text-lg font-bold text-gray-900">
                {node.title}
              </h3>

              <p className="text-sm text-gray-500">
                {node.description}
              </p>

            </div>

          </div>

          {/* Progress */}

          <div className="mb-5">

            <div className="mb-2 flex justify-between text-sm">

              <span className="font-medium text-gray-700">
                Progress
              </span>

              <span className="font-semibold text-orange-500">
                {node.progress}%
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-orange-100">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${node.progress}%`,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"
              />

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-3">

            <div className="rounded-2xl bg-orange-50 p-3">

              <BookOpen
                size={18}
                className="mb-2 text-orange-500"
              />

              <p className="text-xs text-gray-500">
                Lessons
              </p>

              <p className="font-bold">
                {node.lessons}
              </p>

            </div>

            <div className="rounded-2xl bg-purple-50 p-3">

              <Award
                size={18}
                className="mb-2 text-purple-600"
              />

              <p className="text-xs text-gray-500">
                XP
              </p>

              <p className="font-bold">
                {node.xp}
              </p>

            </div>

            <div className="rounded-2xl bg-green-50 p-3">

              <TrendingUp
                size={18}
                className="mb-2 text-green-600"
              />

              <p className="text-xs text-gray-500">
                Level
              </p>

              <p
                className="font-bold"
                style={{
                  color: difficultyColor(node.difficulty),
                }}
              >
                {node.difficulty}
              </p>

            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
