"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  activeColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  activeColor = "var(--primary)"
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse values for a more premium "liquid" feel
  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Tilt values
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    mouseX.set(x);
    mouseY.set(y);

    // Calculate rotation (max 5 degrees)
    const rX = ((y / height) - 0.5) * -5;
    const rY = ((x / width) - 0.5) * 5;
    setRotateX(rX);
    setRotateY(rY);
  }

  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
  }

  return (
    <motion.div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-[var(--radius)] border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-border/0 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: rotateX !== 0 ? 1.02 : 1
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* 
          Layer 1: Border Trace 
          This creates a sharp highlight along the edge that follows the mouse. 
      */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[var(--radius)] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              150px circle at ${smoothX}px ${smoothY}px,
              hsl(${activeColor}),
              transparent 80%
            )
          `,
          transform: "translateZ(1px)",
        }}
      />

      {/* 
          Layer 2: Inner Card Body 
          This mask ensures the background remains solid, leaving the "Border Trace" only on the edges.
      */}
      <div
        className="absolute inset-[1px] rounded-[calc(var(--radius)-1px)] bg-card z-0 transition-colors duration-500 group-hover:bg-card/90"
        style={{ transform: "translateZ(0px)" }}
      />

      {/* 
          Layer 3: Surface Volumetric Glow 
          A soft, wide glow that illuminates the content area.
      */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 z-1"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${smoothX}px ${smoothY}px,
              hsl(${activeColor} / 0.1),
              transparent 80%
            )
          `,
          transform: "translateZ(2px)",
        }}
      />

      {/* 
          Layer 4: Specular Reflection (Shine)
          A sharp, intense point of light to simulate glass reflection.
      */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 z-2"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              80px circle at ${smoothX}px ${smoothY}px,
              hsl(${activeColor} / 0.2),
              transparent 70%
            )
          `,
          transform: "translateZ(3px)",
        }}
      />

      {/* Content wrapper to ensure it stays above the decorative layers */}
      <div
        className="relative z-10 h-full"
        style={{ transform: "translateZ(10px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
}
