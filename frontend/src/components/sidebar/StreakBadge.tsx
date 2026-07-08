'use client';

import { motion } from 'framer-motion';

interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  const isHot = streak >= 7;
  const isOnFire = streak >= 14;

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${isOnFire ? 'bg-orange-500/20 text-orange-300' : isHot ? 'bg-amber-500/15 text-amber-300' : 'bg-white/5 text-white/50'}`}>
      <motion.span animate={isHot ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}} transition={isHot ? { duration: 1.5, repeat: Infinity } : {}}>
        {isOnFire ? '🔥🔥' : isHot ? '🔥' : '⚡'}
      </motion.span>
      <span>{streak}-day streak</span>
    </div>
  );
}
