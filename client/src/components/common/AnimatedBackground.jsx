import { useState, useRef } from "react";
import GlowLayer from "./GlowLayer";
import FloatingParticles from "./FloatingParticles";
import HeroCursorGlow from "./HeroCursorGlow";

function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: null, y: null });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950/5 select-none dark:bg-[#030708] transition-colors duration-500"
    >
      {/* Soft moving ambient glow spots */}
      <GlowLayer />

      {/* Grid overlay for tech look (subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-1" />

      {/* Custom Mouse tracking radial glow */}
      <HeroCursorGlow mousePosition={mousePosition} />

      {/* Floating interactive canvas particles */}
      <FloatingParticles mousePosition={mousePosition} />
    </div>
  );
}

export default AnimatedBackground;
