"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface Leaf {
  id: string;

  x: number;
  y: number;

  rotation?: number;

  scale?: number;

  color: string;

  completed?: boolean;

  delay?: number;

  size?: number;
}

interface AnimatedLeavesProps {
  leaves: Leaf[];
}

function AnimatedLeaves({
  leaves,
}: AnimatedLeavesProps) {
  return (
    <>
      {leaves.map((leaf) => {
        const size = leaf.size ?? 12;

        return (
          <motion.g
            key={leaf.id}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: leaf.scale ?? 1,
            }}
            transition={{
              delay: leaf.delay ?? 0,
              duration: 0.6,
            }}
          >
            {/* Glow */}

            {leaf.completed && (
              <motion.ellipse
                cx={leaf.x}
                cy={leaf.y}
                rx={size}
                ry={size * 0.75}
                fill={leaf.color}
                opacity={0.18}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.12, 0.28, 0.12],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}

            {/* Whole leaf motion */}

            <motion.g
              style={{
                originX: leaf.x,
                originY: leaf.y,
              }}
              animate={{
                rotate: [
                  (leaf.rotation ?? 0) - 4,
                  (leaf.rotation ?? 0) + 4,
                  (leaf.rotation ?? 0) - 4,
                ],

                y: [0, -2, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Stem */}

              <line
                x1={leaf.x}
                y1={leaf.y}
                x2={leaf.x}
                y2={leaf.y + size * 0.6}
                stroke="#6b7280"
                strokeWidth={1.1}
              />

              {/* Leaf */}

              <motion.path
                d={`
M ${leaf.x} ${leaf.y}
C ${leaf.x-size*0.8} ${leaf.y-size*0.2},
${leaf.x-size*0.5} ${leaf.y-size},
${leaf.x} ${leaf.y-size*1.5}

C ${leaf.x+size*0.5} ${leaf.y-size},
${leaf.x+size*0.8} ${leaf.y-size*0.2},
${leaf.x} ${leaf.y}
`}
                fill={leaf.color}
                stroke="white"
                strokeOpacity={0.35}
                strokeWidth={0.8}
                animate={
                  leaf.completed
                    ? {
                        scale: [1, 1.08, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                }}
              />

              {/* Leaf vein */}

              <path
                d={`
M ${leaf.x}
${leaf.y}

L ${leaf.x}
${leaf.y-size*1.3}
`}
                stroke="rgba(255,255,255,.45)"
                strokeWidth={0.7}
              />
            </motion.g>

            {/* Bloom particle */}

            {leaf.completed && (
              <motion.circle
                cx={leaf.x}
                cy={leaf.y - size}
                r={2}
                fill="white"
                animate={{
                  y: [0, -10, -18],
                  opacity: [0.9, 0.6, 0],
                  scale: [1, 1.5, 2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random(),
                }}
              />
            )}
          </motion.g>
        );
      })}
    </>
  );
}

export default memo(AnimatedLeaves);
