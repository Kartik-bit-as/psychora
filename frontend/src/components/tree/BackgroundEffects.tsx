"use client";

import { motion } from "framer-motion";

interface BackgroundEffectsProps {
  className?: string;
}

const BLOBS = [
  {
    size: 320,
    x: "8%",
    y: "12%",
    color: "rgba(249,115,22,0.12)",
    duration: 18,
  },
  {
    size: 260,
    x: "78%",
    y: "8%",
    color: "rgba(168,85,247,0.12)",
    duration: 22,
  },
  {
    size: 360,
    x: "70%",
    y: "68%",
    color: "rgba(236,72,153,0.10)",
    duration: 26,
  },
  {
    size: 240,
    x: "18%",
    y: "72%",
    color: "rgba(34,197,94,0.10)",
    duration: 20,
  },
];

export default function BackgroundEffects({
  className = "",
}: BackgroundEffectsProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Animated Gradient Blobs */}

      {BLOBS.map((blob, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: blob.color,
          }}
          animate={{
            x: [0, 35, -20, 0],
            y: [0, -25, 25, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Radial Light */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.45) 0%, transparent 70%)",
        }}
      />

      {/* Soft Mesh Gradient */}

      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 15% 20%, rgba(249,115,22,.08), transparent 35%),
            radial-gradient(circle at 85% 15%, rgba(168,85,247,.08), transparent 35%),
            radial-gradient(circle at 80% 80%, rgba(236,72,153,.08), transparent 35%),
            radial-gradient(circle at 25% 85%, rgba(34,197,94,.08), transparent 35%)
          `,
        }}
      />
    </div>
  );
}
