'use client';

import { useLearningStore } from '@/store/learningStore';
import { useXPStore } from '@/store/xpStore';
import { motion } from 'framer-motion';
import {
  FiBook,
  FiBookOpen,
  FiEdit3,
  FiGitBranch,
  FiHome,
  FiLayers,
  FiTarget,
  FiZap,
} from 'react-icons/fi';
import NavItem from '../sidebar/NavItem';
import StreakBadge from '../sidebar/StreakBadge';
import XPBadge from '../sidebar/XPBadge';

export default function Sidebar() {
  const currentSubject = useLearningStore((state) => state.currentSubject);
  const currentLesson = useLearningStore((state) => state.currentLesson);
  const progressPercentage = useLearningStore((state) => state.progressPercentage);

  const xp = useXPStore((state) => state.xp);
  const level = useXPStore((state) => state.level);
  const streak = useXPStore((state) => state.streak);

  const navItems = [
    { href: '/', icon: FiHome, label: 'Home' },
    { href: '/dashboard', icon: FiBook, label: 'My Space' },
    { href: '/tree', icon: FiGitBranch, label: 'Neural Tree' },
    { href: '/learn', icon: FiBookOpen, label: 'Learn' },
    { href: '/flashcards', icon: FiLayers, label: 'Flashcards' },
    { href: '/quiz', icon: FiTarget, label: 'Quiz' },
    { href: '/theories', icon: FiZap, label: 'Theories' },
    { href: '/notes', icon: FiEdit3, label: 'Notes' },
  ];

  const xpToNextLevel = level * 100;
  const currentLevelXP = xp % xpToNextLevel;

  return (
    <aside className="w-64 min-h-screen bg-[#1a1520] text-white flex flex-col border-r border-white/5">
      <motion.div className="p-6 pb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-3">
          <motion.div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#f78a43] to-[#ef885f] flex items-center justify-center text-xl shadow-lg shadow-orange-500/20" whileHover={{ scale: 1.05, rotate: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
            🧠
          </motion.div>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight">Psychora</h1>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Learn · Play · Master</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="px-4 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
        <div className="rounded-xl bg-white/[0.03] backdrop-blur border border-white/5 p-3.5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/30">Subject</span>
            <span className="font-medium text-[#f78a43] truncate max-w-[120px]">
              {currentSubject ? currentSubject.charAt(0).toUpperCase() + currentSubject.slice(1) : 'None'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/30">Lesson</span>
            <span className="font-medium text-white/60 truncate max-w-[120px]">{currentLesson || 'None'}</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-white/30">
              <span>Progress</span>
              <span className="text-white/50">{progressPercentage}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-[#f78a43] to-[#ef885f] rounded-full" initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }} />
            </div>
          </div>
          <StreakBadge streak={streak} />
        </div>
      </motion.div>

      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item, index) => (
          <NavItem key={item.href} href={item.href} icon={item.icon} label={item.label} index={index} />
        ))}
      </nav>

      <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#f78a43] to-[#ef885f] flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-orange-500/20">U</div>
            <div className="absolute -bottom-1 -right-1">
              <XPBadge level={level} currentXP={currentLevelXP} xpToNextLevel={xpToNextLevel} size={22} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white/90 truncate">User</p>
            <p className="text-[10px] text-white/30">Level {level} · {xp} XP</p>
          </div>
          <div className="w-12">
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#f78a43] to-[#ef885f] rounded-full" style={{ width: `${(currentLevelXP / xpToNextLevel) * 100}%` }} />
            </div>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}
