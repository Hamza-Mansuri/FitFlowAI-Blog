import { useEffect, useRef } from "react";
import {
  FaBookOpen,
  FaDumbbell,
  FaAppleAlt,
  FaHeartbeat,
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../layout/Container";

gsap.registerPlugin(ScrollTrigger);

export function Stats() {
  const containerRef = useRef(null);

  const stats = [
    {
      icon: FaBookOpen,
      value: 25,
      suffix: "K",
      label: "Active Readers",
      color: "from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400",
    },
    {
      icon: FaDumbbell,
      value: 150,
      suffix: "+",
      label: "Fitness Articles",
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: FaAppleAlt,
      value: 4.9,
      suffix: "★",
      label: "Average Rating",
      color: "from-teal-500/10 to-green-500/10 text-teal-600 dark:text-teal-400",
    },
    {
      icon: FaHeartbeat,
      value: 100,
      suffix: "%",
      label: "Evidence-Based",
      color: "from-green-500/10 to-teal-500/10 text-green-600 dark:text-green-450",
    },
  ];

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Instant state for reduced motion
        gsap.set(".stat-card", { opacity: 1, y: 0, scale: 1 });
        const counters = document.querySelectorAll(".stat-counter-val");
        counters.forEach((counter) => {
          counter.innerText = counter.getAttribute("data-target");
        });
        return;
      }

      // Card reveals: fade, slide, and scale
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true, // Only animate once
          },
        }
      );

      // Stat count-ups
      const counters = document.querySelectorAll(".stat-counter-val");
      counters.forEach((counter) => {
        const targetVal = parseFloat(counter.getAttribute("data-target"));
        const stepValue = { val: 0 };

        gsap.to(stepValue, {
          val: targetVal,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true, // Only animate once
          },
          onUpdate: () => {
            if (targetVal % 1 !== 0) {
              counter.innerText = stepValue.val.toFixed(1);
            } else {
              counter.innerText = Math.floor(stepValue.val);
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-8 md:py-12 relative overflow-hidden bg-transparent select-none">
      {/* Background soft glow accent */}
      <div className="absolute right-[-5%] top-[10%] w-[30vw] h-[30vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="stat-card group rounded-[1.8rem] border border-slate-200/50 dark:border-slate-800/40 bg-white/50 dark:bg-slate-950/40 backdrop-blur-xl p-5 md:p-6 shadow-sm transition-all duration-500 hover:shadow-md hover:border-emerald-500/20"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${item.color} transition-all duration-300 group-hover:scale-105 shadow-inner`}>
                  <Icon size={17} />
                </div>

                <h3 className="mt-4 text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  <span className="stat-counter-val" data-target={item.value}>0</span>
                  <span className="text-emerald-500 dark:text-emerald-450">{item.suffix}</span>
                </h3>

                <p className="mt-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Stats;