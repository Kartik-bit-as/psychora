"use client";

import { motion } from "framer-motion";
import { BranchConnection } from "./types";

interface Props {
  branch: BranchConnection;
  animated?: boolean;
  glow?: boolean;
}

function createCurve(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const c1x = x1;
  const c1y = y1 - dy * 0.45;

  const c2x = x2;
  const c2y = y2 + dy * 0.45;

  return `M ${x1} ${y1}
          C ${c1x} ${c1y},
            ${c2x} ${c2y},
            ${x2} ${y2}`;
}

export default function TreeBranch({
  branch,
  animated = true,
  glow = true,
}: Props) {
  const path = createCurve(
    branch.from.x,
    branch.from.y,
    branch.to.x,
    branch.to.y
  );

  return (
    <>
      {glow && (
        <motion.path
          d={path}
          fill="none"
          stroke={branch.color}
          strokeWidth={10}
          strokeLinecap="round"
          opacity={0.18}
          filter="url(#branchGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.8,
            ease: "easeOut",
          }}
        />
      )}

      <motion.path
        d={path}
        fill="none"
        stroke={branch.color}
        strokeWidth={4}
        strokeLinecap="round"
        initial={{
          pathLength: animated ? 0 : 1,
        }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          duration: 1.4,
          ease: "easeOut",
        }}
      />
    </>
  );
}
