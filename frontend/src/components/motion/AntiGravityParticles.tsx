"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
}

export default function AntiGravityParticles() {
  const particles = useMemo<Particle[]>(() => {
    const count = 24;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.3 + 0.05,
      duration: Math.random() * 20 + 25,
      delay: Math.random() * 15,
      drift: (Math.random() - 0.5) * 60,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: "-4%",
            width: p.size,
            height: p.size,
            backgroundColor: `rgba(168, 85, 247, ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 4}px rgba(168, 85, 247, ${p.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -window.innerHeight * 1.1],
            x: [0, p.drift, -p.drift * 0.5, p.drift * 0.3, 0],
            opacity: [0, p.opacity, p.opacity, p.opacity * 0.6, 0],
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            },
            x: {
              duration: p.duration * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
            opacity: {
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
          }}
        />
      ))}
    </div>
  );
}
