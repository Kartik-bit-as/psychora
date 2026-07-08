"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Lock } from "lucide-react";
import { memo, useMemo } from "react";

import { TreeNode as TreeNodeType } from "./types";

interface TreeNodeProps {
    node: TreeNodeType;
    scale: number;

    selected?: boolean;
    hovered?: boolean;

    onClick?: (node: TreeNodeType) => void;
    onHover?: (node: TreeNodeType | null) => void;
}

const TreeNode = ({
    node,
    scale,
    selected = false,
    onClick,
    onHover,
}: TreeNodeProps) => {

    const progress = useMemo(() => {
        if (node.total === 0) return 0;
        return Math.round((node.completed / node.total) * 100);
    }, [node.completed, node.total]);

    const isLocked = node.status === "locked";
    const isLearning = node.status === "learning";
    const isMastered = node.status === "mastered";

    const animationDuration = 2.8;

    //---------------------------------------
    // Theme Colors
    //---------------------------------------

    const palette = useMemo(() => {

        switch (node.branch) {

            case "root":
                return {
                    primary: "#22c55e",
                    light: "#86efac",
                    glow: "#bbf7d0",
                    ring: "#16a34a",
                };

            case "cognitive":
                return {
                    primary: "#8b5cf6",
                    light: "#c4b5fd",
                    glow: "#ddd6fe",
                    ring: "#7c3aed",
                };

            case "biological":
                return {
                    primary: "#22c55e",
                    light: "#86efac",
                    glow: "#dcfce7",
                    ring: "#16a34a",
                };

            case "social":
                return {
                    primary: "#ec4899",
                    light: "#f9a8d4",
                    glow: "#fce7f3",
                    ring: "#db2777",
                };

            case "personality":
                return {
                    primary: "#f97316",
                    light: "#fdba74",
                    glow: "#ffedd5",
                    ring: "#ea580c",
                };

            default:
                return {
                    primary: "#3b82f6",
                    light: "#93c5fd",
                    glow: "#dbeafe",
                    ring: "#2563eb",
                };

        }

    }, [node.branch]);

    //---------------------------------------
    // Radius
    //---------------------------------------

    const radius = node.radius;

    const iconSize = Math.max(radius * 0.42, 20);

    //---------------------------------------
    // Glow strength
    //---------------------------------------

    const glowOpacity = isLocked
        ? 0.05
        : selected
            ? 0.55
            : 0.25;

    //---------------------------------------
    // Scale animation
    //---------------------------------------

    const pulseScale = isMastered
        ? [1, 1.04, 1]
        : isLearning
            ? [1, 1.02, 1]
            : [1];

    //---------------------------------------
    // Click
    //---------------------------------------

    const handleClick = () => {
        if (onClick) onClick(node);
    };

    //---------------------------------------
    // Hover
    //---------------------------------------

    const handleMouseEnter = () => {
        onHover?.(node);
    };

    const handleMouseLeave = () => {
        onHover?.(null);
    };

    //---------------------------------------
    // Icon
    //---------------------------------------

    const Icon = node.icon;

    return (

        <motion.g

            initial={{
                opacity: 0,
                scale: .5
            }}

            animate={{
                opacity: 1,
                scale: pulseScale,
            }}

            transition={{
                duration: animationDuration,
                repeat: Infinity,
                ease: "easeInOut",
            }}

            style={{
                cursor: "pointer",
            }}

            onClick={handleClick}

            onMouseEnter={handleMouseEnter}

            onMouseLeave={handleMouseLeave}

        >

            {/* ==========================================
                    OUTER GLOW
            =========================================== */}

            <motion.circle

                cx={node.x}
                cy={node.y}

                r={radius + 18}

                fill={palette.glow}

                opacity={glowOpacity}

                animate={{
                    opacity: [
                        glowOpacity,
                        glowOpacity + .08,
                        glowOpacity,
                    ],
                }}

                transition={{
                    duration: animationDuration,
                    repeat: Infinity,
                }}

            />

            {/* ==========================================
                    SHADOW
            =========================================== */}

            <circle

                cx={node.x}
                cy={node.y + 6}

                r={radius}

                fill="#000"

                opacity={0.08}

            />

            {/* ==========================================
                    MAIN CIRCLE
            =========================================== */}

            <motion.circle

                cx={node.x}
                cy={node.y}

                r={radius}

                fill="white"

                stroke={palette.primary}

                strokeWidth={4}

                whileHover={{
                    scale: 1.04,
                }}

            />            {/* ==========================================
                    INNER SOFT GRADIENT
            =========================================== */}

            <motion.circle
                cx={node.x}
                cy={node.y}
                r={radius - 4}
                fill={palette.light}
                opacity={0.22}
                animate={{
                    opacity: [0.18, 0.3, 0.18],
                }}
                transition={{
                    duration: animationDuration,
                    repeat: Infinity,
                }}
            />

            {/* ==========================================
                    PROGRESS RING
            =========================================== */}

            {!isLocked && (
                <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={radius + 8}
                    fill="none"
                    stroke={palette.primary}
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * (radius + 8)}
                    strokeDashoffset={
                        (2 * Math.PI * (radius + 8)) *
                        (1 - progress / 100)
                    }
                    initial={{
                        strokeDashoffset: 2 * Math.PI * (radius + 8),
                    }}
                    animate={{
                        strokeDashoffset:
                            (2 * Math.PI * (radius + 8)) *
                            (1 - progress / 100),
                    }}
                    transition={{
                        duration: 1,
                    }}
                />
            )}

            {/* ==========================================
                    ICON HOLDER
            =========================================== */}

            <motion.circle
                cx={node.x}
                cy={node.y - radius * 0.28}
                r={iconSize * 0.9}
                fill={palette.primary}
                stroke="white"
                strokeWidth={3}
                whileHover={{
                    scale: 1.08,
                }}
            />

            {/* ==========================================
                    ICON
            =========================================== */}

            <foreignObject
                x={node.x - iconSize / 2}
                y={node.y - radius * 0.28 - iconSize / 2}
                width={iconSize}
                height={iconSize}
                style={{
                    overflow: "visible",
                    pointerEvents: "none",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon
                        size={iconSize * 0.65}
                        color="white"
                        strokeWidth={2.5}
                    />
                </div>
            </foreignObject>

            {/* ==========================================
                    TITLE
            =========================================== */}

            <text
                x={node.x}
                y={node.y + radius * 0.38}
                textAnchor="middle"
                fontSize={Math.max(radius * 0.22, 12)}
                fontWeight={700}
                fill="#2d1b22"
            >
                {node.title}
            </text>

            {/* ==========================================
                    SUBTITLE
            =========================================== */}

            {node.subtitle && (
                <text
                    x={node.x}
                    y={node.y + radius * 0.62}
                    textAnchor="middle"
                    fontSize={11}
                    fill="#7c6f78"
                >
                    {node.subtitle}
                </text>
            )}

            {/* ==========================================
                    PROGRESS
            =========================================== */}

            {!isLocked && (
                <text
                    x={node.x}
                    y={node.y + radius * 0.84}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={600}
                    fill={palette.primary}
                >
                    {node.completed}/{node.total}
                </text>
            )}

            {/* ==========================================
                    XP BADGE
            =========================================== */}

            {!isLocked && (
                <motion.g
                    animate={{
                        y: [0, -2, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                >
                    <circle
                        cx={node.x + radius * 0.72}
                        cy={node.y - radius * 0.72}
                        r={16}
                        fill="#ffffff"
                        stroke={palette.primary}
                        strokeWidth={2}
                    />

                    <text
                        x={node.x + radius * 0.72}
                        y={node.y - radius * 0.72 + 4}
                        textAnchor="middle"
                        fontSize={10}
                        fontWeight={700}
                        fill={palette.primary}
                    >
                        {node.xp}
                    </text>
                </motion.g>
            )}

            {/* ==========================================
                    MASTERED CHECK
            =========================================== */}

            {isMastered && (
                <motion.g
                    animate={{
                        scale: [1, 1.18, 1],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                    }}
                >
                    <circle
                        cx={node.x - radius * 0.74}
                        cy={node.y - radius * 0.74}
                        r={15}
                        fill="#22c55e"
                    />

                    <foreignObject
                        x={node.x - radius * 0.74 - 9}
                        y={node.y - radius * 0.74 - 9}
                        width={18}
                        height={18}
                    >
                        <CheckCircle2
                            color="white"
                            size={18}
                            strokeWidth={3}
                        />
                    </foreignObject>
                </motion.g>
            )}

            {/* ==========================================
                    LOCKED STATE
            =========================================== */}

            {isLocked && (
                <motion.g
                    animate={{
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                >
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r={radius}
                        fill="rgba(255,255,255,.75)"
                    />

                    <foreignObject
                        x={node.x - 15}
                        y={node.y - 15}
                        width={30}
                        height={30}
                    >
                        <Lock
                            size={30}
                            color="#8b8b8b"
                            strokeWidth={2.5}
                        />
                    </foreignObject>
                </motion.g>
            )}{/* ==========================================
                    LEARNING PULSE
            =========================================== */}

            {isLearning && (
                <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={radius + 20}
                    fill="none"
                    stroke={palette.primary}
                    strokeWidth={2}
                    opacity={0.35}
                    animate={{
                        scale: [1, 1.4],
                        opacity: [0.35, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
            )}

            {/* ==========================================
                    SELECTED HALO
            =========================================== */}

            {selected && (
                <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={radius + 26}
                    fill="none"
                    stroke={palette.primary}
                    strokeWidth={3}
                    strokeDasharray="8 6"
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            )}

            {/* ==========================================
                    MASTERED SPARKLES
            =========================================== */}

            {isMastered &&
                [0, 90, 180, 270].map((angle) => {

                    const rad = (angle * Math.PI) / 180;

                    const x =
                        node.x +
                        Math.cos(rad) * (radius + 18);

                    const y =
                        node.y +
                        Math.sin(rad) * (radius + 18);

                    return (
                        <motion.circle
                            key={angle}
                            cx={x}
                            cy={y}
                            r={2.5}
                            fill="#F59E0B"
                            animate={{
                                scale: [1, 2, 1],
                                opacity: [0.2, 1, 0.2],
                            }}
                            transition={{
                                duration: 1.6,
                                delay: angle / 360,
                                repeat: Infinity,
                            }}
                        />
                    );
                })}

        </motion.g>
    );
};

export default memo(TreeNode);
