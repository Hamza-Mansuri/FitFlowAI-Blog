import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { variants } from "../../hooks/useAnimationConfig";

/**
 * HeroContent component.
 * Displays center-aligned heading, description, and CTAs.
 * Implements smooth stagger animations on load.
 */
export function HeroContent() {
  const containerVariants = variants.staggerContainer(0.2, 0.2);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto py-12 select-none"
    >
      {/* Premium Badge */}
      <motion.div
        variants={variants.fadeUp}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs sm:text-sm font-medium text-emerald-400 backdrop-blur-md mb-8 hover:bg-emerald-500/15 transition-all duration-300 cursor-pointer"
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>FitFlowAI v2.0 - Premium Coaching</span>
      </motion.div>

      {/* Large Premium Heading */}
      <motion.h1
        variants={variants.fadeUp}
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
      >
        Elevate Your <br />
        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(16,185,129,0.3)]">
          Fitness Journey.
        </span>
      </motion.h1>

      {/* Short description */}
      <motion.p
        variants={variants.fadeUp}
        className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-10 px-4"
      >
        Experience a premium blend of science-backed workout plans, nutrition logging, and personalized AI-driven coaching designed to elevate your routine.
      </motion.p>

      {/* Call to Actions with stagger and magnetic pull */}
      <motion.div
        variants={variants.fadeUp}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full"
      >
        <MagneticButton variant="primary">
          Get Started Now
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </MagneticButton>

        <MagneticButton variant="secondary">
          Explore Features
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
}

export default HeroContent;
