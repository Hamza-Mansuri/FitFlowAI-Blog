import { useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

function Hero() {
  // Mouse Position for subtle 5-10px parallax/follow effect (GPU accelerated)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth movement
  const bgX = useSpring(useTransform(mouseX, [-400, 400], [-15, 15]), { stiffness: 45, damping: 22 });
  const bgY = useSpring(useTransform(mouseY, [-400, 400], [-15, 15]), { stiffness: 45, damping: 22 });

  // Scroll animations: fade content out, translate upward subtly as user scrolls
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const contentY = useTransform(scrollY, [0, 450], [0, -45]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallel diagonal tracks configuration (Layer 3) - Durations halved for faster movement, opacities increased for light mode
  const beams = useMemo(() => [
    { id: 1, left: "15%", top: "-25%", width: "80px", color: "from-emerald-500/0 via-emerald-400/70 dark:via-emerald-400/70 to-emerald-500/0", duration: 3.5, delay: 0 },
    { id: 2, left: "45%", top: "-15%", width: "100px", color: "from-teal-500/0 via-teal-400/62 dark:via-teal-400/62 to-teal-500/0", duration: 4.8, delay: -1 },
    { id: 3, left: "72%", top: "-30%", width: "130px", color: "from-cyan-500/0 via-cyan-400/65 dark:via-cyan-400/65 to-cyan-500/0", duration: 4.0, delay: -2 },
    { id: 4, left: "30%", top: "5%", width: "90px", color: "from-green-500/0 via-green-400/58 dark:via-green-400/58 to-green-500/0", duration: 5.8, delay: -0.5 },
    { id: 5, left: "55%", top: "-10%", width: "115px", color: "from-emerald-500/0 via-teal-400/65 dark:via-teal-400/65 to-emerald-500/0", duration: 4.2, delay: -3 },
    { id: 6, left: "10%", top: "15%", width: "85px", color: "from-teal-500/0 via-emerald-450/62 dark:via-emerald-450/62 to-teal-500/0", duration: 5.2, delay: -1.5 },
    { id: 7, left: "80%", top: "-20%", width: "125px", color: "from-cyan-500/0 via-teal-400/62 dark:via-teal-400/62 to-cyan-500/0", duration: 3.8, delay: -1.2 },
    { id: 8, left: "35%", top: "0%", width: "95px", color: "from-green-500/0 via-emerald-400/58 dark:via-emerald-400/58 to-green-500/0", duration: 5.0, delay: -2.5 }
  ], []);

  // Tiny Floating Particles Configuration (Layer 4)
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1.5, // 1.5px to 3.5px
      duration: Math.random() * 12 + 18, // 18s to 30s
      delay: Math.random() * -15,
    }));
  }, []);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen min-h-[650px] overflow-hidden flex flex-col items-center justify-between text-slate-800 dark:text-white select-none bg-[#f8fafc] dark:bg-[#030708] transition-colors duration-500"
    >
      {/* LAYER 1: Deep light/dark base background */}
      <div className="absolute inset-0 w-full h-full bg-[#f8fafc] dark:bg-[#030708] pointer-events-none transition-colors duration-500" />

      {/* LAYER 2: Large blurred emerald/teal background ambient gradients - Increased significantly for light mode visibility */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute top-[8%] left-[3%] w-[650px] h-[650px] rounded-full bg-emerald-500/[0.22] dark:bg-emerald-500/[0.14] blur-[140px] pointer-events-none transition-all"
      />
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute bottom-[8%] right-[3%] w-[700px] h-[700px] rounded-full bg-teal-500/[0.16] dark:bg-teal-500/[0.1] blur-[150px] pointer-events-none transition-all"
      />

      {/* LAYER 3: Diagonal Parallel Track System with Sliding Light Beams */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-x-[-45%] inset-y-[-45%] flex justify-center items-center gap-9 pointer-events-none z-0 rotate-[-35deg]"
      >
        {beams.map((track) => (
          <div
            key={track.id}
            style={{ width: track.width }}
            className="relative h-full bg-emerald-500/[0.04] dark:bg-emerald-950/[0.04] border-x border-emerald-500/[0.04] dark:border-emerald-500/[0.04] overflow-hidden"
          >
            {/* Traveling Light Beam inside the track */}
            <motion.div
              className={`absolute inset-x-0 w-full h-[500px] bg-gradient-to-b ${track.color} blur-[45px]`}
              initial={{ y: "120%" }}
              animate={{
                y: ["120%", "-120%"],
              }}
              transition={{
                duration: track.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: track.delay,
              }}
            />
          </div>
        ))}
      </motion.div>

      {/* Fade masks at edges to make diagonal tracks and beams blend into space */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-transparent to-[#f8fafc] dark:from-[#030708] dark:via-transparent dark:to-[#030708] pointer-events-none z-1 transition-colors duration-500" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#f8fafc_95%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,#030708_95%)] pointer-events-none z-1 transition-colors duration-500" />

      {/* LAYER 4: Tiny floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            className="absolute rounded-full bg-emerald-500/25 dark:bg-emerald-455/30 blur-[0.3px]"
            animate={{
              x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
              opacity: [0.1, 0.6, 0.3, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* NOISE OVERLAY: Subtle grain/texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] pointer-events-none mix-blend-overlay z-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* LIGHTING: Soft radial glow directly behind the content - Boosted for light mode */}
      <motion.div
        style={{
          x: useSpring(useTransform(mouseX, [-400, 400], [-4, 4]), { stiffness: 45, damping: 22 }),
          y: useSpring(useTransform(mouseY, [-400, 400], [-4, 4]), { stiffness: 45, damping: 22 })
        }}
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/[0.28] dark:bg-emerald-500/[0.22] rounded-full blur-[140px] pointer-events-none z-1"
      />

      {/* LAYER 5: Hero content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 max-w-5xl mx-auto text-center pt-28 pb-12"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 backdrop-blur-md mb-8 hover:bg-emerald-500/15 transition-all duration-300 cursor-pointer"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Evidence-Based Fitness Education</span>
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.18] text-slate-900 dark:text-white max-w-4xl flex flex-col items-center select-none">
          <span className="flex flex-wrap justify-center gap-x-4 overflow-hidden py-1">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="inline-block bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent"
            >
              Learn.
            </motion.span>
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="inline-block bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(16,185,129,0.1)] dark:drop-shadow-[0_0_25px_rgba(16,185,129,0.25)] font-black"
            >
              Train.
            </motion.span>
          </span>
          <span className="block overflow-hidden py-2 mt-1">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="inline-block bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent"
            >
              Transform Your Lifestyle.
            </motion.span>
          </span>
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-base md:text-lg text-slate-650 dark:text-slate-400 leading-relaxed font-light px-2"
        >
          Explore science-backed fitness, nutrition and lifestyle articles designed to help you build lasting healthy habits.
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: scrollIndicatorOpacity }}
        transition={{ delay: 0.85, duration: 1.2 }}
        className="relative z-10 pb-8 flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400/80 hover:text-emerald-600 dark:hover:text-emerald-450 transition-colors duration-300 cursor-pointer"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight - 64,
            behavior: "smooth",
          });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-60">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-1.5 opacity-80"
        >
          <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;