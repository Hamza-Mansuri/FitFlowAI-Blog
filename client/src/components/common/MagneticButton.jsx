import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { transitions } from "../../hooks/useAnimationConfig";

/**
 * MagneticButton component.
 * Pulls itself towards the cursor when the user hovers close to it,
 * creating a highly satisfying, premium interactive micro-interaction.
 */
export function MagneticButton({
  children,
  className = "",
  onClick,
  variant = "primary", // 'primary' | 'secondary'
  ...props
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the translation offsets
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for magnetic pull
  const springConfig = transitions.magnetic;
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate distance from button center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Apply magnetic pull factor (0.35 translates 35% of the mouse movement to the button)
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Return to original center position
    x.set(0);
    y.set(0);
  };

  const baseStyles = "relative px-8 py-4 rounded-full font-medium text-sm sm:text-base tracking-wide transition-all duration-300 select-none overflow-hidden outline-none cursor-pointer flex items-center justify-center gap-2";
  
  const variantStyles =
    variant === "primary"
      ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-400/50 hover:bg-emerald-400 font-semibold"
      : "bg-slate-900/60 backdrop-blur-md text-white border border-slate-700/50 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]";

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.button
        style={{
          x: springX,
          y: springY,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`${baseStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {/* Subtle dynamic background glow for primary button on hover */}
        {variant === "primary" && (
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 hover:opacity-15 transition-opacity duration-300 pointer-events-none" />
        )}

        {/* Glow orb that follows mouse inside secondary button */}
        {variant === "secondary" && isHovered && (
          <motion.span
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(6,182,212,0.15)_0%,transparent_50%)]"
            style={{
              "--x": "50%",
              "--y": "50%",
            }}
          />
        )}
        
        {children}
      </motion.button>
    </div>
  );
}

export default MagneticButton;
