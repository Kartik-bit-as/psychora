"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
}

const COLORS = [
  "#22C55E",
  "#8B5CF6",
  "#EC4899",
  "#3B82F6",
  "#F97316",
];

export default function FloatingParticles({
  count = 45,
}: FloatingParticlesProps) {
  const particles = useMemo<FloatingParticle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,

      x: Math.random() * 100,

      y: Math.random() * 100,

      size: 2 + Math.random() * 5,

      color: COLORS[Math.floor(Math.random() * COLORS.length)],

      duration: 8 + Math.random() * 10,

      delay: Math.random() * 5,

      opacity: 0.2 + Math.random() * 0.6,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            opacity: particle.opacity,
            scale: 0,
          }}
          animate={{
            y: [
              `${particle.y}%`,
              `${particle.y - 15}%`,
              `${particle.y}%`,
            ],

            x: [
              `${particle.x}%`,
              `${particle.x + 3}%`,
              `${particle.x}%`,
            ],

            opacity: [
              particle.opacity,
              particle.opacity + 0.3,
              particle.opacity,
            ],

            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full blur-[1px]"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
}
