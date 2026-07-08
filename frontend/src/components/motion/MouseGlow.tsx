"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 25, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25, mass: 0.8 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          width: 500,
          height: 500,
          marginLeft: -250,
          marginTop: -250,
          background: "radial-gradient(circle, rgba(147,51,234,0.08) 0%, rgba(219,39,119,0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
