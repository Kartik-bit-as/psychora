"use client";

import { motion } from "framer-motion";
import { memo } from "react";

export interface ProgressRingProps {
  progress: number;

  radius?: number;

  strokeWidth?: number;

  color?: string;

  backgroundColor?: string;

  animated?: boolean;

  glow?: boolean;

  showLabel?: boolean;

  label?: string;

  valueColor?: string;

  children?: React.ReactNode;
}

function ProgressRing({
  progress,
  radius = 40,
  strokeWidth = 6,

  color = "#22c55e",
  backgroundColor = "#E5E7EB",

  animated = true,
  glow = true,

  showLabel = true,
  label,

  valueColor = "#111827",

  children,
}: ProgressRingProps) {
  const normalizedProgress = Math.max(
    0,
    Math.min(progress, 100)
  );

  const circumference = 2 * Math.PI * radius;

  const dashOffset =
    circumference -
    (normalizedProgress / 100) * circumference;

  const size = radius * 2 + strokeWidth * 2;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {glow && (
          <defs>
            <filter id="ringGlow">
              <feGaussianBlur
                stdDeviation="3"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        )}

        {/* Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          filter={glow ? "url(#ringGlow)" : undefined}
          initial={
            animated
              ? {
                  strokeDashoffset: circumference,
                }
              : false
          }
          animate={{
            strokeDashoffset: dashOffset,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        />
      </svg>

      {/* Center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}

        {showLabel && !children && (
          <>
            <span
              className="text-lg font-bold"
              style={{
                color: valueColor,
              }}
            >
              {Math.round(progress)}%
            </span>

            {label && (
              <span className="text-xs text-gray-500 mt-1">
                {label}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default memo(ProgressRing);
