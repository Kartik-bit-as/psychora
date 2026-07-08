"use client";

import { motion } from "framer-motion";
import { memo } from "react";

export interface XPFlowProps {
  id: string;

  from: {
    x: number;
    y: number;
  };

  to: {
    x: number;
    y: number;
  };

  color?: string;

  particleCount?: number;

  active?: boolean;

  duration?: number;
}

function buildCurve(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const c1x = x1;
  const c1y = y1 + dy * 0.25;

  const c2x = x2;
  const c2y = y2 - dy * 0.25;

  return `
    M ${x1} ${y1}
    C
    ${c1x} ${c1y},
    ${c2x} ${c2y},
    ${x2} ${y2}
  `;
}

function XPFlow({
  id,
  from,
  to,
  color = "#22c55e",
  particleCount = 4,
  active = true,
  duration = 3,
}: XPFlowProps) {
  if (!active) return null;

  const pathId = `xp-path-${id}`;

  const path = buildCurve(
    from.x,
    from.y,
    to.x,
    to.y
  );

  return (
    <>
      {/* Hidden SVG path */}
      <path
        id={pathId}
        d={path}
        fill="none"
        stroke="transparent"
      />

      {/* XP particles */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.circle
          key={i}
          r={4}
          fill={color}
          filter="url(#xpGlow)"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay: i * (duration / particleCount),
            ease: "linear",
          }}
        >
          <animateMotion
            dur={`${duration}s`}
            begin={`${i * (duration / particleCount)}s`}
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </motion.circle>
      ))}

      {/* Soft energy line */}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={2}
        opacity={0.15}
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          duration: 1.2,
        }}
      />
    </>
  );
}

export default memo(XPFlow);
