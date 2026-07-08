"use client";

import type { Flashcard } from "@/data/flashcards";
import { motion } from "framer-motion";
import { useState } from "react";

interface FlashcardCardProps {
  card: Flashcard;
  index: number;
  isActive: boolean;
  onClick: () => void;
  color: string;
}

export default function FlashcardCard({ card, index, isActive, onClick, color }: FlashcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (isActive) {
      setIsFlipped(!isFlipped);
    } else {
      onClick();
    }
  };

  const getIllustration = () => {
    const term = card.term.toLowerCase();
    if (term.includes("brain") || term.includes("neuro") || term.includes("hippocampus")) {
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full">
          <path d="M50 15 C30 10, 15 25, 18 45 C20 60, 35 68, 50 65 C65 68, 80 60, 82 45 C85 25, 70 10, 50 15Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M35 30 Q45 25 50 35 Q55 25 65 30" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
          <path d="M30 45 Q40 40 50 48 Q60 40 70 45" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
          <circle cx="42" cy="38" r="2" fill={color} opacity="0.4"/>
          <circle cx="58" cy="38" r="2" fill={color} opacity="0.4"/>
        </svg>
      );
    }
    if (term.includes("memory") || term.includes("remember")) {
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full">
          <rect x="20" y="20" width="60" height="40" rx="4" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M28 32 L72 32" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
          <path d="M28 42 L60 42" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
          <path d="M28 52 L50 52" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
          <circle cx="75" cy="55" r="8" fill="none" stroke={color} strokeWidth="1.5"/>
          <path d="M71 55 L79 55 M75 51 L75 59" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    }
    if (term.includes("depress") || term.includes("anxiety") || term.includes("disorder")) {
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full">
          <circle cx="50" cy="40" r="22" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M42 36 Q45 33 48 36" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M52 36 Q55 33 58 36" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M44 50 Q50 46 56 50" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M38 28 Q32 22 28 28" fill="none" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
          <path d="M62 28 Q68 22 72 28" fill="none" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
        </svg>
      );
    }
    if (term.includes("social") || term.includes("group") || term.includes("people")) {
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full">
          <circle cx="35" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <circle cx="65" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M25 50 Q35 45 45 50" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M55 50 Q65 45 75 50" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M50 25 Q50 15 50 10" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
          <circle cx="50" cy="8" r="3" fill={color} opacity="0.3"/>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 100 80" className="w-full h-full">
        <path d="M50 12 C35 12, 25 24, 25 38 C25 50, 32 58, 38 62 L38 68 L62 68 L62 62 C68 58, 75 50, 75 38 C75 24, 65 12, 50 12Z" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M42 68 L42 74 L58 74 L58 68" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M45 74 L45 78 L55 78 L55 74" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="38" y1="38" x2="45" y2="38" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
        <line x1="55" y1="38" x2="62" y2="38" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
        <line x1="50" y1="30" x2="50" y2="24" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
        <line x1="50" y1="46" x2="50" y2="52" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>
      </svg>
    );
  };

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{ zIndex: isActive ? 10 : 5 - index }}
      onClick={handleClick}
      animate={{
        scale: isActive ? 1 : 0.92 - index * 0.03,
        y: isActive ? 0 : index * 8,
        rotate: isActive ? 0 : (index % 2 === 0 ? -2 : 2) + index * 1.5,
        x: isActive ? 0 : (index % 2 === 0 ? -8 : 8) * index,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={!isActive ? { scale: 0.95, y: -4 } : {}}
    >
      <div
        className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-lg"
        style={{
          backgroundColor: "#FFFBF5",
          border: `2px solid ${color}30`,
          boxShadow: isActive
            ? `0 20px 40px ${color}20, 0 4px 12px rgba(0,0,0,0.08)`
            : `0 4px 12px rgba(0,0,0,0.06)`,
        }}
      >
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 rounded-sm opacity-60"
          style={{ backgroundColor: color + "40" }}
        />

        <div className="p-5 h-full flex flex-col">
          <div
            className="self-start px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: color + "15",
              color: color,
              border: `1px solid ${color}25`
            }}
          >
            {card.topic}
          </div>

          <motion.div
            className="flex-1 flex flex-col"
            animate={{ opacity: isFlipped ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex-1 flex items-center justify-center mb-3">
              <div className="w-32 h-24">
                {getIllustration()}
              </div>
            </div>

            <h3
              className="text-lg font-bold text-center leading-snug"
              style={{ color: "#2D2A26", fontFamily: "'Georgia', serif" }}
            >
              {card.term}
            </h3>

            <div className="mt-3 text-center">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest">Tap to flip</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 p-5 flex flex-col items-center justify-center"
            animate={{ opacity: isFlipped ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: "#FFFBF5",
              pointerEvents: isFlipped ? "auto" : "none"
            }}
          >
            <div className="w-full h-px mb-4" style={{ backgroundColor: color + "30" }} />
            <p
              className="text-sm text-center leading-relaxed"
              style={{ color: "#4A4540", fontFamily: "'Georgia', serif" }}
            >
              {card.definition}
            </p>
            <div className="w-full h-px mt-4" style={{ backgroundColor: color + "30" }} />
            <div className="mt-3 text-center">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest">Tap to flip back</span>
            </div>
          </motion.div>

          <div className="absolute bottom-2 left-2 text-xs" style={{ color: color + "40" }}>★</div>
          <div className="absolute bottom-2 right-2 text-xs" style={{ color: color + "40" }}>★</div>
          <div className="absolute top-8 left-2 text-[8px]" style={{ color: color + "25" }}>✦</div>
          <div className="absolute top-8 right-2 text-[8px]" style={{ color: color + "25" }}>✦</div>
        </div>
      </div>
    </motion.div>
  );
}
