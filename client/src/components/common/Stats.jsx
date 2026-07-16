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
    
    let start = 0;
    const end = parseInt(target, 10);
    if (isNaN(end)) {
      setCount(target);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);

    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration, isInView]);

  const suffix = target.replace(/[0-9]/g, "");

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
      value: "120+",
      label: "Fitness Articles",
      color: "from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400",
    },
    {
      icon: FaDumbbell,
      value: "35+",
      label: "Workout Guides",
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: FaAppleAlt,
      value: "50+",
      label: "Nutrition Tips",
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
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <section className="py-10">
      <Container>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group rounded-3xl border border-slate-205/60 premium-glass-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800/40"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${item.color} transition-all duration-300 group-hover:scale-105 shadow-inner`}>
                  <Icon size={20} />
                </div>

                <h3 className="mt-5 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  <CountUp target={item.value} />
                </h3>

                <p className="mt-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
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