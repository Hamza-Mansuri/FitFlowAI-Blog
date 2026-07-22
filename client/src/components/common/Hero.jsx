import { useEffect } from "react";
import InteractiveBackground from "./InteractiveBackground";
import HeroContent from "./HeroContent";

/**
 * Premium Hero component for FitFlowAI.
 * Features a full-screen interactive Three.js fluid shader background
 * and elegant typography with premium Framer Motion animations.
 */
export function Hero() {
  // Ensure the body has background color set nicely during transitions
  useEffect(() => {
    document.body.style.backgroundColor = "#0a0d14";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center bg-[#0a0d14]">
      {/* Fullscreen Interactive Background */}
      <InteractiveBackground />

      {/* Hero Content Overlay */}
      <HeroContent />

      {/* Sleek bottom gradient overlay to blend into the rest of the page content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0d14] to-transparent pointer-events-none z-10" />
    </section>
  );
}

export default Hero;