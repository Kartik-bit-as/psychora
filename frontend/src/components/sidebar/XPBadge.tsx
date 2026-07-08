'use client';

import { motion } from 'framer-motion';

interface XPBadgeProps {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  size?: number;
}

export default function XPBadge({ level, currentXP, xpToNextLevel, size = 40 }: XPBadgeProps) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(currentXP / xpToNextLevel, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={3} />
        <motion.circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="url(#xpGradient)" strokeWidth={3} strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset }} transition={{ duration: 1, ease: 'easeOut' }} />
        <defs>
          <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f78a43" />
            <stop offset="100%" stopColor="#ef885f" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold text-white">{level}</span>
      </div>
      {progress > 0.8 && (
        <motion.div className="absolute inset-0 rounded-full" animate={{ boxShadow: ['0 0 0px rgba(247,138,67,0)', '0 0 8px rgba(247,138,67,0.4)', '0 0 0px rgba(247,138,67,0)'] }} transition={{ duration: 2, repeat: Infinity }} />
      )}
    </div>
  );
}
