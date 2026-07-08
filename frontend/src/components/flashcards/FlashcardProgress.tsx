"use client";

import { AnimatePresence, motion } from "framer-motion";

interface FlashcardProgressProps {
  current: number;
  total: number;
  learned: number;
  progress: number;
  lastXP: number;
  showXPGain: boolean;
  color?: string;
}

export default function FlashcardProgress({
  current,
  total,
  learned,
  progress,
  lastXP,
  showXPGain,
  color = "#8B5CF6",
}: FlashcardProgressProps) {
  const percentage = total > 0 ? Math.round((learned / total) * 100) : 0;

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="text-sm text-stone-500">
            Card{" "}
            <span className="text-stone-800 font-bold tabular-nums">{current}</span>
            <span className="text-stone-400"> / {total}</span>
          </span>
          <span className="text-sm text-emerald-600">
            Mastered{" "}
            <span className="font-bold tabular-nums">{learned}</span>
          </span>
          <span className="text-sm" style={{ color: color + "99" }}>
            <span className="font-bold tabular-nums">{percentage}%</span>
            <span className="text-stone-400"> done</span>
          </span>
        </div>

        <AnimatePresence mode="wait">
          {showXPGain && (
            <motion.div
              key={lastXP}
              initial={{ opacity: 0, y: 12, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.7 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-1.5 text-sm font-bold"
              style={{ color: "#D97706" }}
            >
              <span>+</span>
              <span className="tabular-nums">{lastXP}</span>
              <span className="text-xs font-medium opacity-70">XP</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative h-2.5 w-full rounded-full bg-stone-200 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
        />
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full opacity-30"
          style={{ backgroundColor: color }}
          initial={{ width: "0%" }}
          animate={{ width: `${(learned / total) * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
        />
      </div>
    </div>
  );
}
