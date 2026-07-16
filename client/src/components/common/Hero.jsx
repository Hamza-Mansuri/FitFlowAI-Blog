import Container from "../layout/Container";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Hero() {
  const [seg1, setSeg1] = useState("");
  const [seg2, setSeg2] = useState("");
  const [seg3, setSeg3] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const text1 = "Learn.";
    const text2 = " Train.";
    const text3 = " Transform Your Lifestyle.";

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
    <section className="relative pt-16 pb-6 overflow-hidden">
      <Container>
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-xs font-extrabold text-green-700 dark:bg-green-950/30 dark:text-green-400 border border-green-200/50 dark:border-green-900/30 backdrop-blur"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
            📚 Evidence-Based Fitness Education
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white tracking-tight min-h-[90px] sm:min-h-[120px] md:min-h-[150px]"
          >
            {seg1}
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">{seg2}</span>
            <br />
            {seg3}
            {isTyping && <span className="animate-pulse text-green-500 select-none">|</span>}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-650 md:text-lg dark:text-slate-300"
          >
            Explore science-backed articles on strength training,
            nutrition, fat loss, recovery, and healthy living to
            build lasting fitness habits.
          </motion.p>

        </div>
      </Container>
    </section>
  );
}

export default Hero;