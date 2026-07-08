"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface BackgroundGridProps {
  width: number;
  height: number;
}

const COLORS = [
  "#ff7a18",
  "#ff4d6d",
  "#8b5cf6",
  "#22c55e",
];

function BackgroundGrid({
  width,
  height,
}: BackgroundGridProps) {
  const spacing = 80;

  const verticalLines = [];

  const horizontalLines = [];

  for (let x = 0; x <= width; x += spacing) {
    verticalLines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke="rgba(0,0,0,0.035)"
        strokeWidth={1}
      />
    );
  }

  for (let y = 0; y <= height; y += spacing) {
    horizontalLines.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={width}
        y2={y}
        stroke="rgba(0,0,0,0.035)"
        strokeWidth={1}
      />
    );
  }

  const dots = [];

  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      dots.push(
        <motion.circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={1.6}
          fill="#d1d5db"
          animate={{
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: 5 + ((x + y) % 5),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      );
    }
  }

  return (
    <>
      <svg
        width={width}
        height={height}
        className="absolute inset-0 pointer-events-none"
      >
        {verticalLines}
        {horizontalLines}
        {dots}
      </svg>

      {COLORS.map((color, index) => (
        <motion.div
          key={color}
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: 320,
            height: 320,
            background: color,
            opacity: 0.08,
            left: `${15 + index * 18}%`,
            top: `${12 + (index % 2) * 25}%`,
          }}
          animate={{
            x: [0, 25, -20, 0],
            y: [0, -20, 15, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: 18 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,.45), transparent 70%)",
        }}
        animate={{
          opacity: [0.45, 0.65, 0.45],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
    </>
  );
}

export default memo(BackgroundGrid);
