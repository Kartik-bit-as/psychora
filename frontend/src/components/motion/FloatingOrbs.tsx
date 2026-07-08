"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  depth: number;
}

const ORB_COLORS = [
  "rgba(147, 51, 234, 0.12)",   // purple-600
  "rgba(219, 39, 119, 0.10)",   // pink-600
  "rgba(99, 102, 241, 0.08)",   // indigo-500
  "rgba(168, 85, 247, 0.10)",   // purple-500
  "rgba(236, 72, 153, 0.08)",   // pink-500
];

export default function FloatingOrbs() {
  const orbs = useMemo<Orb[]>(() => {
    const count = 6;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 300 + 180,
      color: ORB_COLORS[i % ORB_COLORS.length],
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 5,
      depth: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.size * 0.15}px)`,
            transform: `translate(-50%, -50%) scale(${orb.depth})`,
            willChange: "transform",
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 20, -15, 0],
            scale: [orb.depth, orb.depth * 1.05, orb.depth * 0.95, orb.depth],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
