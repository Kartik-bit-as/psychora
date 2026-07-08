"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface OrganicBranchProps {
  from: {
    x: number;
    y: number;
  };

  to: {
    x: number;
    y: number;
  };

  color: string;

  width?: number;

  progress?: number;

  animated?: boolean;
}

function OrganicBranch({
  from,
  to,
  color,
  width = 8,
  progress = 1,
  animated = true,
}: OrganicBranchProps) {

  const dx = to.x - from.x;
  const dy = to.y - from.y;

  const cp1x = from.x + dx * 0.28;
  const cp1y = from.y + dy * 0.10;

  const cp2x = from.x + dx * 0.72;
  const cp2y = to.y - dy * 0.10;

  const path = `
M ${from.x} ${from.y}
C
${cp1x} ${cp1y},
${cp2x} ${cp2y},
${to.x} ${to.y}
`;

  const twigLength = 18;

  const twigAngle = Math.atan2(dy, dx);

  const midX = from.x + dx * 0.55;
  const midY = from.y + dy * 0.55;

  const leftTwigX =
    midX +
    Math.cos(twigAngle - Math.PI / 2) * twigLength;

  const leftTwigY =
    midY +
    Math.sin(twigAngle - Math.PI / 2) * twigLength;

  const rightTwigX =
    midX +
    Math.cos(twigAngle + Math.PI / 2) * twigLength;

  const rightTwigY =
    midY +
    Math.sin(twigAngle + Math.PI / 2) * twigLength;

  return (
    <g>

      {/* Glow */}

      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={width + 8}
        strokeOpacity={0.08}
        strokeLinecap="round"
        initial={{
          pathLength: animated ? 0 : progress,
        }}
        animate={{
          pathLength: progress,
        }}
        transition={{
          duration: 1.8,
          ease: "easeOut",
        }}
      />

      {/* Main branch */}

      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        initial={{
          pathLength: animated ? 0 : progress,
        }}
        animate={{
          pathLength: progress,
        }}
        transition={{
          duration: 1.8,
          ease: "easeOut",
        }}
      />

      {/* Inner highlight */}

      <motion.path
        d={path}
        fill="none"
        stroke="white"
        strokeOpacity={0.22}
        strokeWidth={width * 0.28}
        strokeLinecap="round"
        initial={{
          pathLength: animated ? 0 : progress,
        }}
        animate={{
          pathLength: progress,
        }}
        transition={{
          duration: 1.8,
        }}
      />

      {/* Left twig */}

      <motion.line
        x1={midX}
        y1={midY}
        x2={leftTwigX}
        y2={leftTwigY}
        stroke={color}
        strokeWidth={width * 0.42}
        strokeLinecap="round"
        initial={{
          pathLength: animated ? 0 : 1,
        }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          delay: 0.35,
          duration: 0.6,
        }}
      />

      {/* Right twig */}

      <motion.line
        x1={midX}
        y1={midY}
        x2={rightTwigX}
        y2={rightTwigY}
        stroke={color}
        strokeWidth={width * 0.42}
        strokeLinecap="round"
        initial={{
          pathLength: animated ? 0 : 1,
        }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          delay: 0.45,
          duration: 0.6,
        }}
      />

      {/* Sap flow animation */}

      <motion.circle
        r={3.8}
        fill="white"
        opacity={0.9}
      >
        <animateMotion
          dur="3.5s"
          repeatCount="indefinite"
          path={path}
        />
      </motion.circle>

      {/* Soft pulse */}

      <motion.circle
        r={7}
        fill={color}
        opacity={0.18}
      >
        <animateMotion
          dur="3.5s"
          repeatCount="indefinite"
          path={path}
        />
      </motion.circle>

    </g>
  );
}

export default memo(OrganicBranch);
