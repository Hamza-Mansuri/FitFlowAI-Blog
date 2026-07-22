import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronRight, FaRegCompass, FaDumbbell, FaHeartbeat, FaBrain, FaCircle } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function PremiumHero() {
  const containerRef = useRef(null);
  const layersRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check screen size and user motion preferences
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Isometric cards layout is optimized for large screens
    };
    
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    
    const handleMotionChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // GSAP Floating and Scroll Parallax Logic
  useEffect(() => {
    if (prefersReducedMotion) return;

    const layers = layersRef.current.filter(Boolean);
    const ctx = gsap.context(() => {
      // 1. Infinite Floating Animation (suspended in water effect)
      layers.forEach((layer, index) => {
        // Assign random offsets and durations to create unique organic flows
        const floatDurationX = 14 + index * 2;
        const floatDurationY = 11 + index * 3;
        const floatAmpX = 12 + (index % 3) * 10;
        const floatAmpY = 15 + (index % 2) * 12;

        // X-axis floating
        gsap.to(layer, {
          x: `+=${floatAmpX}`,
          duration: floatDurationX,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.4,
        });

        // Y-axis floating
        gsap.to(layer, {
          y: `+=${floatAmpY}`,
          duration: floatDurationY,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1,
        });
      });

      // 2. Scroll Parallax Logic
      layers.forEach((layer) => {
        const scrollFactor = parseFloat(layer.dataset.scrollFactor || "0.08");
        
        gsap.to(layer, {
          y: () => -window.scrollY * scrollFactor,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  // 3. Mouse Move Parallax Logic
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const container = containerRef.current;
    const layers = layersRef.current.filter(Boolean);

    // Create target values for each layer to avoid layout thrashing
    const quickTos = layers.map((layer) => {
      const mouseFactor = parseFloat(layer.dataset.mouseFactor || "0.02");
      return {
        element: layer,
        xTo: gsap.quickTo(layer, "x", { duration: 1.5, ease: "power3.out" }),
        yTo: gsap.quickTo(layer, "y", { duration: 1.5, ease: "power3.out" }),
        mouseFactor,
      };
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized position relative to center (-0.5 to 0.5)
      const normX = (clientX / innerWidth) - 0.5;
      const normY = (clientY / innerHeight) - 0.5;

      // Update positions using GSAP quickTo
      quickTos.forEach(({ xTo, yTo, mouseFactor }) => {
        const targetX = normX * innerWidth * mouseFactor;
        const targetY = normY * innerHeight * mouseFactor;
        xTo(targetX);
        yTo(targetY);
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [prefersReducedMotion, isMobile]);

  // Push layers safely into refs
  const addToRefs = (el) => {
    if (el && !layersRef.current.includes(el)) {
      layersRef.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[92vh] w-full flex items-center overflow-hidden bg-[#05070d] py-16 lg:py-24 px-6 md:px-12 select-none"
    >
      {/* Background Radial Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] top-[-10%] left-[-10%]" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] bottom-[10%] right-[-10%]" />
        
        {/* Fine Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" className="w-full h-full text-slate-700">
            <defs>
              <pattern id="hero-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
          </svg>
        </div>

        {/* Soft top white spot lighting glow */}
        <div className="absolute top-0 left-[30%] right-[30%] h-[200px] bg-gradient-to-b from-white/5 to-transparent blur-[70px]" />
      </div>

      {/* Hero Content Wrapper */}
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side Content Column */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left items-start">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/40 px-3.5 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-md mb-8"
          >
            <span className="text-emerald-400 font-extrabold tracking-wider mr-1">FitFlowAI</span>
            <div className="h-3 w-[1px] bg-slate-800" />
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              What's new in v2.0
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl leading-[1.08] text-white font-sans"
          >
            Build stunning plans <br />
            & health routines <br />
            <span className="relative inline-block text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text">
              like a pro
              <span className="absolute bottom-1.5 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-400"
          >
            Design custom workouts, schedule nutrition programs, and analyze biometrics in a stunning dark interface built for pro athletes and high performers.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                to="/signup"
                className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-7 py-4 text-sm font-bold shadow-lg shadow-cyan-500/10 transition duration-300"
              >
                Check 60+ Fitness Routines
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-7 py-4 text-sm font-bold shadow-lg shadow-emerald-500/10 transition duration-300"
              >
                Access Platform
              </Link>
            </motion.div>
          </motion.div>

          {/* Social Validation Avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex items-center gap-3.5"
          >
            <div className="flex -space-x-3.5 overflow-hidden">
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-950 object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Athlete 1"
              />
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-950 object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="Athlete 2"
              />
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-950 object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                alt="Athlete 3"
              />
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-950 object-cover"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                alt="Athlete 4"
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-500">
              Trusted by <span className="text-slate-300 font-semibold">12,000+</span> athletes & coaches
            </div>
          </motion.div>
        </div>

        {/* Right Side: Isometric Showcase Column */}
        <div className="lg:col-span-6 relative w-full h-[550px] lg:h-[650px] flex items-center justify-center overflow-visible">
          {/* Isometric Transform Container */}
          <div className="relative w-full max-w-[450px] h-[400px] perspective-[1200px] preserve-3d transform-gpu">
            <div className="absolute inset-0 rotate-x-[55deg] rotate-z-[-40deg] skew-x-[-2deg] scale-[0.85] sm:scale-100 preserve-3d">
              
              {/* Background Glass Plate Layer 0 */}
              <div 
                ref={addToRefs}
                data-mouse-factor="0.015"
                data-scroll-factor="0.04"
                className="absolute inset-0 bg-[#0e1628]/25 backdrop-blur-[4px] border border-white/[0.04] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
              />

              {/* Card A: Heart Rate Live Graph (Elevated slightly) */}
              <div
                ref={addToRefs}
                data-mouse-factor="0.03"
                data-scroll-factor="0.08"
                className="absolute top-[8%] left-[5%] w-[85%] bg-slate-950/70 border border-white/[0.06] rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] translate-z-[40px] preserve-3d backdrop-blur-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                      <FaHeartbeat className="text-sm animate-pulse" />
                    </span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live Biometrics</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 rounded-full px-2.5 py-0.5 text-[10px] font-bold">
                    <FaCircle className="text-[6px] animate-ping" />
                    142 BPM
                  </div>
                </div>

                {/* SVG Graph path */}
                <div className="h-28 w-full flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="1" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 Q25,20 50,60 T100,30 T150,75 T200,45 T250,85 T300,30"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,80 Q25,20 50,60 T100,30 T150,75 T200,45 T250,85 T300,30 L300,100 L0,100 Z"
                      fill="url(#chart-glow)"
                    />
                  </svg>
                </div>
                <div className="flex justify-between items-center mt-3 text-[10px] text-slate-500 font-semibold uppercase">
                  <span>10 mins ago</span>
                  <span>Now</span>
                </div>
              </div>

              {/* Card B: AI Workout Planner Card (Elevated further) */}
              <div
                ref={addToRefs}
                data-mouse-factor="0.045"
                data-scroll-factor="0.12"
                className="absolute top-[40%] right-[-5%] w-[80%] bg-slate-950/85 border border-white/[0.08] rounded-2xl p-5 shadow-[0_25px_80px_rgba(6,182,212,0.15)] translate-z-[90px] preserve-3d backdrop-blur-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                      <FaDumbbell className="text-sm" />
                    </span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">AI Daily Routine</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">Day 12 / 30</span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/[0.03]">
                    <span className="text-xs text-slate-300 font-medium">Warmup: Dynamic Stretching</span>
                    <span className="text-[10px] text-cyan-400 font-bold">Done</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-950/20 border border-cyan-500/10">
                    <span className="text-xs text-cyan-200 font-semibold">Barbell Deadlift (4x8)</span>
                    <span className="text-[10px] text-cyan-400 font-bold animate-pulse">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.01]">
                    <span className="text-xs text-slate-400">Plank Hold (3x60s)</span>
                    <span className="text-[10px] text-slate-600">Pending</span>
                  </div>
                </div>
              </div>

              {/* Card C: AI Coach Assistant Dialogue (Highest layer floating on right) */}
              <div
                ref={addToRefs}
                data-mouse-factor="0.06"
                data-scroll-factor="0.16"
                className="absolute bottom-[5%] left-[2%] w-[75%] bg-slate-900/90 border border-white/[0.1] rounded-xl p-4 shadow-[0_30px_100px_rgba(0,0,0,0.6)] translate-z-[130px] preserve-3d backdrop-blur-md"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <FaBrain className="text-xs" />
                  </span>
                  <span className="text-xs font-bold text-slate-200">Coach AI</span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed italic">
                  "Biometrics indicators show heart rate recovery is performing optimal. Ready to advance routine weight load by 5%."
                </p>
                <div className="flex gap-1.5 mt-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
