'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { IconType } from 'react-icons';

interface NavItemProps {
  href: string;
  icon: IconType;
  label: string;
  index: number;
}

export default function NavItem({ href, icon: Icon, label, index }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }}>
      <Link href={href} className="group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200">
        {isActive && (
          <motion.div layoutId="activeNav" className="absolute inset-0 rounded-xl bg-[#9a5b6f]" initial={false} transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
        )}
        {!isActive && (
          <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
        )}
        <div className="relative z-10">
          <Icon size={18} className={`transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`} />
        </div>
        <span className={`relative z-10 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>{label}</span>
        {isActive && (
          <motion.div layoutId="activeDot" className="relative z-10 ml-auto h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" initial={false} transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
        )}
        {isActive && <div className="absolute inset-0 rounded-xl bg-[#9a5b6f]/20 blur-sm -z-10" />}
      </Link>
    </motion.div>
  );
}
