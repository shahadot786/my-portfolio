"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

export function MouseFollower() {
  const [mounted, setMounted] = useState(false);
  const [hoverType, setHoverType] = useState<"default" | "link" | "button" | "text">("default");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (target.closest("a")) {
        setHoverType("link");
      } else if (target.closest("button")) {
        setHoverType("button");
      } else if (target.closest("h1, h2, h3, p")) {
        setHoverType("text");
      } else {
        setHoverType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  const cursorSize = hoverType === "link" || hoverType === "button" ? 80 : hoverType === "text" ? 40 : 20;
  const cursorOpacity = hoverType === "default" ? 0.3 : 0.15;

  return (
    <>
      {/* Dynamic Interactive Glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full blur-[80px] pointer-events-none z-30 transition-colors duration-500"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: hoverType !== "default" ? 300 : 500,
          height: hoverType !== "default" ? 300 : 500,
          backgroundColor: hoverType === "link" ? "rgba(6, 182, 212, 0.2)" : "rgba(16, 185, 129, 0.15)",
          background: hoverType === "button"
            ? "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)"
            : undefined
        }}
      />

      {/* Smart Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-primary/40 rounded-full pointer-events-none z-50 flex items-center justify-center overflow-hidden"
        animate={{
          width: cursorSize,
          height: cursorSize,
          backgroundColor: hoverType === "text" ? "rgba(16, 185, 129, 0.05)" : "transparent",
          borderColor: hoverType === "link" ? "rgba(6, 182, 212, 0.5)" : "rgba(16, 185, 129, 0.4)",
          borderWidth: hoverType === "default" ? 1 : 2,
        }}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <AnimatePresence>
          {(hoverType === "link" || hoverType === "button") && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Outer subtle aesthetic ring */}
      <motion.div
        className="fixed top-0 left-0 w-[100px] h-[100px] border border-primary/5 rounded-full pointer-events-none z-20 hidden lg:block"
        animate={{
          scale: hoverType !== "default" ? 1.5 : 1,
          opacity: hoverType !== "default" ? 0 : 1,
        }}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
