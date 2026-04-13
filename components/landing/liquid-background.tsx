"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

export const LiquidBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <div className="grain-overlay" />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-white">
        <motion.div
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="liquid-orb absolute h-[800px] w-[800px] rounded-full bg-blue-100/40"
        />
        <motion.div
          style={{
            x: springX,
            y: springY,
            translateX: "20%",
            translateY: "-20%",
          }}
          className="liquid-orb absolute h-[600px] w-[600px] rounded-full bg-purple-100/30"
        />
        <motion.div
          style={{
            x: springX,
            y: springY,
            translateX: "-80%",
            translateY: "40%",
          }}
          className="liquid-orb absolute h-[700px] w-[700px] rounded-full bg-pink-100/30"
        />
      </div>
    </>
  );
};
