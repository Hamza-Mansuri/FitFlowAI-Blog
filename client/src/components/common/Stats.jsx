import {
  FaBookOpen,
  FaDumbbell,
  FaAppleAlt,
  FaHeartbeat,
} from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Container from "../layout/Container";

function CountUp({ target, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Parse the target string into numerical value and suffix
    const numPart = parseFloat(target);
    const suffix = target.replace(/[0-9.]/g, "");

    if (isNaN(numPart)) {
      setCount(target);
      return;
    }

    const isDecimal = target.includes(".");
    const totalMiliseconds = duration * 1000;
    
    // Determine the step rate and value
    const steps = 60;
    const intervalTime = totalMiliseconds / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const progress = stepCount / steps;
      const currentValue = progress * numPart;

      if (stepCount >= steps) {
        setCount(numPart);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(currentValue.toFixed(1)) : Math.floor(currentValue));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [target, duration, isInView]);

  const suffix = target.replace(/[0-9.]/g, "");

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function Stats() {
  const stats = [
    {
      icon: FaBookOpen,
      value: "25K",
      label: "Active Readers",
      color: "from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400",
    },
    {
      icon: FaDumbbell,
      value: "150+",
      label: "Fitness Articles",
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: FaAppleAlt,
      value: "4.9★",
      label: "Average Rating",
      color: "from-teal-500/10 to-green-500/10 text-teal-600 dark:text-teal-400",
    },
    {
      icon: FaHeartbeat,
      value: "100%",
      label: "Evidence-Based",
      color: "from-green-500/10 to-teal-500/10 text-green-600 dark:text-green-450",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08 
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <section className="py-4 md:py-6 relative overflow-hidden bg-transparent">
      {/* Background glow overlay */}
      <div className="absolute right-[-5%] top-[10%] w-[30vw] h-[30vw] rounded-full bg-emerald-500/5 blur-[130px] pointer-events-none" />

      <Container>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                variants={cardVariants}
                whileHover={{ 
                  y: -4, 
                  scale: 1.01,
                  boxShadow: "0 15px 25px -8px rgba(16, 185, 129, 0.05)"
                }}
                className="group rounded-[1.8rem] border border-slate-200/50 dark:border-slate-800/40 bg-white/50 dark:bg-slate-950/40 backdrop-blur-xl p-5 md:p-6 shadow-sm transition-all duration-300"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${item.color} transition-all duration-300 group-hover:scale-105 shadow-inner`}>
                  <Icon size={18} />
                </div>

                <h3 className="mt-4 text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  <CountUp target={item.value} />
                </h3>

                <p className="mt-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

export default Stats;