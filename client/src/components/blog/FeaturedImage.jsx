import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import gautam from "../../assets/images/gautam.png";

function FeaturedImage() {
  const containerRef = useRef(null);
  
  // Motion values for tracking cursor relative to the image container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Eased spring configuration for smooth cursor responsiveness
  const springConfig = { stiffness: 100, damping: 20 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Map position to subtle translation offsets (parallax/rotation effect)
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized position from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-square overflow-hidden rounded-[2rem] bg-slate-900/40 border border-white/5 shadow-2xl cursor-pointer group"
      style={{ perspective: 1000 }}
    >
      {/* Background glow behind Gautam */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-green-500/10 z-0 pointer-events-none" />

      {/* Main Image Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
        }}
        className="w-full h-full relative z-10 flex items-end justify-center"
      >
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src={gautam}
          alt="Featured Trainer Gautam Jani"
          loading="lazy"
          className="h-[92%] w-auto object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </motion.div>

      {/* Modern Overlay vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none z-20" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none z-35" />
    </div>
  );
}

export default FeaturedImage;
