import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

function HeroCursorGlow({ mousePosition }) {
  const glowX = useMotionValue(-100);
  const glowY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const cursorX = useSpring(glowX, springConfig);
  const cursorY = useSpring(glowY, springConfig);

  useEffect(() => {
    if (mousePosition.x !== null && mousePosition.y !== null) {
      glowX.set(mousePosition.x - 250); // Offset half of the glow width (500px)
      glowY.set(mousePosition.y - 250);
    }
  }, [mousePosition, glowX, glowY]);

  if (mousePosition.x === null || mousePosition.y === null) {
    return null;
  }

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-10 opacity-60 dark:opacity-40 blur-[100px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18)_0%,rgba(16,185,129,0)_70%)]"
    />
  );
}

export default HeroCursorGlow;
