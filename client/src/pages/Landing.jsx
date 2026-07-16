import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaRunning, FaDumbbell, FaAppleAlt, FaSpa, FaHeart, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import PageTransition from "../components/common/PageTransition";

function Landing() {
  // Typewriter effect state
  const [seg1, setSeg1] = useState("");
  const [seg2, setSeg2] = useState("");
  const [seg3, setSeg3] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Deliberate mistake: "Bild" -> delete back to "Bi" -> type "Build a Stronger, "
    const frames1 = [
      "B", 
      "Bi", 
      "Bil", 
      "Bild", // Mistake!
      "Bild", // Pause
      "Bil",  // Backspace
      "Bi",   // Backspace
      "B",    // Backspace
      "Bu", 
      "Bui", 
      "Buil", 
      "Build", 
      "Build ", 
      "Build a", 
      "Build a ",
      "Build a S", 
      "Build a St", 
      "Build a Str", 
      "Build a Stro", 
      "Build a Stron", 
      "Build a Strong", 
      "Build a Stronge", 
      "Build a Stronger", 
      "Build a Stronger,", 
      "Build a Stronger, "
    ];
    
    const frames2 = [
      "H", "He", "Hea", "Heal", "Healt", "Health", "Healthi", "Healthie", "Healthier"
    ];
    
    const frames3 = [
      " ", "Y", "Yo", "You", "You."
    ];

    let currentFrame = 0;
    const timer1 = setInterval(() => {
      if (currentFrame < frames1.length) {
        setSeg1(frames1[currentFrame]);
        currentFrame++;
      } else {
        clearInterval(timer1);
        
        let currentFrame2 = 0;
        const timer2 = setInterval(() => {
          if (currentFrame2 < frames2.length) {
            setSeg2(frames2[currentFrame2]);
            currentFrame2++;
          } else {
            clearInterval(timer2);
            
            let currentFrame3 = 0;
            const timer3 = setInterval(() => {
              if (currentFrame3 < frames3.length) {
                setSeg3(frames3[currentFrame3]);
                currentFrame3++;
              } else {
                clearInterval(timer3);
                setIsTyping(false);
              }
            }, 60);
          }
        }, 70);
      }
    }, 65);

    return () => {
      clearInterval(timer1);
    };
  }, []);

  // Mouse Follow Glow Effect coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 45, stiffness: 280, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 150); // Offset by half the glow element width
      mouseY.set(e.clientY - 150);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
  };

  const categories = [
    { name: "Workout", icon: <FaDumbbell className="text-3xl text-green-400" />, desc: "High-intensity training, strength routines, and exercise optimization." },
    { name: "Nutrition", icon: <FaAppleAlt className="text-3xl text-emerald-400" />, desc: "Evidence-based diet guides, protein timing, and healthy recipes." },
    { name: "Recovery", icon: <FaSpa className="text-3xl text-teal-400" />, desc: "Active rest days, dynamic stretching, and sleep improvement hacks." },
    { name: "Health", icon: <FaHeart className="text-3xl text-red-400" />, desc: "Hydration science, biometric insights, and longevity wellness." },
    { name: "Lifestyle", icon: <FaRunning className="text-3xl text-blue-400" />, desc: "Consistency mindset, fitness habit loops, and daily structure." },
  ];

  return (
    <PageTransition>
      <SEO 
        title="FitFlowAI | Evidence-Based Fitness Hub"
        description="Unlock your physical potential with evidence-based guides, dynamic workouts, and personalized fitness tools."
      />

      <div className="relative min-h-screen bg-[#05070d] text-white selection:bg-green-500 selection:text-slate-900 overflow-x-hidden">
        
        {/* Subtle Mouse Glow */}
        <motion.div 
          className="fixed pointer-events-none z-30 w-[300px] h-[300px] rounded-full bg-green-500/8 blur-[100px]"
          style={{ x: glowX, y: glowY }}
        />

        {/* Ambient background glows */}
        <GlowBackground />

        {/* Dedicated Landing Header */}
        <header className="sticky top-0 z-50 border-b border-slate-900/40 bg-slate-950/65 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-slate-950 font-extrabold shadow shadow-green-500/30 transition-transform duration-300 group-hover:scale-105">
                F
              </span>
              <span className="text-xl font-extrabold tracking-tight text-white">
                FitFlow<span className="text-green-400">AI</span>
              </span>
            </Link>

            <div className="flex items-center gap-5">
              <Link to="/login" className="text-sm font-semibold text-slate-400 hover:text-white transition duration-200">
                Sign In
              </Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/signup" className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2.5 text-sm font-bold text-slate-950 transition shadow-md shadow-green-500/10 hover:shadow-lg hover:shadow-green-500/20">
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-24 pb-28 lg:pt-36 lg:pb-40 px-6 z-10">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/30 px-4 py-1.5 text-xs font-semibold text-green-400 backdrop-blur-md mb-8"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              YOUR ULTIMATE WELLNESS COMPANION
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="text-5xl font-black tracking-tight sm:text-7xl leading-[1.1] bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
            >
              {seg1} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {seg2}
              </span>
              {seg3}
              {isTyping && <span className="animate-pulse text-green-400 select-none">|</span>}
            </motion.h1>

            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="mt-8 mx-auto max-w-2xl text-lg leading-8 text-slate-400"
            >
              Explore science-backed fitness guides, workouts, nutrition, and recovery routines.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="mt-12 flex flex-wrap items-center justify-center gap-5"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-base font-bold text-slate-950 shadow-lg shadow-green-500/20"
                >
                  Join Now Free
                  <FaChevronRight className="text-xs" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/login"
                  className="rounded-full border border-slate-800 bg-slate-900/20 backdrop-blur-sm px-8 py-4 text-base font-bold text-slate-300 hover:border-slate-600 hover:text-white hover:bg-slate-900/40 transition duration-300"
                >
                  Sign In to Platform
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative border-y border-slate-900 bg-slate-950/20 py-16 px-6 z-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              <div>
                <h3 className="text-4xl font-extrabold text-white">12K+</h3>
                <p className="mt-2 text-sm text-slate-500 uppercase tracking-wider font-semibold">Active Readers</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-green-400">60+</h3>
                <p className="mt-2 text-sm text-slate-500 uppercase tracking-wider font-semibold">Expert Articles</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-white">5</h3>
                <p className="mt-2 text-sm text-slate-500 uppercase tracking-wider font-semibold">Wellness Categories</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-green-400">99.8%</h3>
                <p className="mt-2 text-sm text-slate-500 uppercase tracking-wider font-semibold">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Categories Grid */}
        <section className="py-28 px-6 relative z-10">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-extrabold sm:text-5xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Expert-Curated Categories</h2>
              <p className="mt-4 text-slate-400 text-lg">Everything you need to optimize your daily health routine.</p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -6, borderColor: "rgba(34, 197, 94, 0.3)" }}
                  className="rounded-3xl border border-slate-900 bg-slate-950/45 p-8 transition-all duration-300 shadow-xl backdrop-blur-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800/80 mb-6">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{cat.name}</h3>
                  <p className="text-sm leading-6 text-slate-400">{cat.desc}</p>
                </motion.div>
              ))}

              {/* Callout Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -6, borderColor: "rgba(34, 197, 94, 0.4)" }}
                className="rounded-3xl border border-slate-900 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent p-8 flex flex-col justify-between shadow-xl backdrop-blur-sm"
              >
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-3">And Much More...</h3>
                  <p className="text-sm leading-6 text-slate-455">
                    Get custom recipes, supplements guidance, hydration benchmarks, and mental fitness guidelines to keep you performing at peak capacity.
                  </p>
                </div>
                <Link to="/signup" className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-green-400 hover:text-green-300 transition-all duration-300 hover:gap-2.5">
                  Join to explore
                  <FaChevronRight className="text-xs" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Bottom Section */}
        <section className="relative bg-slate-950/40 py-24 px-6 border-t border-slate-900/60 text-center z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute right-[10%] top-[-20%] w-[300px] h-[300px] rounded-full bg-emerald-500 blur-[90px]" />
          </div>

          <div className="mx-auto max-w-4xl relative z-10">
            <h2 className="text-3xl font-extrabold sm:text-5xl tracking-tight text-white mb-5">
              Ready to Upgrade Your Lifestyle?
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-slate-400 text-base sm:text-lg mb-10">
              Create a free account in 30 seconds and gain instant access to all fitness and nutrition articles.
            </p>
            <div className="flex justify-center gap-5 flex-wrap">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/signup" className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-base font-bold text-slate-950 shadow-lg shadow-green-500/20">
                  Register Free
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/login" className="rounded-full border border-slate-800 bg-slate-900/20 backdrop-blur-sm px-8 py-4 text-base font-bold text-slate-300 hover:border-slate-600 hover:text-white transition duration-305">
                  Sign In
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Landing Footer */}
        <footer className="border-t border-slate-900 py-10 text-center text-xs text-slate-600 bg-slate-950 relative z-10 tracking-wider">
          <p>© {new Date().getFullYear()} FitFlowAI. All rights reserved. Designed for portfolios.</p>
        </footer>

      </div>
    </PageTransition>
  );
}

export default Landing;
