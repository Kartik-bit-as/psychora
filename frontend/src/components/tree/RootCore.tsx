"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

interface RootCoreProps {
  x: number;
  y: number;

  radius?: number;

  title?: string;
  subtitle?: string;

  color?: string;

  xp?: number;

  completed?: number;

  total?: number;

  onClick?: () => void;
}

export default function RootCore({
  x,
  y,
  radius = 54,

  title = "Psychology",
  subtitle = "Core Foundation",

  color = "#22c55e",

  xp = 3450,

  completed = 91,

  total = 127,

  onClick,
}: RootCoreProps) {
  const percent = Math.round((completed / total) * 100);

  return (
    <g
      transform={`translate(${x},${y})`}
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      {/* Large breathing glow */}
      <motion.circle
        r={radius + 34}
        fill={color}
        opacity={0.08}
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.06, 0.14, 0.06],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Medium glow */}
      <motion.circle
        r={radius + 16}
        fill={color}
        opacity={0.12}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      {/* Rotating ring */}
      <motion.circle
        r={radius + 8}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray="10 12"
        opacity={0.45}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main circle */}
      <motion.circle
        r={radius}
        fill="white"
        stroke={color}
        strokeWidth={4}
        whileHover={{
          scale: 1.05,
        }}
      />

      {/* Inner gradient */}
      <defs>
        <radialGradient id="rootGradient">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>

      <circle
        r={radius - 5}
        fill="url(#rootGradient)"
      />

      {/* Brain icon */}
      <motion.g
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <foreignObject
          x={-18}
          y={-20}
          width={36}
          height={36}
        >
          <div
            className="flex items-center justify-center w-full h-full text-white"
          >
            <Brain size={30} />
          </div>
        </foreignObject>
      </motion.g>

      {/* XP badge */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <rect
          x={-34}
          y={radius + 10}
          rx={10}
          width={68}
          height={22}
          fill="white"
          opacity={0.95}
        />

        <text
          y={radius + 26}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill={color}
        >
          {xp.toLocaleString()} XP
        </text>
      </motion.g>

      {/* Completion */}
      <text
        y={radius + 50}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="#111827"
      >
        {title}
      </text>

      <text
        y={radius + 70}
        textAnchor="middle"
        fontSize="12"
        fill="#6b7280"
      >
        {subtitle}
      </text>

      <text
        y={radius + 90}
        textAnchor="middle"
        fontSize="12"
        fill="#22c55e"
        fontWeight="600"
      >
        {completed}/{total} • {percent}%
      </text>
    </g>
  );
}
