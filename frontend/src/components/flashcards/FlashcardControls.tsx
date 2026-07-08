"use client";

import { motion } from "framer-motion";

interface FlashcardControlsProps {
  onRate: (rating: "again" | "hard" | "good" | "easy") => void;
  disabled?: boolean;
  color?: string;
}

export default function FlashcardControls({ onRate, disabled, color = "#8B5CF6" }: FlashcardControlsProps) {
  const buttons = [
    {
      label: "Again",
      rating: "again" as const,
      bg: "#FEE2E2",
      text: "#DC2626",
      border: "#FECACA",
      hover: "#FECACA",
    },
    {
      label: "Hard",
      rating: "hard" as const,
      bg: "#FEF3C7",
      text: "#D97706",
      border: "#FDE68A",
      hover: "#FDE68A",
    },
    {
      label: "Good",
      rating: "good" as const,
      bg: "#DBEAFE",
      text: "#2563EB",
      border: "#BFDBFE",
      hover: "#BFDBFE",
    },
    {
      label: "Easy",
      rating: "easy" as const,
      bg: "#D1FAE5",
      text: "#059669",
      border: "#A7F3D0",
      hover: "#A7F3D0",
    },
  ];

  return (
    <div className="flex items-center gap-3 w-full max-w-md px-2">
      {buttons.map((btn) => (
        <motion.button
          key={btn.rating}
          onClick={() => !disabled && onRate(btn.rating)}
          disabled={disabled}
          className="group relative flex-1 py-3 px-2 rounded-xl border text-sm font-bold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            backgroundColor: btn.bg,
            color: btn.text,
            borderColor: btn.border,
          }}
          whileHover={{ scale: disabled ? 1 : 1.05, backgroundColor: btn.hover }}
          whileTap={{ scale: disabled ? 1 : 0.92 }}
          transition={{ type: "spring", stiffness: 450, damping: 15 }}
        >
          <span className="relative z-10">{btn.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
