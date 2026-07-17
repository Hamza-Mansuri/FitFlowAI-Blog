import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

function Hero() {
  const [seg1, setSeg1] = useState("");
  const [seg2, setSeg2] = useState("");
  const [seg3, setSeg3] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const text1 = "Learn.";
    const text2 = " Train.";
    const text3 = "Transform Your\u00A0Lifestyle.";

    let idx1 = 0;
    const timer1 = setInterval(() => {
      if (idx1 < text1.length) {
        setSeg1(text1.substring(0, idx1 + 1));
        idx1++;
      } else {
        clearInterval(timer1);
        let idx2 = 0;
        const timer2 = setInterval(() => {
          if (idx2 < text2.length) {
            setSeg2(text2.substring(0, idx2 + 1));
            idx2++;
          } else {
            clearInterval(timer2);
            let idx3 = 0;
            const timer3 = setInterval(() => {
              if (idx3 < text3.length) {
                setSeg3(text3.substring(0, idx3 + 1));
                idx3++;
              } else {
                clearInterval(timer3);
                setIsTyping(false);
              }
            }, 55);
          }
        }, 75);
      }
    }, 65);

    return () => {
      clearInterval(timer1);
    };
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[650px] overflow-hidden flex flex-col items-center justify-between text-white select-none">
      {/* Background layer */}
      <AnimatedBackground />

      <div className="relative z-20 flex-grow flex flex-col items-center justify-center px-4 max-w-5xl mx-auto text-center pt-28 pb-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md mb-8 hover:bg-emerald-500/15 transition-all duration-300"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Evidence-Based Fitness Education</span>
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white max-w-4xl min-h-[160px] md:min-h-[220px]">
          <span>{seg1}</span>
          <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            {seg2}
          </span>
          <br />
          <span className="bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
            {seg3}
          </span>
          {isTyping && (
            <span className="animate-[blink_0.8s_infinite] text-emerald-450 ml-1 font-light">|</span>
          )}
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-base md:text-lg text-slate-650 dark:text-slate-400 leading-relaxed font-light px-2"
        >
          Explore science-backed fitness, nutrition and lifestyle articles designed to help you build lasting healthy habits.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-20 pb-8 flex flex-col items-center gap-2 text-slate-400/80 hover:text-emerald-400 transition-colors duration-300 cursor-pointer"
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

      {/* Embedded Blinking Animation styles */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

export default Hero;