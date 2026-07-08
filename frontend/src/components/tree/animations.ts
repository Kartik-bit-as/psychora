// frontend/src/components/tree/animations.ts

import { NodeStatus } from "./types";

/* ==========================================================
   Psychora Neural Tree Animation Engine
   ----------------------------------------------------------
   All animation calculations live here.
   Components only consume these values.
========================================================== */

export const ANIMATION = {
  ROOT_PULSE: 3,
  LEAF_SWAY: 5,
  XP_SPEED: 2.5,
  PARTICLE_SPEED: 10,
  NODE_BREATH: 2.8,
  GLOW_SPEED: 2.2,
};

/* ----------------------------------------------------------
   Helpers
---------------------------------------------------------- */

export const clamp = (
  value: number,
  min: number,
  max: number
): number => Math.min(Math.max(value, min), max);

export const lerp = (
  start: number,
  end: number,
  t: number
): number => start + (end - start) * t;

export const easeOutCubic = (x: number) =>
  1 - Math.pow(1 - x, 3);

export const easeInOutSine = (x: number) =>
  -(Math.cos(Math.PI * x) - 1) / 2;

export const oscillate = (
  time: number,
  speed = 1,
  amplitude = 1
) => Math.sin(time * speed) * amplitude;

/* ----------------------------------------------------------
   Node Scale Animation
---------------------------------------------------------- */

export function getNodeScale(
  progress: number,
  hovered: boolean,
  selected: boolean,
  time: number
): number {

  let scale = 1;

  if (progress === 100)
    scale += 0.04;

  if (hovered)
    scale += 0.08;

  if (selected)
    scale += 0.1;

  scale +=
    oscillate(
      time,
      ANIMATION.NODE_BREATH,
      0.02
    );

  return scale;
}

/* ----------------------------------------------------------
   Node Glow
---------------------------------------------------------- */

export function getGlowOpacity(
  progress: number,
  hovered: boolean,
  time: number
): number {

  let glow = 0.15;

  glow += progress / 100 * 0.4;

  if (hovered)
    glow += 0.3;

  glow +=
    oscillate(
      time,
      ANIMATION.GLOW_SPEED,
      0.05
    );

  return clamp(glow, 0, 1);
}

/* ----------------------------------------------------------
   Root Pulse
---------------------------------------------------------- */

export function getRootScale(
  time: number
): number {

  return (
    1 +
    oscillate(
      time,
      ANIMATION.ROOT_PULSE,
      0.05
    )
  );
}

/* ----------------------------------------------------------
   Leaf Animation
---------------------------------------------------------- */

export function getLeafRotation(
  index: number,
  time: number
): number {

  return (
    Math.sin(
      time * 0.7 + index
    ) * 8
  );
}

export function getLeafScale(
  completed: boolean,
  time: number
): number {

  if (!completed)
    return 0.8;

  return (
    1 +
    Math.sin(
      time * 1.8
    ) * 0.06
  );
}

/* ----------------------------------------------------------
   Branch Stroke Width
---------------------------------------------------------- */

export function getBranchWidth(
  progress: number
): number {

  return lerp(
    2,
    5,
    progress / 100
  );
}

/* ----------------------------------------------------------
   Branch Glow
---------------------------------------------------------- */

export function getBranchGlow(
  progress: number,
  hovered: boolean,
  time: number
): number {

  let glow =
    progress / 100;

  if (hovered)
    glow += 0.3;

  glow +=
    oscillate(
      time,
      1.6,
      0.04
    );

  return clamp(glow, 0, 1);
}

/* ----------------------------------------------------------
   XP Flow Animation
---------------------------------------------------------- */

export function getXPPosition(
  elapsed: number
): number {

  return (
    (elapsed * ANIMATION.XP_SPEED) %
    100
  );
}

/* ----------------------------------------------------------
   Particle Floating
---------------------------------------------------------- */

export function getParticleY(
  base: number,
  time: number,
  offset: number
): number {

  return (
    base +
    Math.sin(
      time + offset
    ) * 8
  );
}

export function getParticleOpacity(
  time: number,
  offset: number
): number {

  return (
    0.4 +
    Math.sin(
      time * 1.3 + offset
    ) * 0.2
  );
}

/* ----------------------------------------------------------
   Unlock Animation
---------------------------------------------------------- */

export function getUnlockScale(
  unlocked: boolean,
  elapsed: number
): number {

  if (!unlocked)
    return 1;

  const t =
    clamp(
      elapsed,
      0,
      1
    );

  return lerp(
    0.8,
    1,
    easeOutCubic(t)
  );
}

/* ----------------------------------------------------------
   Progress Ring
---------------------------------------------------------- */

export function getProgressOffset(
  radius: number,
  progress: number
): number {

  const circumference =
    2 *
    Math.PI *
    radius;

  return (
    circumference -
    (progress / 100) *
      circumference
  );
}

/* ----------------------------------------------------------
   XP Color
---------------------------------------------------------- */

export function getXPColor(
  state: NodeStatus
): string {

  switch (state) {

    case "locked":
      return "#d1d5db";

    case "available":
      return "#f59e0b";

    case "learning":
      return "#fb923c";

    case "mastered":
      return "#22c55e";

    default:
      return "#a855f7";
  }
}

/* ----------------------------------------------------------
   Progress Color
---------------------------------------------------------- */

export function getProgressColor(
  progress: number
): string {

  if (progress >= 100)
    return "#22c55e";

  if (progress >= 60)
    return "#f97316";

  if (progress >= 20)
    return "#a855f7";

  return "#cbd5e1";
}

/* ----------------------------------------------------------
   Animation Delay
---------------------------------------------------------- */

export function staggerDelay(
  index: number,
  amount = 0.08
): number {

  return index * amount;
}
